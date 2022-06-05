import json
import pandas as pd
import re
from alive_progress import alive_bar
import ast
import os

if __name__ == '__main__':
    
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    ICScreenLinksJ = open(nowPath + "ICScreenLinks/523.json", "r", encoding="utf-8")
    ICScreenLinks = json.load(ICScreenLinksJ)
    print(len(ICScreenLinks))
    num = 0
    useICLinks = []
    for i in ICScreenLinks:
        num += 1
        useICLinks.append(i)
        if(num == 450):
            print(i["end"][0])
            ICScreenLinksJ1 = open(nowPath + "ICScreenLinks/523_1.json", "w", encoding="utf-8")
            json.dump(useICLinks, ICScreenLinksJ1, ensure_ascii=False)
            useICLinks = []
        if(num == 950):
            print(i["end"][0])
            ICScreenLinksJ2 = open(nowPath + "ICScreenLinks/523_2.json", "w", encoding="utf-8")
            json.dump(useICLinks, ICScreenLinksJ2, ensure_ascii=False)
            useICLinks = []
        if(num == len(ICScreenLinks)):
            print(i["end"][0])
            ICScreenLinksJ3 = open(nowPath + "ICScreenLinks/523_3.json", "w", encoding="utf-8")
            json.dump(useICLinks, ICScreenLinksJ3, ensure_ascii=False)
            useICLinks = []





    # # 打开所有的节点
    # nodeCsvW = pd.read_csv(
    #     nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv", header=0)
    # nodeCsvW = nodeCsvW.values
    # with open(nowPath + "ICLinksInfo.json", "r", encoding="utf-8") as f:
    #     ICLinksInfo = json.load(f)
    #     nowICIndustry = []
    #     for i in ICIndustryInfo["3115"]:
    #         nowICIndustry.append(i[0])
    #     for i in ICLinksInfo["3115"]:
    #         if(i[4] > 0):
    #             isLink = True
    #             for j in ICIndustryInfo[str(i[1])]:
    #                 if(j[0] not in nowICIndustry):
    #                     isLink = False
    #                     break
    #             if(isLink):
    #                 print(nodeCsvW[i[1] - 1][0], nodeCsvW[i[1] - 1][1])



                    




        
