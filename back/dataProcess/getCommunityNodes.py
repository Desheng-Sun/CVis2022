import json
import pandas as pd
import re
from alive_progress import alive_bar
import ast
import os

if __name__ == '__main__':
    
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"

        
    # # 打开所有的节点
    # nodeCsvW = pd.read_csv(
    #     nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/link.csv", header=0)
    # nodeCsvW = nodeCsvW.values 
    # num = 0
    # for i in nodeCsvW:
    #     num += 1
    #     if("whois" in i[0]):
    #         if("Whois" in i[1]):
    #             print(i, num)

    # ICScreenLinksJ = open(nowPath + "ICLinksInfo.json", "r", encoding="utf-8")
    # ICScreenLinks = json.load(ICScreenLinksJ)
    # IP_IP = 0
    # IP_Cert = 0
    # Cert_Cert = 0
    # IPNum = 0
    # CertNum = 0
    # for i in ICScreenLinks:
    #     type1 = nodeCsvW[int(i) - 1][3]
    #     if(type1 == "IP"):
    #         IPNum += 1
    #     else:
    #         CertNum += 1
    #     for j in ICScreenLinks[i]:
    #         if(j[0] > j[1]):
    #             continue
    #         type2 = nodeCsvW[j[1] - 1][3]
    #         if(type1 == "IP"):
    #             if(type2 == "IP"):
    #                 IP_IP += 1
    #             else:
    #                 IP_Cert += 1
    #         if(type1 == "Cert"):
    #             if(type2 == "Cert"):
    #                 Cert_Cert += 1
    #             else:
    #                 IP_Cert += 1
    # print(IP_IP)
    # print(IP_Cert)
    # print(Cert_Cert)
    # print(IPNum)
    # print(CertNum)


    # print(len(ICScreenLinks))
    # num = 0
    # useICLinks = []
    # for i in ICScreenLinks:
    #     num += 1
    #     useICLinks.append(i)
    #     if(num == 450):
    #         print(i["end"][0])
    #         ICScreenLinksJ1 = open(nowPath + "ICScreenLinks/523_1.json", "w", encoding="utf-8")
    #         json.dump(useICLinks, ICScreenLinksJ1, ensure_ascii=False)
    #         useICLinks = []
    #     if(num == 950):
    #         print(i["end"][0])
    #         ICScreenLinksJ2 = open(nowPath + "ICScreenLinks/523_2.json", "w", encoding="utf-8")
    #         json.dump(useICLinks, ICScreenLinksJ2, ensure_ascii=False)
    #         useICLinks = []
    #     if(num == len(ICScreenLinks)):
    #         print(i["end"][0])
    #         ICScreenLinksJ3 = open(nowPath + "ICScreenLinks/523_3.json", "w", encoding="utf-8")
    #         json.dump(useICLinks, ICScreenLinksJ3, ensure_ascii=False)
    #         useICLinks = []





    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv", header=0)
    nodeCsvW = nodeCsvW.values
    ICIndustryInfoJ = open(nowPath + "ICIndustryInfo.json", "r", encoding="utf-8")
    ICIndustryInfo = json.load(ICIndustryInfoJ)
    with open(nowPath + "ICLinksInfo.json", "r", encoding="utf-8") as f:
        ICLinksInfo = json.load(f)
        nowICIndustry = ["A", "B"]
        links = []
        for i in ICLinksInfo["3115"]:
            if(i[4] > 0):
                isLink = True
                for j in ICIndustryInfo[str(i[1])]:
                    if(j[0] not in nowICIndustry):
                        isLink = False
                        break
                if(isLink):
                    # print(nodeCsvW[i[1] - 1][0], nodeCsvW[i[1] - 1][1])
                    links.append(nodeCsvW[i[1] - 1][0])
        with open(nowPath + "ICScreenLinks/3115.json", "r", encoding="utf-8") as f2:
            ICScreenLinks = json.load(f2)
            for i in ICScreenLinks:
                if(i["end"][0] in links):
                    for j in i["links"]:
                        if(j[2] == i["end"][0] and j[3] == 2):
                            print(nodeCsvW[i["end"][0] - 1][0], nodeCsvW[i["end"][0] - 1][1])
                            break

    

    

    
                    



                    




        
