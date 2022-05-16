import json
from alive_progress import alive_bar
import multiprocessing as mp
import pandas as pd

# 获取每一个目标节点关联的Cert节点和IP节点
def getNodesWithCretAndIp(coreList, typeName, nowPath, nodeCsvW, linksAll, nowNodes):
    if(typeName == "IP"):
        startLinksType = "r_dns_a"
        nodePath = "LinksByIP/"
        numList = 35000
    else:
        startLinksType = "r_cert"
        nodePath = "LinksByCert/"
        numList = 22000
    # 每35000个IP节点为一组，进行循环
    nodeListNum = (coreList + 1) * numList
    if((coreList + 1) * numList > len(nowNodes)):
        nodeListNum = None
    for i in nowNodes[coreList * numList: nodeListNum]:
        # 获取所有的node节点的NumId
        nodeListId = [str(i[0])]
        # 获取当前IP节点关联的所有链路
        linksByIP = []
        for j in linksAll[i[0] - 1]:
            if(j[0] == "r_asn" or j[0] == "r_cidr" or j[0] == "r_cert_chain"):
                continue
            else:
                linksByIP.append([j[0], j[1], j[2], int(j[3]), False])
        isTraverse = False
        # 判断当前链路是否全部循环完成
        while(not isTraverse):
            # 针对所有链路中的每一个节点进行查询
            for k in linksByIP:
                # 当节点循环终止条件为真或已经达到三跳后不在进行循环
                if(k[-1] == True or k[3] == 0):
                    k[-1] = True
                    continue
                # 当前节点为连接IP的节点（只有初始IP节点才会进入循环），只循环其source节点
                if(k[0] == startLinksType):
                    k[-1] = True
                    if(k[1] not in nodeListId):
                        linksByIP.extend(getLinksByLinkType(
                            linksAll[int(k[1]) - 1], k[3], nodeListId))
                        nodeListId.append(k[1])
                # 循环链路的所有节点
                else:
                    k[-1] = True
                    if(k[1] not in nodeListId):
                        linksByIP.extend(getLinksByLinkType(
                            linksAll[int(k[1]) - 1], k[3], nodeListId))
                        nodeListId.append(k[1])
                    if(k[2] not in nodeListId):
                        linksByIP.extend(getLinksByLinkType(
                            linksAll[int(k[2]) - 1], k[3], nodeListId))
                        nodeListId.append(k[2])
            # 判断所有节点是否循环完成
            isTraverse = True
            for k in linksByIP:
                if(k[-1] == False):
                    isTraverse = False
        # 分别存储所有Cert节点、IP节点、所有节点
        certList = []
        nodeList = []
        nodeListId = []
        ipList = []
        # 获取所有的IP、Cert节点
        for j in linksByIP:
            nodeListId.append(int(j[1]) - 1)
            nodeListId.append(int(j[2]) - 1)
            if(nodeCsvW[int(j[1]) - 1][3] == "Cert"):
                certList.append(int(j[1]) - 1)
            elif(nodeCsvW[int(j[1]) - 1][3] == "IP"):
                ipList.append(int(j[1]) - 1)
            if(nodeCsvW[int(j[2]) - 1][3] == "Cert"):
                certList.append(int(j[2]) - 1)
            elif(nodeCsvW[int(j[2]) - 1][3] == "IP"):
                ipList.append(int(j[2]) - 1)

        # 获取所有的节点
        nodeListId = list(set(nodeListId))
        for j in nodeListId:
            nodeList.append(list(nodeCsvW[j]))

        # 获取所有的Cert节点信息
        setCertList = set(certList)
        # 删除当前节点的信息
        setCertList.discard(int(i[0] - 1))
        dictCertList = []
        for item in setCertList:
            dictCertList.append([list(nodeCsvW[item]), certList.count(item)])
        # 根据连接到该节点的Links的数量进行排序
        dictCertList.sort(reverse=True, key=lambda x: x[1])

        # 获取当前所有的IP节点的信息
        setIpList = set(ipList)
        # 删除当前节点的信息
        setIpList.discard(int(i[0] - 1))
        dictIpList = []
        for item in setIpList:
            dictIpList.append([list(nodeCsvW[item]), ipList.count(item)])
        # 根据连接到该节点的Links的数量进行排序
        dictIpList.sort(reverse=True, key=lambda x: x[1])
        nodeLinks = {
            "beginNode": list(i),
            "certEnd": dictCertList,
            "ipEnd": dictIpList,
            "nodes": nodeList,
            "links": linksByIP
        }
        with open(nowPath + nodePath + str(i[0]) + ".json", 'w', encoding='utf-8') as f:
            json.dump(nodeLinks, f, ensure_ascii=False)
    print(coreList)


# 根据链路列表和跳转次数，对链路添加响应的数据
def getLinksByLinkType(linkList, indexNum, nodeListId):
    nowLinksById = []
    for listLinkTemp in linkList:
        if(indexNum - 1 == 0):
            if(listLinkTemp[0] == "r_cert" or listLinkTemp[0] == "r_dns_a"):
                nowLinksById.append(
                    [listLinkTemp[0], listLinkTemp[1], listLinkTemp[2], indexNum - 1, True])
        else:
            if(listLinkTemp[1] in nodeListId or listLinkTemp[2] in nodeListId):
                continue
            if(listLinkTemp[0] == "r_asn" or listLinkTemp[0] == "r_cidr" or listLinkTemp[0] == "r_cert_chain"):
                continue
            elif(listLinkTemp[0] == "r_cert" or listLinkTemp[0] == "r_dns_a" or listLinkTemp[0] == "r_cname" or listLinkTemp[0] == "r_whois_name" or listLinkTemp[0] == "r_whois_email" or listLinkTemp[0] == "r_whois_phone"):
                nowLinksById.append(
                    [listLinkTemp[0], listLinkTemp[1], listLinkTemp[2], indexNum - 1, True])
            else:
                nowLinksById.append(
                    [listLinkTemp[0], listLinkTemp[1], listLinkTemp[2], indexNum - 1, False])
    return nowLinksById


# 筛选所有IP节点，将关联其他IP和Cert节点的IP筛选出来
def screenNode(typeName, nowPath, coreList, nowNodes):
    if(typeName == "IP"):
        nodePath = "LinksByIP/"
        fileName = "IpInfo"
        numList = 35000
    
    else:
        nodePath = "LinksByCert/"
        fileName = "certInfo"
        numList = 22000
    nodeListNum = (coreList + 1) * numList
    if((coreList + 1) * numList > len(nowNodes)):
        nodeListNum = None
    nodeInfo = []
    for i in nowNodes[coreList * numList: nodeListNum]:
        f = open(nowPath + nodePath +
                 str(i[0]) + ".json", 'r', encoding='utf-8')
        ipJson = json.load(f)
        nodeDomain = 0
        industryNum = 0
        ipCert = len(ipJson["certEnd"])

        ipIp = len(ipJson["ipEnd"])
        for j in ipJson["nodes"]:
            if(j[-2] == "Domain"):
                nodeDomain += 1
                if(not j[-1] == "[]"):
                    industryNum += 1
        nodeInfo.append([i[0], ipCert, ipIp, nodeDomain, industryNum])
    with open(nowPath + nodePath + fileName + str(coreList) + ".json", 'w', encoding='utf-8') as f:
        json.dump(nodeInfo, f, ensure_ascii=False)


if __name__ == '__main__':
    nowPath = "D:/个人相关/可视化大赛/ChinaVIS 2022/"
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    linkCsvW = open(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/nodeLinksJson.json", 'r', encoding='utf-8')
    linksAll = json.load(linkCsvW)
    linkCsvW.close()
    ipNode = nodeCsvW[nodeCsvW["type"] == "IP"].values
    certNode = nodeCsvW[nodeCsvW["type"] == "Cert"].values
    nodeCsvW = nodeCsvW.values
    # # 获取每个IP节点连接的IP和Cert节点
    # print("获取每个IP节点连接的IP和Cert节点---------------------------------------------")
    # pool = mp.Pool(processes=6)
    # for i in range(6):
    #     pool.apply_async(getNodesWithCretAndIp, args=(
    #         i, "IP", nowPath, nodeCsvW, linksAll, ipNode))
    #     print(i)
    # pool.close()
    # pool.join()

    # # 获取每个IP节点连接的IP节点和Cert节点数量和其对应链路的黑灰产业的Domain数量
    # print("获取每个IP节点连接的IP节点和Cert节点数量和其对应链路的黑灰产业的Domain数量-----------------")
    # pool = mp.Pool(processes=6)
    # for i in range(6):
    #     pool.apply_async(screenNode, args=("IP", nowPath, i, ipNode))
    #     print(i)
    # pool.close()
    # pool.join()

    # 获取筛选后的所有Ip节点
    print("获取筛选后的所有Ip节点----------------------------------------------")
    AllIp = []
    IpInCert = []
    for i in range(6):
        nowIpJ = open(nowPath + "LinksByIP/IpInfo" +
                      str(i) + ".json", "r", encoding='utf-8')
        nowIp = json.load(nowIpJ)
        for i in nowIp:
            AllIp.append(list(i))
            if((i[1] > 0 or i[2] > 0) and i[4] > 0):
                IpInCert.append(list(i))
    with open(nowPath + "LinksByIP/IpInfo.json", 'w', encoding='utf-8') as f:
        json.dump(AllIp, f, ensure_ascii=False)
    with open(nowPath + "LinksByIP/IpScreen.json", 'w', encoding='utf-8') as f:
        json.dump(IpInCert, f, ensure_ascii=False)
    with open(nowPath + "LinksByIP/IpInfo.json", 'r', encoding='utf-8') as f:
        AllIp = json.load(f)
        AllIp.sort(reverse = True, key=lambda x: x[-1])
        f2 = open(nowPath + "LinksByIP/IpInfoSort.json", 'w', encoding='utf-8')
        json.dump(AllIp, f2, ensure_ascii= False)


    # # 获取每个Cert节点连接的IP和Cert节点
    # print("获取每个Cert节点连接的IP和Cert节点---------------------------------------------")
    # pool = mp.Pool(processes=6)
    # for i in range(6):
    #     pool.apply_async(getNodesWithCretAndIp, args=(
    #         i, "Cert", nowPath,  nodeCsvW, linksAll, certNode))
    #     print(i)
    # pool.close()
    # pool.join()

    # # 获取每个Cert节点连接的IP节点和Cert节点数量和其对应链路的黑灰产业的Domain数量
    # print("获取每个Cert节点连接的IP节点和Cert节点数量和其对应链路的黑灰产业的Domain数量--------------------------")
    # pool = mp.Pool(processes=6)
    # for i in range(6):
    #     pool.apply_async(screenNode, args=("Cert", nowPath, i, certNode))
    #     print(i)
    # pool.close()
    # pool.join()

    # 获取筛选后的所有Cert节点
    print("获取筛选后的所有Cert节点----------------------------------------------")
    AllIp = []
    IpInCert = []
    for i in range(6):
        nowIpJ = open(nowPath + "LinksByCert/certInfo" +
                      str(i) + ".json", "r", encoding='utf-8')
        nowIp = json.load(nowIpJ)
        for i in nowIp:
            AllIp.append(list(i))
            if((i[1] > 0 or i[2] > 0) and i[4] > 0):
                IpInCert.append(list(i))
    with open(nowPath + "LinksByCert/certInfo.json", 'w', encoding='utf-8') as f:
        json.dump(AllIp, f, ensure_ascii=False)
    with open(nowPath + "LinksByCert/certScreen.json", 'w', encoding='utf-8') as f:
        json.dump(IpInCert, f, ensure_ascii=False)
    with open(nowPath + "LinksByCert/certInfo.json", 'r', encoding='utf-8') as f:
        AllCert = json.load(f)
        AllCert.sort(reverse = True, key=lambda x: x[-1])
        f2 = open(nowPath + "LinksByCert/certInfoSort.json", 'w', encoding='utf-8')
        json.dump(AllCert, f2, ensure_ascii= False)