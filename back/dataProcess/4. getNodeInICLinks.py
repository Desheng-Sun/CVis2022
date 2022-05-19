import json
import os
from alive_progress import alive_bar
import multiprocessing as mp
import pandas as pd
import time

def getNodesInICLinks(nodesInIClinks, ICScreen, nodePath, nowPath):
    for i in ICScreen:
        nodeLinksInfoJ = open(nowPath + nodePath + str(i) + ".json")
        nodeLinksInfo = json.load(nodeLinksInfoJ)
        if(nodePath == "ICScreenLinks"):
            for j in nodeLinksInfo:
                if(j["end"][0] < j["begin"][0]):
                    continue
                for k in j["nodes"]:
                    if(k[3] == "IP" or k[3] == "cert"):
                        continue
                    nodesInIClinks[str(k[0])].append([j["begin"][0], j["end"][0]])
        else:
            for j in nodeLinksInfo["nodes"]:
                nodesInIClinks[str(j[0])].append(i)
    return nodesInIClinks


def getNodesNeighbourInfop(coreList, nowPath, nodes):
    print("第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    nodePath = "ICScreenLinks/"
    allLinksToNodes = {}
    for i in nodes:
        nodeLinksJ = open(nowPath + nodePath + str(i[0]) +
                          ".json", "r", encoding="utf-8")
        nodeLinks = json.load(nodeLinksJ)
        nodeLinksJ.close()
        nodesToNodesInfo = []
        for j in nodeLinks:
            WhoisName = 0
            WhoisEmail = 0
            WhoisPhone = 0
            DomainIndustry = []
            DomianIndustryInfo = []
            for k in j["nodes"]:
                if(k[3] == "Domain"):
                    DomainIndustry.append(k[-1])
                elif(k[3] == "Whois_Name"):
                    WhoisName += 1
                elif(k[3] == "Whois_Phone"):
                    WhoisPhone += 1
                elif(k[3] == "Whois_Email"):
                    WhoisEmail += 1
            DomainIndustrySet = list(set(DomainIndustry))
            for k in DomainIndustrySet:
                DomianIndustryInfo.append([k, DomainIndustry.count(k)])

            nodesToNodesInfo.append(
                [
                    j["begin"][0],
                    j["end"][0],
                    j["nodeNum"],
                    j["domainNum"],
                    j["industryNum"],
                    WhoisName,
                    WhoisEmail,
                    WhoisPhone,
                    DomianIndustryInfo
                ])

        allLinksToNodes[i[0]] = nodesToNodesInfo
    with open(nowPath + nodePath + "linksToNode" + str(coreList) + ".json", "w", encoding="utf-8") as f:
        json.dump(allLinksToNodes, f, ensure_ascii=False)

    print("第", coreList, "个线程执行完成了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))


def mergeNodesNeighbourInfop():
    nodeToNodeInfo = {}
    for i in range(12):
        nowIpJ = open(nowPath + "ICScreenLinks/linksToNode" +
                      str(i) + ".json", "r", encoding='utf-8')
        nowIp = json.load(nowIpJ)
        nodeToNodeInfo.update(nowIp)
    nodeToNodeInfo = sorted(nodeToNodeInfo.items(), key=lambda d: int(d[0]))
    nodeToNodeInfo = dict(nodeToNodeInfo)

    with open(nowPath + "nodesToNodesGraph1.json", 'w', encoding='utf-8') as f:
        json.dump(nodeToNodeInfo, f, ensure_ascii=False)


if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    nodeCsvW = nodeCsvW.values
    nodesInIClinks = {}
    for i in nodeCsvW:
        nodesInIClinks[str(i[0])] = []
    ICScreenJ = open(nowPath + "ICScreen.json", "r", encoding="utf-8")
    ICScreen = json.load(ICScreenJ)
    nodesInIClinks = getNodesInICLinks(nodesInIClinks, ICScreen[0], "ICScreenLinks", nowPath)
    nodesInIClinks = getNodesInICLinks(nodesInIClinks, ICScreen[1], "ICLinks", nowPath)
    for i in nodesInIClinks:
        linksType = {}
        for j in nodesInIClinks[i]:
            linksType.add(type(j))
        if(len(linksType) > 1):
            print(i)
    with open(nowPath + "nodesInICLinks", "w", encoding = "utf-8") as f:
        json.dump(nodesInIClinks, f, ensure_ascii = False)
    
    pool = mp.Pool(processes=12)
    numLen = int(len(ICScreen) / 12)
    for i in range(12):
        nodeListNum = (i + 1) * numLen
        if(i == 11):
            nodeListNum = None
        pool.apply_async(getNodesNeighbourInfop, args=(
            i, nowPath, ICScreen[i * numLen: nodeListNum]))
        print(i, i + 1, i * numLen, nodeListNum)
    pool.close()
    pool.join()

    # 将所有数据进行合并
    print("将所有数据进行合并----------------------------------------------")
    mergeNodesNeighbourInfop()