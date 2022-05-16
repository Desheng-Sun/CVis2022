import csv
import pandas as pd
import numpy as np
from tqdm import tqdm
import json
from alive_progress import alive_bar


def categoryLinksByNode():
    # 打开所有的节点
    nodeCsv = open(
        "D:/个人相关/可视化大赛/ChinaVIS 2022/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/results-CVis.json", "r", encoding='utf-8')
    nodeCsvR = json.load(nodeCsv)
    linkCsv = pd.read_csv(
        "D:/个人相关/可视化大赛/ChinaVIS 2022/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/LinkNumId.csv", header=0)
    linkCsv = np.array(linkCsv)
    f = open("ChinaVis2022/Links_byNode.csv", 'w', encoding='utf-8',newline="")
    f = csv.writer(f)
    f.writerow(["_from","_to","relation","source","target","skipnum"])
    with alive_bar(3286986) as bar:
        for row in linkCsv:
            f.writerow([nodeCsvR[row[1] - 1]["_id"],nodeCsvR[row[2] - 1]["_id"],row[0],row[1],row[2],row[3]])
            bar()
def matchModeNumId_Id():
    # 打开所有的节点
    nodeCsv = open(
        "D:/个人相关/可视化大赛/ChinaVIS 2022/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/results-CVis.json", "r", encoding='utf-8')
    nodeCsvR = json.load(nodeCsv)

if __name__ == '__main__':
    nowPath = "D:/个人相关/可视化大赛/ChinaVIS 2022/"
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    linkCsvW = open(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/nodeLinksJson.json", 'r', encoding='utf-8')
    linksAll = json.load(linkCsvW)
    linkCsvW.close()
    ipNode = nodeCsvW[nodeCsvW["type"] == "IP"].values
    certNode = nodeCsvW[nodeCsvW["type"] == "Cert"].values
    nodeCsvW = nodeCsvW.values