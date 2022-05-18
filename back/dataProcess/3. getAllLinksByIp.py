import json
import os
from alive_progress import alive_bar
import multiprocessing as mp
import pandas as pd
import time

# 根据某一个IP获取整个链路
def getAllLinksByIp(nowPath, typeName, numId, nodeCsvW):
    if(typeName == "IP"):
        nodePath = "LinksByIP/"
    else:
        nodePath = "LinksByCert/"
    nodeLinksJ = open(nowPath + nodePath + str(numId) +
                      ".json", "r", encoding="utf-8")
    nodeLinks = json.load(nodeLinksJ)

    linksToIp = []
    linksToCert = []
    linksToWhos = []
    linksToDomain = []
    for i in nodeLinks["links"]:
        if(i[0] == "r_dns_a"):
            linksToIp.append(i)
        elif(i[0] == "r_cert"):
            linksToCert.append(i)
        elif(i[0] == "r_whois_phone" or i[0] == "r_whois_email" or i[0] == "r_whois_name"):
            linksToWhos.append(i)
        elif(i[3] > 0):
            linksToDomain.append(i)
    nodeAllLinks = [linksToIp,
                    linksToCert,
                    linksToWhos,
                    linksToDomain]
    ipToIpAndCertLinks = []

    # 获取节点到目标节点的所有路径
    for i in nodeLinks["certEnd"]:
        if(int(i[0][0]) > numId):
            ipToIpAndCertLinks.append(getLinksToTarget(numId, "Cert", i[0], nowPath,
                                                       nodeAllLinks, nodeLinks, nodeCsvW))
    for i in nodeLinks["ipEnd"]:
        if(int(i[0][0]) > numId):
            ipToIpAndCertLinks.append(getLinksToTarget(numId, "IP", i[0], nowPath,
                                                       nodeAllLinks, nodeLinks, nodeCsvW))

    if(typeName == "IP"):
        nodeSavePath = "LinksByIPScreen/"
    else:
        nodeSavePath = "LinksByCertScreen/"
    with open(nowPath + nodeSavePath + str(numId) + ".json", "w", encoding="utf-8") as f:
        json.dump(ipToIpAndCertLinks, f, ensure_ascii=False)


def getLinksToTarget(numId, typeName, i, nowPath, nodeAllLinks, nodeLinks, nodeCsvW):
    if(typeName == "IP"):
        nodePath = "LinksByIP/"
        linksList = 0
    else:
        nodePath = "LinksByCert/"
        linksList = 1
    linksToTarget = []
    nodesToTarget = []
    # 获取最终链接到该Target节点的所有Links和相关Nodes
    for j in nodeAllLinks[linksList]:
        if(j[2] == str(i[0])):
            linksToTarget.append(j)
            nodesToTarget.append(str(j[1]))

 
    # 获取该Target节点的相关links
    TargetLinksJ = open(nowPath + nodePath +
                        str(i[0]) + ".json", "r", encoding="utf-8")
    TargetLinks = json.load(TargetLinksJ)["links"]

    # 获取Target节点链接当前节点的所有nodes和Links
    for j in TargetLinks:
        if(j[2] == str(numId)):
            linksToTarget.append([j[0],j[1],j[2],3,True])
            nodesToTarget.append(str(j[1]))
    TargetLinksJ.close()

    nodeInMiddle = []
    linksInMiddle = []
    # 获取当前nodes所在的所有Links，如果Links是跳转到域名的注册人姓名等也保存
    for j in nodeAllLinks[-1]:
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
                nodesToTarget.append(str(j[1]))
                linksInMiddle.append(j)
            elif(j[1] in nodesToTarget and j[2] in nodeInMiddle):
                nodesToTarget.append(str(j[2]))
                linksInMiddle.append(j)
    for j in nodeAllLinks[-2]:
        if(j[1] in nodesToTarget):
            linksToTarget.append(j)
            nodesToTarget.append(str(j[2]))

    # 统计当前Links和Nodes的数量及类型
    nodeToTargetInfo = [nodeLinks["beginNode"], i]
    allDomainNodeNum = 0
    allDomainInstduryNodeNum = 0
    nodesToTarget = list(set(nodesToTarget))
    for j in nodesToTarget:
        nowNode = list(nodeCsvW[int(j) - 1])
        if(nowNode[-2] == "Domain"):
            allDomainNodeNum += 1
            if(not nowNode[-1] == "[]"):
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


def getAllLinksByNodes(coreList, nowPath, typeName, nodes, nodeCsvW):
    print(typeName, " : 第", coreList, "个线程开始执行了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
    for i in nodes:
        getAllLinksByIp(nowPath, typeName, i[0], nodeCsvW)
    print(typeName, " : 第", coreList, "个线程执行完成了----------------",
          time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))



if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    nodeCsvW = nodeCsvW.values

    # 获取筛选后的所有Ip节点与其他节点的路径
    print("获取筛选后的所有Ip节点与其他节点的路径----------------------------------------------")
    with open(nowPath + "LinksByIP/IpScreen.json", 'r', encoding='utf-8') as f:
        IpScreen = json.load(f)
        getAllLinksByNodes(
                0, nowPath, "IP", IpScreen[0: 1], nodeCsvW)
    #     print(len(IpScreen))
    #     pool = mp.Pool(processes=12)
    #     num = 0
    #     for i in range(12):
    #         num += i + 1
    #         nodeListNum = (num) * 268
    #         if(nodeListNum > len(IpScreen)):
    #             nodeListNum = None
    #         pool.apply_async(getAllLinksByNodes, args=(
    #             i, nowPath, "IP", IpScreen[(num - i - 1) * 268: nodeListNum], nodeCsvW))
    #         print(num - i - 1, num, (num - i - 1) * 268, nodeListNum)
    #     pool.close()
    #     pool.join()

    # # 获取筛选后的所有Cert节点与其他节点的路径
    # print("获取筛选后的所有Cert节点与其他节点的路径----------------------------------------------")
    # with open(nowPath + "LinksByCert/certScreen.json", 'r', encoding='utf-8') as f:
    #     certScreen = json.load(f)
    #     print(len(certScreen))
    #     pool = mp.Pool(processes=12)
    #     num = 0
    #     for i in range(12):
    #         num += i + 1
    #         nodeListNum = (num) * 215
    #         if(nodeListNum > len(certScreen)):
    #             nodeListNum = None
    #         pool.apply_async(getAllLinksByNodes, args=(
    #             i, nowPath, "Cert", certScreen[(num - i - 1) * 215: nodeListNum], nodeCsvW))
    #         print(num - i - 1, num,(num - i - 1) * 215, nodeListNum)
    #     pool.close()
    #     pool.join()
