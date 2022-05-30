import json
import os
from traceback import print_tb
from alive_progress import alive_bar
import multiprocessing as mp
import pandas as pd
import time


def getNodesInICLinks(nodesInIClinks, ICScreen, nodePath, nowPath):
    with alive_bar(len(ICScreen)) as bar:
        # 获取每一个节点所在的IC链路或其所在的单独的IC节点NumID
        for i in ICScreen:
            if(nodePath == "ICScreenLinks/"):
                nodeLinksInfoJ = open(nowPath + nodePath +
                                      str(i) + ".json", "r", encoding="utf-8")
                nodeLinksInfo = json.load(nodeLinksInfoJ)
                for j in nodeLinksInfo:
                    for k in j["nodes"]:
                        nodesInIClinks[str(k[0])][0].append(
                            [j["begin"][0], j["end"][0]])

            nodeLinksInfoJ = open(nowPath + "ICLinks/" +
                                  str(i) + ".json", "r", encoding="utf-8")
            nodeLinksInfo = json.load(nodeLinksInfoJ)
            for j in nodeLinksInfo["nodes"]:
                nodesInIClinks[str(j[0])][1].append(i)
            bar()
        return nodesInIClinks


def getAllNodeALinksINICLinks(ICAloneNodes, nowNodes, nowPath, nodeCsvW):
    for i in nowNodes:
        if(len(ICAloneNodes[str(i)]["nodesNumId"]) == 1):
            with open(nowPath + "ICAloneLinks/" + str(i) + ".json", "w", encoding="utf-8") as f:
                json.dump(ICAloneNodes[str(i)], f, ensure_ascii=False)
            continue
        nodeLinksInfoJ = open(nowPath + "ICLinks/" +
                                str(i) + ".json", "r", encoding="utf-8")
        nodeLinksInfo = json.load(nodeLinksInfoJ)
        aj = open(nowPath + "ICScreenLinks2/" + str(i) +
                    ".json", "r", encoding="utf-8")
        a = json.load(aj)
        useNode = set()
        useNode.add(str(i))
        for j in nodeLinksInfo["links"]:
            if(str(j[1]) in ICAloneNodes[str(i)]["nodesNumId"] and str(j[2]) in ICAloneNodes[str(i)]["nodesNumId"]):
                if(j[0] != "r_cert" or j[0] != "r_dns_a"):
                    useNode.add(str(j[1]))
                    useNode.add(str(j[2]))
        InICLinksNodes = list(
            set(ICAloneNodes[str(i)]["nodesNumId"]).difference(useNode))
        for j in InICLinksNodes:
            nowNodesLinks = {}
            for k in nodeLinksInfo["links"]:
                if(k[0] == "r_cert" or j[0] == "r_dns_a"):
                    continue
                if(k[1] == int(j)):
                    nowNodesLinks[str(k[2])] = [k[0], k[1], k[2]]
                elif(k[2] == int(j)):
                    nowNodesLinks[str(k[1])] = [k[0], k[1], k[2]]
            for k in range(len(a)):
                for l in a[k]["nodes"]:
                    if(str(l[0]) in nowNodesLinks):
                        a[k]["nodes"].append(list(nodeCsvW[int(j) - 1]))
                        a[k]["links"].append(nowNodesLinks[str(l[0])])
                        a[k]["nodeNum"] += 1
                        if(nodeCsvW[int(j) - 1][3] == "Domain"):
                            a[k]["domainNum"] += 1
                        if(nodeCsvW[int(j) - 1][-1] != "  "):
                            a[k]["industryNum"] += 1

        with open(nowPath + "ICScreenLinks/" + str(i) +".json", "w", encoding="utf-8") as f:
            json.dump(a, f, ensure_ascii= False)

        useNode = list(useNode)
        for j in nodeLinksInfo["links"]:
            if(str(j[1]) in useNode and str(j[2]) in useNode):
                ICAloneNodes[str(i)]["links"].append([j[0], j[1], j[2]])
        for j in useNode:
            ICAloneNodes[str(i)]["nodes"].append(list(nodeCsvW[int(j) - 1]))
        with open(nowPath + "ICAloneLinks/" + str(i) + ".json", "w", encoding="utf-8") as f:
            json.dump(ICAloneNodes[str(i)], f, ensure_ascii=False)


def getICLinksInfo(coreList, nowPath, nodes):
    print("第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    nodePath = "ICScreenLinks/"
    allLinksToNodes = {}
    for i in nodes:
        # 获取IC链路的信息
        nodeLinksJ = open(nowPath + nodePath + str(i) +
                          ".json", "r", encoding="utf-8")
        nodeLinks = json.load(nodeLinksJ)
        # 获取IC节点的所有链路信息
        nodeLinks.sort(key=lambda x: x["end"][0])
        nodeLinksJ = open(nowPath + nodePath + str(i) +
                          ".json", "w", encoding="utf-8")
        json.dump(nodeLinks, nodeLinksJ, ensure_ascii=False)
        nodeLinksJ.close()
        nodesToNodesInfo = []
        for j in nodeLinks:
            # 数据信息记录
            WhoisName = 0
            WhoisEmail = 0
            WhoisPhone = 0
            DomainIndustry = []
            DomianIndustryInfo = []
            # 分析节点的信息
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
            # 存储IC链路信息
            nodesToNodesInfo.append([
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
        nodesToNodesInfo.sort(key=lambda x: x[1])
        allLinksToNodes[str(i)] = nodesToNodesInfo
    with open(nowPath + nodePath + "ICLinksInfo" + str(coreList) + ".json", "w", encoding="utf-8") as f:
        json.dump(allLinksToNodes, f, ensure_ascii=False)

    print("第", coreList, "个线程执行完成了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))


def mergeNodesNeighbourInfop():
    nodeToNodeInfo = {}
    for i in range(12):
        nowIpJ = open(nowPath + "ICScreenLinks/ICLinksInfo" +
                      str(i) + ".json", "r", encoding='utf-8')
        nowIp = json.load(nowIpJ)
        nodeToNodeInfo.update(nowIp)
    nodeToNodeInfo = sorted(nodeToNodeInfo.items(), key=lambda d: int(d[0]))
    nodeToNodeInfo = dict(nodeToNodeInfo)
    with alive_bar(len(nodeToNodeInfo)) as bar:
        for i in nodeToNodeInfo:
            # 节点从A到B，则在B中记录从B到A
            for j in nodeToNodeInfo[i]:
                if(j[1] > j[0]):
                    nodeToNodeInfo[str(j[1])].append([
                        j[1], j[0], j[2], j[3], j[4], j[5], j[6], j[7], j[8]
                    ])
            nodeToNodeInfo[i].sort(key=lambda x: x[1])
            bar()
    with open(nowPath + "ICLinksInfo.json", 'w', encoding='utf-8') as f:
        json.dump(nodeToNodeInfo, f, ensure_ascii=False)


def getNodesAloneInfo(coreList, nowPath, nodes):
    print("第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    nodePath = "ICLinks/"
    allLinksToNodes = {}
    for i in nodes:
        nodeLinksJ = open(nowPath + nodePath + str(i) +
                          ".json", "r", encoding="utf-8")
        nodeLinks = json.load(nodeLinksJ)
        nodeLinksJ.close()
        nodesAloneInfo = []
        DomainIndustry = []
        DomianIndustryInfo = []
        nodeNum = 0
        WhoisName = 0
        WhoisPhone = 0
        WhoisEmail = 0
        for j in nodeLinks["nodes"]:
            nodeNum += 1
            if(j[3] == "Domain"):
                DomainIndustry.append(j[-1])
            elif(j[3] == "Whois_Name"):
                WhoisName += 1
            elif(j[3] == "Whois_Phone"):
                WhoisPhone += 1
            elif(j[3] == "Whois_Email"):
                WhoisEmail += 1
        DomainIndustrySet = list(set(DomainIndustry))
        if("  " in DomainIndustrySet):
            DomainIndustrySet.remove("  ")
        for j in DomainIndustrySet:
            DomianIndustryInfo.append([j, DomainIndustry.count(j)])
        nodesAloneInfo = [
            nodeNum,
            len(DomainIndustry),
            len(DomainIndustry) - DomainIndustry.count("  "),
            WhoisName,
            WhoisEmail,
            WhoisPhone,
            DomianIndustryInfo
        ]
        allLinksToNodes[str(i)] = nodesAloneInfo

    with open(nowPath + nodePath + "ICAloneInfo" + str(coreList) + ".json", "w", encoding="utf-8") as f:
        json.dump(allLinksToNodes, f, ensure_ascii=False)

    print("第", coreList, "个线程执行完成了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))


def mergeNodesAlone():
    nodeToNodeInfo = {}
    for i in range(12):
        nowIpJ = open(nowPath + "ICLinks/ICAloneInfo" +
                      str(i) + ".json", "r", encoding='utf-8')
        nowIp = json.load(nowIpJ)
        nodeToNodeInfo.update(nowIp)
    nodeToNodeInfo = sorted(nodeToNodeInfo.items(), key=lambda d: int(d[0]))
    nodeToNodeInfo = dict(nodeToNodeInfo)

    with open(nowPath + "ICAloneInfo.json", 'w', encoding='utf-8') as f:
        json.dump(nodeToNodeInfo, f, ensure_ascii=False)


if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv", header=0)

    ipNode = nodeCsvW[nodeCsvW["type"] == "IP"].values
    certNode = nodeCsvW[nodeCsvW["type"] == "Cert"].values
    nodeCsvW = nodeCsvW.values
    nodesInIClinks = {}
    for i in nodeCsvW:
        nodesInIClinks[str(i[0])] = [[], []]
    ICScreenJ = open(nowPath + "ICScreen.json", "r", encoding="utf-8")
    ICScreen = json.load(ICScreenJ)
    nodesInIClinks = getNodesInICLinks(
        nodesInIClinks, ICScreen[0], "ICScreenLinks/", nowPath)
    nodesInIClinks = getNodesInICLinks(
        nodesInIClinks, ICScreen[1], "ICLinks/", nowPath)

    with alive_bar(len(nodesInIClinks)) as bar:
        for i in nodeCsvW:
            j = str(i[0])
            if(len(nodesInIClinks[j][0]) == 0 and len(nodesInIClinks[j][1]) == 0):
                nodesInIClinks.pop(j)
            bar()
    
    for i in ipNode:
        if(str(i[0]) in nodesInIClinks):
            nodesInIClinks.pop(str(i[0]))
    for i in certNode:
        if(str(i[0]) in nodesInIClinks):
            nodesInIClinks.pop(str(i[0]))

    with alive_bar(len(nodesInIClinks)) as bar:
        for i in nodesInIClinks:
            inLinksSet = set()
            for j in nodesInIClinks[i][0]:
                inLinksSet.add(j[0])
                inLinksSet.add(j[1])
            nodesInIClinks[i][1] = list(
                set(nodesInIClinks[i][1]).difference(inLinksSet))
            bar()

    with open(nowPath + "nodeICLinks.json", "w", encoding="utf-8") as f:
        json.dump(nodesInIClinks, f, ensure_ascii=False)

    with open(nowPath + "nodeICLinks.json", "r", encoding="utf-8") as f:
        nodesInIClinks = json.load(f)
        print(nodesInIClinks["479"])
    ICAloneNodes = {}
    for i in ICScreen[0]:
        ICAloneNodes[str(i)] = {
            "nodesNumId": [str(i)],
            "nodes": [],
            "links": []
        }
    for i in ICScreen[1]:
        ICAloneNodes[str(i)] = {
            "nodesNumId": [str(i)],
            "nodes": [],
            "links": []
        }
    with alive_bar(len(nodesInIClinks)) as bar:
        for i in nodesInIClinks:
            for j in nodesInIClinks[i][1]:
                ICAloneNodes[str(j)]["nodesNumId"].append(str(i))
            bar()
    print(ICAloneNodes["523"])
    
    pool = mp.Pool(processes=12)
    numLen = int(len(ICScreen[0]) / 12)
    for i in range(12):
        nodeListNum = (i + 1) * numLen
        if(i == 11):
            nodeListNum = None
        pool.apply_async(getAllNodeALinksINICLinks, args=(
            ICAloneNodes, ICScreen[0][i * numLen: nodeListNum], nowPath, nodeCsvW))
        print(i, i + 1, i * numLen, nodeListNum)
    pool.close()
    pool.join()

    # getICLinksInfo(0, nowPath, ICScreen[0][0: 2])

    pool = mp.Pool(processes=12)
    numLen = int(len(ICScreen[0]) / 12)
    for i in range(12):
        nodeListNum = (i + 1) * numLen
        if(i == 11):
            nodeListNum = None
        pool.apply_async(getICLinksInfo, args=(
            i, nowPath, ICScreen[0][i * numLen: nodeListNum]))
        print(i, i + 1, i * numLen, nodeListNum)
    pool.close()
    pool.join()

    # 将所有数据进行合并
    print("将所有数据进行合并----------------------------------------------")
    mergeNodesNeighbourInfop()

    useNode = ICScreen[0]
    useNode.extend(ICScreen[1])
    pool = mp.Pool(processes=12)
    numLen = int(len(useNode) / 12)
    for i in range(12):
        nodeListNum = (i + 1) * numLen
        if(i == 11):
            nodeListNum = None
        pool.apply_async(getNodesAloneInfo, args=(
            i, nowPath, useNode[i * numLen: nodeListNum]))
        print(i, i + 1, i * numLen, nodeListNum)
    pool.close()
    pool.join()

    # 将所有数据进行合并
    print("将所有数据进行合并----------------------------------------------")
    mergeNodesAlone ()
