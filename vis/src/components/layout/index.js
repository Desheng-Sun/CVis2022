import "./index.css";

import ChartHeader from "../chart-header";
import InfoList from "../info-list";
import CountsBar from "../counts-bar";
import DifChart from "../dif-chart";
import ICClueChart from "../ic-clue-chart";
import SkeletonChart from "../skeleton-chart";
import SearchBar from "../search-bar";
import CombineTable from "../combine-table";
import MainChartCytoscape from "../sub-chart-cytoscape";
import ConclusionText from "../conclusion-text";
import { useEffect, useState } from "react";

export default function Layout() {
  // const [countsBarWidth, setCountsBarWidth] = useState(0);
  // const [countsBarHeight, setCountsBarHeight] = useState(0);
  const [difChartWidth, setDifChartWidth] = useState(0);
  const [difChartHeight, setDifChartHeight] = useState(0);
  const [icClueChartWidth, setIcClueChartWidth] = useState(0);
  const [icClueChartHeight, setIcClueChartHeight] = useState(0);
  const [skeletonChartWidth, setSkeletonChartWidth] = useState(0);
  const [skeletonChartHeight, setSkeletonChartHeight] = useState(0);
  const [combineTableWidth, setCombineTableWidth] = useState(0);
  const [combineTableHeight, setCombineTableHeight] = useState(0);
  const [mainChartWidth, setMainChartWidth] = useState(0);
  const [mainChartHeight, setMainChartHeight] = useState(0);

  const [curIC, setCurrIC] = useState(""); // 当前选中的IP/Cert

  useEffect(() => {
    // setCountsBarWidth(
    //   document.getElementById("statistic").getBoundingClientRect().width
    // );
    // setCountsBarHeight(
    //   document.getElementById("statistic").getBoundingClientRect().height
    // );
    setDifChartWidth(
      document.getElementById("deleterelation").getBoundingClientRect().width
    );
    setDifChartHeight(
      document.getElementById("deleterelation").getBoundingClientRect().height
    );
    setIcClueChartWidth(
      document.getElementById("icclue-graph").getBoundingClientRect().width
    );
    setIcClueChartHeight(
      document.getElementById("icclue-graph").getBoundingClientRect().height
    );
    // setSkeletonChartWidth(
    //   document.getElementById("skeleton-chart").getBoundingClientRect().width
    // );
    // setSkeletonChartHeight(
    //   document.getElementById("skeleton-chart").getBoundingClientRect().height
    // );
    setCombineTableWidth(
      document.getElementById("sta-node").getBoundingClientRect().width
    );
    setCombineTableHeight(
      document.getElementById("sta-node").getBoundingClientRect().height
    );
    // setMainChartWidth(
    //   document.getElementById("mainmap").getBoundingClientRect().width
    // );
    // setMainChartHeight(968);
  });

  return (
    <div id="layout">
      <div id="identifygroup">
        <div id="ileft">
          <div id="titlebar">黑灰产网络资产可视分析系统</div>
          <div id="searchbar">
            <SearchBar />
            {/* 输入/搜索框 用户有IP/Cert类型的线索
            或根据其他节点查找到对应的IP/Cert类型的线索 */}
          </div>
          <div id="filteric">
            <ChartHeader chartName={"冰柱图"} />
            <ICClueChart w={icClueChartWidth} h={icClueChartHeight} />
          </div>
          <div id="nodelinkic">
            <ChartHeader chartName={"IP <——> Cert"} />
            {/* <SkeletonChart w={skeletonChartWidth} h={skeletonChartHeight} /> */}
          </div>
        </div>
        <div id="iright">
          <div id="container-mainmap">
            <div id="mainmap">
              {/* <ChartHeader chartName={"主图"} />
              <MainChartCytoscape w={mainChartWidth} h={mainChartHeight} /> */}
            </div>
          </div>
          <div id="container-filter">
            <div id="deleterelation">
              <ChartHeader chartName={"差异视图"} />
              <DifChart w={difChartWidth} h={difChartHeight} />
            </div>
            <div id="existingdomain">展示当前子图中domain情况</div>
          </div>
        </div>
      </div>
      <div id="analyzegroup">
        <div id="infotable">
          <ChartHeader chartName={"团伙基本信息"} />
          <InfoList />
        </div>
        <div id="container-statistic">
          <ChartHeader chartName={"节点与边信息"} />
          <div id="sta-node">
            <CombineTable
              w={combineTableWidth}
              h={combineTableHeight}
              b="node"
            />
          </div>
          <div id="divider"></div>
          <div id="sta-link">
            <CombineTable
              w={combineTableWidth}
              h={combineTableHeight}
              b="link"
            />
          </div>
        </div>

        <div id="assetandpath">核心资产与关键链路展示</div>
        <div id="conclusion">
          <ChartHeader chartName={"团伙分析结果"} />
          <ConclusionText />
        </div>
      </div>
    </div>
  );
}
