import json
import os
from alive_progress import alive_bar
import multiprocessing as mp
import numpy as np
import pandas as pd

if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    with open(nowPath + "ICScreenLinks/3.json", "r", encoding="utf-8") as f:
        nodeLinksInfo = json.load(f)
        nodes = {}
        for i in nodeLinksInfo[0]["nodes"]:
            nodes[str(i[0])] = {
                "numId":i[0],
                "id": i[1],
                "name": i[2],
                "type": i[3],
                "industry": i[4],
                "isCore": True,
                "LinksInfo":[]
            }
        for i in nodeLinksInfo[0]["links"]:
            nodes[str(i[1])]["LinksInfo"].append(i[0])
            nodes[str(i[2])]["LinksInfo"].append(i[0])
            
        LinksSet = ["r_cert",
                    "r_subdomain",
                    "r_request_jump",
                    "r_dns_a",
                    "r_whois_name",
                    "r_whois_email",
                    "r_whois_phone",
                    "r_cert_chain",
                    "r_cname",
                    "r_asn",
                    "r_cidr"]
        for i in nodes:
            for j in LinksSet:
                nodes[str(i)].update({j: nodes[i]["LinksInfo"].count(j)})
        nodesInfo = []
        for i in nodes:
            del nodes[i]['LinksInfo'] 
            nodesInfo.append(nodes[i])
        with open(nowPath + "3.json", "w", encoding="utf-8") as f:
            json.dump(nodesInfo, f, ensure_ascii=False)


