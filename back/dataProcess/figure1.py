import json
from platform import node
import pandas as pd
import multiprocessing as mp
import time
from alive_progress import alive_bar


def getNodesNeighbourInfop(coreList, nowPath, typeName, nodes, allNodes):
    print(typeName, " : 第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    if(typeName == "IP"):
        nodePath = "LinksByIPScreen/"
    else:
        nodePath = "LinksByCertScreen/"
    allLinksToNodes = {}
    for i in nodes:
        nodeLinksJ = open(nowPath + nodePath + str(i[0]) +
                          ".json", "r", encoding="utf-8")
        nodeLinks = json.load(nodeLinksJ)
        nodesToNodesInfo = []
        for j in nodeLinks:
            if(not j["end"][0] in allNodes):
                continue
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

    print(typeName, " : 第", coreList, "个线程执行完成了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))


def mergeNodesNeighbourInfop():
    nodeToNodeInfo = {}
    for i in range(12):
        nowIpJ = open(nowPath + "LinksByIPScreen/linksToNode" +
                      str(i) + ".json", "r", encoding='utf-8')
        nowIp = json.load(nowIpJ)
        nodeToNodeInfo.update(nowIp)
        nowCertJ = open(nowPath + "LinksByCertScreen/linksToNode" +
                        str(i) + ".json", "r", encoding='utf-8')
        nowCert = json.load(nowCertJ)
        nodeToNodeInfo.update(nowCert)
    nodeToNodeInfo = sorted(nodeToNodeInfo.items(), key=lambda d:int(d[0]))
    nodeToNodeInfo = dict(nodeToNodeInfo)
    with alive_bar(len(nodeToNodeInfo)) as bar:
        for i in nodeToNodeInfo:
            for j in nodeToNodeInfo[i]:
                if(j[0] < j[1]):
                    nowLinksInfo = [j[1], j[0]]
                    nowLinksInfo.extend(j[2:])
                    nodeToNodeInfo[str(j[1])].append(nowLinksInfo)
            bar()

    with open(nowPath + "nodesToNodesGraph1.json", 'w', encoding='utf-8') as f:
        json.dump(nodeToNodeInfo, f, ensure_ascii=False)


def getIPCertLinksInSkip3(coreList, nowPath, nodes, nodeToNodeInfo, nodeCsvW):
    
    print("第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    # with alive_bar(len(nodes)) as bar:
    for i in nodes:
        allNodes = []
        allLinks = {
            "0" : {},
            "1" : {},
            "2" : {},
        }
        allLinks["0"] = {str(i) : nodeToNodeInfo[str(i)]}
        allNodes.append(str(i))
        for j in allLinks["0"]:
            for k in allLinks["0"][j]:
                if(str(k[1]) not in allNodes):
                    nownodeToNodeInfo = []
                    for l in nodeToNodeInfo[str(k[1])]:
                        if(l[1] == int(j)):
                            continue
                        nownodeToNodeInfo.append(l)
                    allLinks["1"].update({
                        str(k[1]): nownodeToNodeInfo
                    })
                    allNodes.append(str(k[1]))

        for j in allLinks["1"]:
            for k in allLinks["1"][j]:
                if(str(k[1]) not in allNodes):
                    nownodeToNodeInfo = []
                    for l in nodeToNodeInfo[str(k[1])]:
                        if(l[1] == int(j)):
                            continue
                        nownodeToNodeInfo.append(l)
                    allLinks["2"].update({
                        str(k[1]): nownodeToNodeInfo
                    })
                    allNodes.append(str(k[1]))
        nodesInfo = {}
        for j in allLinks["1"]:
            for k in allLinks["1"][j]:
                if(str(k[1]) not in allNodes):
                    allNodes.append(str(k[1]))
        for j in allNodes:
            nodesInfo[j] = list(nodeCsvW[int(j) - 1])
        # bar()
        with open(nowPath + "IpCertInSkip3/" + str(i) + ".json", 'w', encoding='utf-8') as f:
            json.dump([allLinks,nodesInfo], f, ensure_ascii=False)
    print("第", coreList, "个线程执行完成了----------------",
        time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
            

if __name__ == '__main__':
    nowPath = "./data/"
    IpScreen = []
    allNodes = []
    certScreen = []
    with open(nowPath + "LinksByIP/IpScreen.json", 'r', encoding='utf-8') as f:
        print("查找每一个Ip到Nodes的节点信息--------------------------------------")
        IpScreen = json.load(f)
        print(len(IpScreen))
    with open(nowPath + "LinksByCert/certScreen.json", 'r', encoding='utf-8') as f:
        print("查找每一个Cert到Nodes的节点信息--------------------------------------")
        certScreen = json.load(f)
        print(len(certScreen))
    for i in IpScreen:
        allNodes.append(i[0])
    for i in certScreen:
        allNodes.append(i[0])
        
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    nodeCsvW = nodeCsvW.values
    # pool = mp.Pool(processes=12)
    # numLen = int(len(IpScreen) / 12)
    # for i in range(12):
    #     nodeListNum = (i + 1) * numLen
    #     if(i == 11):
    #         nodeListNum = None
    #     pool.apply_async(getNodesNeighbourInfop, args=(
    #         i, nowPath, "IP", IpScreen[i * numLen: nodeListNum], allNodes))
    #     print(i, i + 1, i * numLen, nodeListNum)
    # pool.close()
    # pool.join()

    # pool = mp.Pool(processes=12)
    # numLen = int(len(certScreen) / 12)
    # for i in range(12):
    #     nodeListNum = (i + 1) * numLen
    #     if(i == 11):
    #         nodeListNum = None
    #     pool.apply_async(getNodesNeighbourInfop, args=(
    #         i, nowPath, "Cert", certScreen[i * numLen: nodeListNum], allNodes))
    #     print(i, i + 1, i * numLen, nodeListNum)
    # pool.close()
    # pool.join()
    # # 将所有数据进行合并
    # print("将所有数据进行合并----------------------------------------------")
    # mergeNodesNeighbourInfop()


    with open(nowPath + "nodesToNodesGraph1.json", 'r', encoding='utf-8') as f:
        nodeToNodeInfo = json.load(f)
        # getIPCertLinksInSkip3(i, nowPath, allNodes[0 : 2], nodeToNodeInfo, nodeCsvW)
        pool = mp.Pool(processes=12)
        numLen = int(len(nodeToNodeInfo) / 12)
        for i in range(12):
            nodeListNum = (i + 1) * numLen
            if(i == 11):
                nodeListNum = None
            pool.apply_async(getIPCertLinksInSkip3, args=(i, nowPath, allNodes[i * numLen: nodeListNum], nodeToNodeInfo, nodeCsvW))
            print(i, i + 1, i * numLen, nodeListNum)
        pool.close()
        pool.join()
    
