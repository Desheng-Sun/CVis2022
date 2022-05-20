import json
import os
from alive_progress import alive_bar
import multiprocessing as mp
import pandas as pd
import time

# 根据某一个IP获取整个链路


def getAllLinksByIp(nowPath, numId, nodeCsvW, ICScreen, linksAll):
    nodePath = "ICLinks/"
    nodeLinksJ = open(nowPath + nodePath + str(numId) +
                      ".json", "r", encoding="utf-8")
    nodeLinks = json.load(nodeLinksJ)

    linksToIp = []
    linksToCert = []
    linksToWhos = []
    linksToDomain = []
    linksToEnd = []
    for i in nodeLinks["links"]:
        if(i[0] == "r_dns_a"):
            linksToIp.append(i)
        elif(i[0] == "r_cert"):
            linksToCert.append(i)
        elif(i[0] == "r_whois_phone" or i[0] == "r_whois_email" or i[0] == "r_whois_name"):
            linksToWhos.append(i)
        elif(i[3] > 0):
            linksToDomain.append(i)
        elif(i[3] == -1):
            linksToEnd.append(i)
    nodeAllLinks = [linksToIp,
                    linksToCert,
                    linksToWhos,
                    linksToDomain,
                    linksToEnd]
    ipToIpAndCertLinks = []

    # 获取节点到目标节点的所有路径
    for i in nodeLinks["certEnd"]:
        if(int(i[0][0]) > numId and int(i[0][0]) in ICScreen):
            ipToIpAndCertLinks.append(getLinksToTarget(numId, "Cert", i[0], nowPath,
                                                       nodeAllLinks, nodeLinks, nodeCsvW, linksAll))
    for i in nodeLinks["ipEnd"]:
        if(int(i[0][0]) > numId and int(i[0][0]) in ICScreen):
            ipToIpAndCertLinks.append(getLinksToTarget(numId, "IP", i[0], nowPath,
                                                       nodeAllLinks, nodeLinks, nodeCsvW, linksAll))

    with open(nowPath + "ICScreenLinks/" + str(numId) + ".json", "w", encoding="utf-8") as f:
        json.dump(ipToIpAndCertLinks, f, ensure_ascii=False)


def getLinksToTarget(numId, typeName, i, nowPath, nodeAllLinks, nodeLinks, nodeCsvW, linksAll):
    if(typeName == "IP"):
        linksList = 0
    else:
        linksList = 1

    linksToTarget = []
    nodesToTarget = []
    # 获取最终链接到该Target节点的所有Links和相关Nodes
    for j in nodeAllLinks[linksList]:
        if(j[2] == i[0]):
            linksToTarget.append(j)
            nodesToTarget.append(j[1])

    nodePath = "ICLinks/"
    # 获取该Target节点的相关links
    TargetLinksJ = open(nowPath + nodePath +
                        str(i[0]) + ".json", "r", encoding="utf-8")
    TargetLinks = json.load(TargetLinksJ)["links"]

    for j in linksAll[numId - 1]:
        if(j[0] == "r_asn" or j[0] == "r_cidr" or j[0] == "r_cert_chain"):
            linksToTarget.append([j[0], j[1], j[2], -1, True])
            nodesToTarget.append(j[2])

    for j in linksAll[i[0] - 1]:
        if(j[0] == "r_asn" or j[0] == "r_cidr" or j[0] == "r_cert_chain"):
            linksToTarget.append([j[0], j[1], j[2], -1, True])
            nodesToTarget.append(j[2])

    # 获取Target节点链接当前节点的所有nodes和Links
    for j in TargetLinks:
        if(j[2] == numId):
            linksToTarget.append([j[0], j[1], j[2], 3, True])
            nodesToTarget.append(j[1])
    TargetLinksJ.close()

    nodeInMiddle = []
    linksInMiddle = []
    # 获取当前nodes所在的所有Links，如果Links是跳转到域名的注册人姓名等也保存
    for j in nodeAllLinks[3]:
        if(j[1] in nodesToTarget and j[2] in nodesToTarget):
            linksToTarget.append(j)
        if(j[3] == 2):
            if(j[1] not in nodesToTarget and j[2] in nodesToTarget):
                nodeInMiddle.append(j[1])
                linksInMiddle.append(j)
            elif(j[1] in nodesToTarget and j[2] not in nodesToTarget):
                nodeInMiddle.append(j[2])
                linksInMiddle.append(j)
        elif(j[3] == 1):
            if(j[1] in nodeInMiddle and j[2] in nodesToTarget):
                nodesToTarget.append(j[1])
                linksInMiddle.append(j)
            elif(j[1] in nodesToTarget and j[2] in nodeInMiddle):
                nodesToTarget.append(j[2])
                linksInMiddle.append(j)

    for j in nodeAllLinks[2]:
        if(j[1] in nodesToTarget):
            linksToTarget.append(j)
            nodesToTarget.append(j[2])
    for j in nodeAllLinks[4]:
        if(j[1] in nodesToTarget):
            linksToTarget.append(j)
            nodesToTarget.append(j[2])
        if(j[1] == i[0] or j[1] == numId):
            linksToTarget.append(j)
            nodesToTarget.append(j[2])

    # 统计当前Links和Nodes的数量及类型
    nodeToTargetInfo = [nodeLinks["beginNode"], i]
    allDomainNodeNum = 0
    allDomainInstduryNodeNum = 0
    nodesToTarget = list(set(nodesToTarget))
    for j in nodesToTarget:
        nowNode = list(nodeCsvW[int(j) - 1])
        if(nowNode[-2] == "Domain"):
            allDomainNodeNum += 1
            if(not nowNode[-1] == "  "):
                allDomainInstduryNodeNum += 1
        nodeToTargetInfo.append(nowNode)

    return {
        "begin": nodeLinks["beginNode"],
        "end": i,
        "nodes": nodeToTargetInfo,
        "links": linksToTarget,
        "nodeNum": len(nodesToTarget) + 2,
        "domainNum": allDomainNodeNum,
        "industryNum": allDomainInstduryNodeNum,
    }


def getAllLinksByNodes(coreList, nowPath, nodes, nodeCsvW, ICScreen, linksAll):
    print("第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    for i in nodes:
        getAllLinksByIp(nowPath, i, nodeCsvW, ICScreen, linksAll)
    print("第", coreList, "个线程执行完成了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))


def getICScreenLinks(nowPath, ICScreen):
    with alive_bar(len(ICScreen)) as bar:
        for i in ICScreen:
            ICScreenLinksJ = open(
                nowPath + "ICScreenLinks/" + str(i) + ".json", "r", encoding="utf-8")
            ICScreenLinks = json.load(ICScreenLinksJ)
            ICScreenLinks.sort(key=lambda x: x["end"][0])
            ICScreenLinksJ = open(
                nowPath + "ICScreenLinks/" + str(i) + ".json", "w", encoding="utf-8")
            json.dump(ICScreenLinks, ICScreenLinksJ, ensure_ascii=False)
            ICScreenLinksJ.close()
            for j in ICScreenLinks:
                if(j["end"][0] < j["begin"][0]):
                    continue
                nextICScreenLinksJ = open(
                    nowPath + "ICScreenLinks/" + str(j["end"][0]) + ".json", "r", encoding="utf-8")
                nextICScreenLinks = json.load(nextICScreenLinksJ)
                nextICScreenLinks.append({
                    "begin": j["end"],
                    "end": j["begin"],
                    "nodes": j["nodes"],
                    "links": j["links"],
                    "nodeNum": j["nodeNum"],
                    "domainNum": j["domainNum"],
                    "industryNum": j["industryNum"],
                })
                nextICScreenLinksJ = open(
                    nowPath + "ICScreenLinks/" + str(j["end"][0]) + ".json", "w", encoding="utf-8")
                json.dump(nextICScreenLinks, nextICScreenLinksJ,
                          ensure_ascii=False)
                nextICScreenLinksJ.close()
            bar()


if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv", header=0)
    nodeCsvW = nodeCsvW.values

    linkCsvW = open(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/nodeLinksJson.json", 'r', encoding='utf-8')
    linksAll = json.load(linkCsvW)

    ICScreenJ = open(nowPath + "ICScreen.json", "r", encoding="utf-8")
    ICScreen = json.load(ICScreenJ)

    # 获取筛选后的所有Ip节点与其他节点的路径
    print("获取筛选后的所有IC节点与其他节点的路径----------------------------------------------")
    print(len(ICScreen[0]))
    print(len(ICScreen[1]))
    print(len(ICScreen[2]))
    useNode = []
    for i in ICScreen[0]:
        if(not os.path.exists(nowPath + "ICScreenLinks/" + str(i) + ".json")):
            useNode.append(i)
    pool = mp.Pool(processes=12)
    num = 0
    # numLen = int(len(ICScreen[0]) / 78)
    numLen = int(len(useNode) / 12)


    for i in range(12):
        num += i + 1
        # nodeListNum = (num) * numLen
        nodeListNum = (i + 1) * numLen
        if(i == 11):
            nodeListNum = None
        # pool.apply_async(getAllLinksByNodes, args=(
        #     i, nowPath, ICScreen[0][(num - i - 1) * numLen: nodeListNum], nodeCsvW, ICScreen[0], linksAll))
        pool.apply_async(getAllLinksByNodes, args=(
            i, nowPath, useNode[i * numLen: nodeListNum], nodeCsvW, ICScreen[0],linksAll))
        print(i, i + 1, (num - i - 1) * numLen, nodeListNum)
    pool.close()
    pool.join()

    # getICScreenLinks(nowPath, ICScreen[0])
