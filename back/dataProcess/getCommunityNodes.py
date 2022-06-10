import json
from math import fabs
from numpy import sort
import pandas as pd
import re
from alive_progress import alive_bar
import ast
import os

if __name__ == '__main__':

    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"

    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv", header=0)
    nodeCsvW = nodeCsvW.values


    # for i in range(1,6):
    #     groupInfoJ = open("D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge1/Challenge-1." +
    #                 str(i) + "/main.json", "r", encoding="utf-8")    
    #     groupInfo = json.load(groupInfoJ)
    #     allNodes = {}
    #     useNodes = []
    #     allLinks = {}
    #     useLinks = []
    #     for j in groupInfo["nodes"]:
    #         if(str(j["numId"]) in allNodes):
    #             continue
    #         allNodes[str(j["numId"])] = j
    #     for j in groupInfo["links"]:
    #         if(str(j["linksNumId"]) in allLinks):
    #             continue
    #         allLinks[str(j["linksNumId"])] = j
    #     for j in allNodes:
    #         useNodes.append(allNodes[j])
    #     for j in allLinks:
    #         useLinks.append(allLinks[j])
    #     groupInfoJ = open("D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge1/Challenge-1." +
    #                 str(i) + "/main.json", "w", encoding="utf-8")    
    #     json.dump({
    #         "nodes":useNodes,
    #         "links":useLinks,
    #     } ,groupInfoJ, ensure_ascii=False)
        
        
    # AllNodes = {}
    for i in range(1, 6):
        LinksSet = {
            "r_cert": 0,
            "r_subdomain": 0,
            "r_request_jump": 0,
            "r_dns_a": 0,
            "r_whois_name": 0,
            "r_whois_email": 0,
            "r_whois_phone": 0,
            "r_cert_chain": 0,
            "r_cname": 0,
            "r_asn": 0,
            "r_cidr": 0,
        }
        print(i)
        certNum = 0
        IPNum = 0
        groupInfoJ = open("D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge1/Challenge-1." +
                          str(i) + "/useData/MainChartData.json", "r", encoding="utf-8")
        groupInfo = json.load(groupInfoJ)
        for j in groupInfo["links"]:
            if(j["isCore"] == True):
                LinksSet[j["relation"]] += 1
        
        for j in groupInfo["nodes"]:
            if(j["isCore"] == True):
                if(nodeCsvW[int(j["numId"]) - 1][3] == "IP"):
                    IPNum +=1
                else:
                    certNum += 1

        print(LinksSet, IPNum, certNum)
        # for j in groupInfo["nodes"]:
        #     if(str(j["numId"]) in AllNodes):
        #         AllNodes[str(j["numId"])].append("1: " + str(i))
        #         continue

        #     AllNodes[str(j["numId"])] = ["1: " + str(i)]

    # for i in range(1, 11):
    #     if(i == 2 or i == 4 or i == 6):
    #         continue
    #     LinksSet = {
    #         "r_cert": 0,
    #         "r_subdomain": 0,
    #         "r_request_jump": 0,
    #         "r_dns_a": 0,
    #         "r_whois_name": 0,
    #         "r_whois_email": 0,
    #         "r_whois_phone": 0,
    #         "r_cert_chain": 0,
    #         "r_cname": 0,
    #         "r_asn": 0,
    #         "r_cidr": 0,
    #     }
    #     isAll = 0
    #     certNum = 0
    #     IPNum = 0
    #     IPnot = 0
    #     print(i)
    #     groupInfoJ = open("D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge2/Challenge-2." +
    #                       str(i) + "/useData/MainChartData.json", "r", encoding="utf-8")
    #     groupInfo = json.load(groupInfoJ)
    #     for j in groupInfo["links"]:
    #         if(j["isCore"] == True):
    #             LinksSet[j["relation"]] += 1
    #             isAll += 1
        
    #     for j in groupInfo["nodes"]:
    #         if(j["isCore"] == True):
    #             if(nodeCsvW[int(j["numId"]) - 1][3] == "IP"):
    #                 if(j["isDelivery"] == True):
    #                     IPnot += 1
    #                 IPNum +=1
    #             else:
    #                 certNum += 1

    #     print(LinksSet, isAll, IPNum, certNum, IPNum + certNum, IPnot)
    #     for j in groupInfo["nodes"]:
    #         if(str(j["numId"]) in AllNodes):
    #             AllNodes[str(j["numId"])].append("2: " + str(i))
    #             continue

    #         AllNodes[str(j["numId"])] = ["2: " + str(i)]
    # num = 0
    # for i in AllNodes:
    #     if(len(AllNodes[i]) > 1):
    #         print(i, AllNodes[i], nodeCsvW[int(i) - 1][3])
    #         num += 1
    # print(num)

    # groupInfoJ = open(
    #     "D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge2/nodesInfo.json", "w", encoding="utf-8")
    # json.dump(AllNodes, groupInfoJ, ensure_ascii=False)


    # AllNodes = set()
    # groupInfoJ = open("D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge1/Challenge-1.5/main.json", "r", encoding="utf-8")
    # groupInfo = json.load(groupInfoJ)
    # useNodes = []
    # for i in groupInfo["nodes"]:
    #     if(i["numId"] in AllNodes):
    #         print(i["numId"], "11111")
    #         continue
    #     AllNodes.add(i["numId"])
    #     useNodes.append(i)
        
    # alllinks = set()
    # useLinks = []
    # for i in groupInfo["links"]:
    #     if(str(i["linksNumId"]) in alllinks):
    #         print(i["linksNumId"], "2222")
    #         continue
    #     alllinks.add(str(i["linksNumId"]))
    #     if(i["linksNumId"][0] in AllNodes and i["linksNumId"][1] in AllNodes):
    #         useLinks.append(i)
    #         continue
    # print(len(useNodes))
    # print(len(useLinks))
    # groupInfoJ = open("D:/个人相关/可视化大赛/ChinaVIS 2022/Challenge1/Challenge-1.5/main1.json", "w", encoding="utf-8")
    # json.dump({
    #     "nodes": useNodes,
    #     "links": useLinks
    # }, groupInfoJ, ensure_ascii=False)

