import json
from operator import imod
import os
from platform import node
import pandas as pd
import multiprocessing as mp
import time
from alive_progress import alive_bar
import sys

if __name__ == '__main__':
    nowPath = os.path.abspath(os.path.dirname(
        os.path.dirname(__file__))) + "/data/"
    if(not os.path.exists(nowPath + "ic-clue-data/" + str(sys.argv[0]) + ".json")):
        nodeCsvW = pd.read_csv(
            nowPath + "ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumId.csv", header=0)
        nodeCsvW = nodeCsvW.values
        ICScreenJ = open(nowPath + "ICScreen.json", "r", encoding="utf-8")
        ICScreen = json.load(ICScreenJ)