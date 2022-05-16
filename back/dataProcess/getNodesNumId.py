from copy import deepcopy
import csv
import json
from math import fabs
from operator import truediv
from os import link
from re import T, X
import sys
from alive_progress import alive_bar
import multiprocessing as mp
import pandas as pd
sys.setrecursionlimit(100000)


# 将node 以numId的方式查找，顺序查找加快速度
def addNodeId():
    # 将node节点设置一个numId 以便查找。
    NodeCsv = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/Node.csv",
                   'r', encoding="utf-8", newline='')
    next(NodeCsv)
    NodeCsvReader = csv.reader(NodeCsv)
    numId = 0
    nodeList = []
    NodeCsvW = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv",
                    'w+', encoding="utf-8", newline='')
    NodeCsvWrite = csv.writer(NodeCsvW)
    NodeCsvWrite.writerow(["numId", "id", "name", "type", "industry"])

    # 将每个node设置一个numId 以便后续进行查找
    with alive_bar(2371558) as bar:
        for i in NodeCsvReader:
            numId += 1
            i.insert(0, numId)
            nodeList.append(i[1])
            NodeCsvWrite.writerow(i)
            bar()
    NodeCsvW.close()
    nodeList.reverse()

    # 存储所有的link数据
    LinkCsv = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/Link.csv",
                   'r', encoding="utf-8", newline='')
    next(LinkCsv)
    LinkCsvReader = csv.reader(LinkCsv)
    linkList = []
    # 查找每一个node的numId并存储
    for i in LinkCsvReader:
        linkList.append(i)

    LinkCsvW = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/LinkNumId.csv",
                    'w+', encoding="utf-8", newline='')
    LinkCsvWrite = csv.writer(LinkCsvW)
    LinkCsvWrite.writerow(["relation", "source", "target", "skipNum"])
    LinkCsvW.close()
    nodeIdNum = len(nodeList)

    # #最初方案
    # for i in range(33):
    #     if((i + 1) *100000 > nodeIdNum):
    #         changeLinkId(i, nodeList, linkList)
    #     else:
    #         changeLinkId(i, nodeList[nodeIdNum - ((i + 1)* 100000):], linkList)

    # 多线程操作
    # thread_pool = []
    # for i in range(38):
    #     if(i*100000 > nodeIdNum):
    #         thread_pool.append(threading.Thread(target=changeLinkId, args=[i, nodeList, linkList], name='th_' + "i"))
    #     else:
    #         thread_pool.append(threading.Thread(target=changeLinkId, args=[i, nodeList[nodeIdNum - ((i + 1)* 100000):], linkList], name='th_' + "i"))
    # for th in thread_pool:
    #     th.start()

    # 多进程操作
    num_cores = mp.cpu_count()
    for i in range(3):
        num_cores = 33 - (i*num_cores)
        print(num_cores)
        pool = mp.Pool(processes=num_cores)
        # 对每一个进程加入相应的函数
        for j in range(num_cores):
            numList = (i * 12) + j
            # 为了加快查询速率，对节点进行切割。
            nowNodeList = nodeList[nodeIdNum - ((numList + 1) * 100000):]
            if(((numList + 1) * 100000) > nodeIdNum):
                nowNodeList = nodeList
            print(numList)
            print(len(nowNodeList))
            pool.apply_async(changeLinkId, args=(
                numList, nowNodeList, linkList))
        pool.close()
        pool.join()

    # 将每个进程存储的Link数据存入一个文件夹中
    LinkCsvW = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/LinkNumId.csv",
                    'a+', encoding="utf-8", newline='')
    LinkCsvWrite = csv.writer(LinkCsvW)

    for i in range(33):
        LinkCsvWTemp = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/LinkNumId" + str(i) + ".csv",
                            'r', encoding="utf-8", newline='')
        LinkCsvTempReader = csv.reader(LinkCsvWTemp)
        num = 0
        with alive_bar(100000) as bar:
            for j in LinkCsvTempReader:
                num += 1
                LinkCsvWrite.writerow(j)
                bar()
        print(i, num)
        LinkCsvWTemp.close()
    LinkCsvW.close()


# 将link文件夹中的node的Id改成NumId
def changeLinkId(i, nodeList, linkList):
    nodeIdNum = len(nodeList)
    print(nodeIdNum)
    LinkCsvW = open(nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/LinkNumId" + str(i) + ".csv",
                    'w', encoding="utf-8", newline='')
    LinkCsvWrite = csv.writer(LinkCsvW)
    print(i)
    # 每次跑10万个数据
    nextList = (i + 1) * 100000
    if(nextList > len(linkList)):
        nextList = None
    for j in linkList[i*100000:nextList]:
        linkRelation = j[0]
        linkLength = 0
        # 根据业务规则2.1，存储其跳转次数
        if(j[0] == "r_asn" or j[0] == "r_cidr"):
            linkLength = 1
        elif(j[0] == "r_cert_chain" or j[0] == "r_cname"):
            linkLength = 2
        else:
            linkLength = 3
        # 找到其相关节点的numId
        try:
            linkSource = nodeIdNum - nodeList.index(j[1])
            linkTarget = nodeIdNum - nodeList.index(j[2])
        except:
            linkSource = j[1]
            linkTarget = j[2]
        LinkCsvWrite.writerow(
            [linkRelation, linkSource, linkTarget, linkLength])
    LinkCsvW.close()
    print(i)


if __name__ == '__main__':
    nowPath = "D:/个人相关/可视化大赛/ChinaVIS 2022/"
    # addNodeId()
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    nodes = ["Domain_c58c149eec59bb14b0c102a0f303d4c20366926b5c3206555d2937474124beb9",
    "Domain_f3554b666038baffa5814c319d3053ee2c2eb30d31d0ef509a1a463386b69845",
    "IP_400c19e584976ff2a35950659d4d148a3d146f1b71692468132b849b0eb8702c",
    "Domain_b10f98a9b53806ccd3a5ee45676c7c09366545c5b12aa96955cde3953e7ad058",
    "Domain_24acfd52f9ceb424d4a2643a832638ce1673b8689fa952d9010dd44949e6b1d9",
    "Domain_9c72287c3f9bb38cb0186acf37b7054442b75ac32324dfd245aed46a03026de1",
    "Domain_717aa5778731a1f4d6f0218dd3a27b114c839213b4af781427ac1e22dc9a7dea",
    "Domain_8748687a61811032f0ed1dcdb57e01efef9983a6d9c236b82997b07477e66177",
    "Whois_Phone_f4a84443fb72da27731660695dd00877e8ce25b264ec418504fface62cdcbbd7",
    "IP_7e730b193c2496fc908086e8c44fc2dbbf7766e599fabde86a4bcb6afdaad66e",
    "Cert_6724539e5c0851f37dcf91b7ac85cb35fcd9f8ba4df0107332c308aa53d63bdb",
    "Whois_Phone_fd0a3f6712ff520edae7e554cb6dfb4bdd2af1e4a97a39ed9357b31b6888b4af",
    "IP_21ce145cae6730a99300bf677b83bbe430cc0ec957047172e73659372f0031b8",
    "Domain_7939d01c5b99c39d2a0f2b418f6060b917804e60c15309811ef4059257c0818a",
    "Domain_587da0bac152713947db682a5443ef639e35f77a3b59e246e8a07c5eccae67e5"]
    nodesNumId= []
    for i in nodes:
        nodesNumId.extend((nodeCsvW[nodeCsvW["id"] == i].values).tolist())
    print(nodesNumId)
