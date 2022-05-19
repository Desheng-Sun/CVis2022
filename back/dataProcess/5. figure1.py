import json
from operator import imod
import os
from platform import node
import pandas as pd
import multiprocessing as mp
import time
from alive_progress import alive_bar
import sys


def getIPCertLinksInSkip3(nowPath, nowNodeNumId, nodeToNodeInfo, nodeCsvW):
    # print("第", coreList, "个线程开始执行了----------------",
    #       time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))

    # with alive_bar(len(nodes)) as bar:
    # for i in nodes:
    WhoisName = 0
    WhoisPhone = 0
    WhoisEmail = 0
    pureDomain = 0
    dirtyDomain = 0
    allNodes1 = []
    for j in nodeToNodeInfo[str(nowNodeNumId)]:
        allNodes1.append(j[1])
    allLinks = {
    }
    nowNodesInfo = list(nodeCsvW[int(nowNodeNumId) - 1])
    # 第0层数据
    allLinks = {
        "id": nowNodesInfo[1],
        "nodesNum": 0,
        "WhoisName": 0,
        "WhoisPhone": 0,
        "WhoisEmail": 0,
        "pureDomain": 0,
        "dirtyDomain": 0,
        "numId": str(nowNodesInfo[0]),
        "name": nowNodesInfo[2],
        "Children": []
    }
    # 针对第0层数据的链路添加第一层数据
    for j in nodeToNodeInfo[str(nowNodeNumId)]:
        nowNodesInfo = list(nodeCsvW[int(j[1]) - 1])
        allLinks["Children"].append({
            "id": nowNodesInfo[1],
            "nodesNum": j[2] - 2,
            "WhoisName": j[5],
            "WhoisEmail": j[6],
            "WhoisPhone": j[7],
            "pureDomain": j[3] - j[4],
            "dirtyDomain": j[4],
            "numId": str(nowNodesInfo[0]),
            "name": nowNodesInfo[2],
            "Children": []
        })
        WhoisName = max(WhoisName, j[5])
        WhoisPhone = max(WhoisPhone, j[6])
        WhoisEmail = max(WhoisEmail, j[7])
        pureDomain = max(pureDomain, j[3] - j[4])
        dirtyDomain = max(dirtyDomain, j[4])
        # 第二层数据
        for k in nodeToNodeInfo[str(j[1])]:
            # 如果第二层数据和第0层数据相等，则跳过A-B-A
            if(k[1] == int(nowNodeNumId)):
                continue
            nowNodesInfo = list(nodeCsvW[int(k[1]) - 1])
            isInFirst = False
            if(int(k[1]) in allNodes1):
                isInFirst = True
            allLinks["Children"][-1]["Children"].append({
                "id": nowNodesInfo[1],
                "nodesNum": k[2] - 2,
                "WhoisName": k[5],
                "WhoisEmail": k[6],
                "WhoisPhone": k[7],
                "pureDomain": k[3] - k[4],
                "dirtyDomain": k[4],
                "numId": str(nowNodesInfo[0]),
                "name": nowNodesInfo[2],
                "isInFirst": isInFirst,
                "Children": []
            })
            WhoisName = max(WhoisName, k[5])
            WhoisPhone = max(WhoisPhone, k[6])
            WhoisEmail = max(WhoisEmail, k[7])
            pureDomain = max(pureDomain, k[3] - k[4])
            dirtyDomain = max(dirtyDomain, k[4])
    allLinks.update({
        "WhoisNameNum" :WhoisName,
        "WhoisPhoneNum" :WhoisPhone,
        "WhoisEmailNum" :WhoisEmail,
        "pureDomainNum" :pureDomain,
        "dirtyDomainNum" :dirtyDomain
    })
    with open(nowPath + "ic-clue-data/" + str(nowNodeNumId) + ".json", 'w', encoding='utf-8') as f:
        json.dump(allLinks, f, ensure_ascii=False)
    # print("第", coreList, "个线程执行完成了----------------",
    #       time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))

def getNodesInICLinks(nowPath,nowNodeNumId, nodeToNodeInfo, nodeCsvW):
    nodeICLinksJ = open(nowPath + "nodesInICLinks.json", "r", encoding="utf-8")
    nodeICLinks = json.load(nodeICLinksJ)
    allLinks = []
    # for i in nodeICLinks[str(nowNodeNumId)]:

    with open(nowPath + "ic-clue-data/" + str(nowNodeNumId) + ".json", 'w', encoding='utf-8') as f:
        json.dump(allLinks, f, ensure_ascii=False)

if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"


    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    nodeCsvW = nodeCsvW.values
    ICScreenJ = open(nowPath + "ICScreen.json", "r", encoding="utf-8")
    ICScreen = json.load(ICScreenJ)

    with open(nowPath + "nodesToNodesGraph1.json", 'r', encoding='utf-8') as f:
        nodeToNodeInfo = json.load(f)
        if(sys.argv[1] == "IP" or sys.argv[1] == "Cert"):
            getIPCertLinksInSkip3(nowPath,sys.argv[0], nodeToNodeInfo, nodeCsvW)
        else:
            getNodesInICLinks(nowPath,sys.argv[0], nodeToNodeInfo, nodeCsvW)


        # pool = mp.Pool(processes=12)

        # numLen = int(len(ICScreen[0]) / 12)
        # for i in range(12):
        #     nodeListNum = (i + 1) * numLen
        #     if(i == 11):
        #         nodeListNum = None
        #     pool.apply_async(getIPCertLinksInSkip3, args=(
        #         i, nowPath, ICScreen[0][i * numLen: nodeListNum], nodeToNodeInfo, nodeCsvW))
        #     print(i, i + 1, i * numLen, nodeListNum)
        # pool.close()
        # pool.join()
