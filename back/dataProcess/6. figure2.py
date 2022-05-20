import ast
import json
import os
from alive_progress import alive_bar
import networkx as nx
import pandas as pd

def getNodeIndustry(nowPath, nowNode, linksAll, nodeCsvW):
    with alive_bar(len(nowNode)) as bar:
        ipIndustryJson = {}
        for i in nowNode:
            ipIndustry = []
            for j in linksAll[i[0] - 1]:
                if(not nodeCsvW[j[1] - 1][-1] =="[]"):
                    nowIndustry = ast.literal_eval(nodeCsvW[j[1] - 1][-1])
                    nowIndustry.sort()
                    strnowIndustry = ""
                    for k in nowIndustry:
                        strnowIndustry += k
                    ipIndustry.append(strnowIndustry)
                    # nowIndustryList = ast.literal_eval(nowIndustry)
                    # ipIndustry.extend(nowIndustryList)
            ipIndustrySet = list(set(ipIndustry))
            ipIndustrySet.sort()
            ipIndustryNum = []
            for j in ipIndustrySet:
                ipIndustryNum.append([j, ipIndustry.count(j)])
            bar()
            if(len(ipIndustrySet) == 0):
                continue
            ipIndustryJson[str(i[0])] = ipIndustryNum

        with open(nowPath + "nodeIndustryInfo2.json", "w", encoding= "utf-8") as f:
            json.dump(ipIndustryJson,f,ensure_ascii=False)

if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
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

    filterNode = []
    for i in ipNode:
        filterNode.append(i)
    for i in certNode:
        filterNode.append(i)

    getNodeIndustry(nowPath, filterNode, linksAll, nodeCsvW)