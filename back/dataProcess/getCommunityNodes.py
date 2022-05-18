import json
import pandas as pd
import re
from alive_progress import alive_bar
import ast

if __name__ == '__main__':
    nowPath = "./data/"
    # 打开所有的节点
    nodeCsvW = pd.read_csv(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
    linkCsvW = open(
        nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/nodeLinksJson.json", 'r', encoding='utf-8')
    linksAll = json.load(linkCsvW)
    nodeCsvW = nodeCsvW.values
    nodeCommunityT = open(nowPath + "res_IG_lv_5-14(1).txt", "r", encoding="utf-8")
    nodeCommunity = nodeCommunityT.read()
    
    nodeCommunity = list(map(lambda x: x.replace("\n", "").replace(" ","").replace("[",""),re.split("\d+\]", nodeCommunity)))
    communityInfo = []
    num = 1
    with alive_bar(5458) as bar:
        for i in nodeCommunity:
            bar()
            if(i == ""):
                continue
            i = i.split(",")
            with open(nowPath + "CommunityLinks/" + str(num) + ".json", "r", encoding="utf-8") as f:
                LinksInfo = json.load(f)
                nodesNum = len(LinksInfo["nodes"])
                linksNum = len(LinksInfo["links"])
                communityInfo.append([num, len(i), nodesNum,linksNum])
            num += 1
    with open(nowPath + "CommunityLinks/communityInfo.json", "w", encoding="utf-8") as f:
        json.dump(communityInfo,f,ensure_ascii=False)

    
    # with alive_bar(36000) as bar:
    #     for i in nodeCommunity:
    #         if(i == ""):
    #             continue
    #         i = i.split(",")
    #         nodes = []
    #         links = []
    #         i.sort()
    #         for j in i:
    #             if(j == ""):
    #                 continue
    #             try:
    #                 nowNodeLinksInfoJ = open(
    #                     nowPath + "LinksByIPScreen/" + str(j) + ".json", "r", encoding="utf-8")
    #             except:
    #                 nowNodeLinksInfoJ = open(
    #                     nowPath + "LinksByCertScreen/" + str(j) + ".json", "r", encoding="utf-8")
    #             # 获取当前节点和其他节点的链路信息
    #             nowIndustry = []
    #             nodesWithNow = []
    #             nowNodeLinksInfo = json.load(nowNodeLinksInfoJ)
    #             for k in nowNodeLinksInfo:
    #                 # 判断连接的节点是否在当前社区内
    #                 if(str(k["end"][0]) in i):
    #                     for l in k["links"]:
    #                         links.append(str([l[0],int(l[1]), int(l[2]), l[3]]))
    #                         if(int(l[2]) == int(j)):
    #                             nodesWithNow.append(int(l[1]))
    #                     for l in k["nodes"]:
    #                         nodes.append(int(l[0]))
    #             nodesWithNow = list(set(nodesWithNow))
    #             for k in nodesWithNow:
    #                 nowIndustry.append(nodeCsvW[k -1][-1])
    #             nowIndustrySet = list(set(nowIndustry))
    #             if("[]" in nowIndustrySet):
    #                 nowIndustrySet.remove("[]")
    #             for k in linksAll[int(j) - 1]:
    #                 if(k[1] in nodesWithNow):
    #                     continue
    #                 nowNodeIndustry = nodeCsvW[k[1] -1][-1]
    #                 ipAndCert = 0
    #                 for l in linksAll[k[1] - 1]:
    #                     if(l[0] == "r_dns_a" or l[0] == "r_cert"):
    #                         ipAndCert += 1
    #                         if(ipAndCert > 1):
    #                             break
    #                 if(ipAndCert == 1):
    #                     nodes.append(k[1])
    #                     links.append(str(k))
    #                 else:
    #                     if(nowNodeIndustry == "[]"):
    #                         nodes.append(k[1])
    #                         links.append(str(k))
    #                     elif(len(nowIndustry) > 0 and nowIndustry.count(nowNodeIndustry)/len(nowIndustry) > 0.3):                    
    #                         nodes.append(k[1])
    #                         links.append(str(k))
    #             bar()
    #         nodesInfo = []
    #         for k in list(set(nodes)):
    #             nodesInfo.append(list(nodeCsvW[k - 1]))
    #         useLinks = []
    #         links = list(set(links))
    #         for k in links:
    #             useLinks.append(ast.literal_eval(k))
    #         with open(nowPath + "CommunityLinks/" + str(num) + ".json", "w", encoding="utf-8") as f:
    #             json.dump({
    #                 "nodes": nodesInfo,
    #                 "links": useLinks
    #             }, f, ensure_ascii=False)
    #         num += 1
        
                    




        
