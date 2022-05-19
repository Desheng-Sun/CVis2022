import "./index.css";

import ChartHeader from "../chart-header";
import InfoList from "../info-list";
import CountsBar from "../counts-bar";
import DifChart from "../dif-chart";
import ICClueChart from "../ic-clue-chart";
import SkeletonChart from "../skeleton-chart";
import { useEffect, useState } from "react";

export default function Layout() {
  const [countsBarWidth, setCountsBarWidth] = useState(0);
  const [countsBarHeight, setCountsBarHeight] = useState(0);
  const [difChartWidth, setDifChartWidth] = useState(0);
  const [difChartHeight, setDifChartHeight] = useState(0);
  const [icClueChartWidth, setIcClueChartWidth] = useState(0);
  const [icClueChartHeight, setIcClueChartHeight] = useState(0);
  const [skeletonChartWidth, setSkeletonChartWidth] = useState(0);
  const [skeletonChartHeight, setSkeletonChartHeight] = useState(0);

  useEffect(() => {
    setCountsBarWidth(
      document.getElementById("statistic").getBoundingClientRect().width
    );
    setCountsBarHeight(
      document.getElementById("statistic").getBoundingClientRect().height
    );
    setDifChartWidth(
      document.getElementById("deleterelation").getBoundingClientRect().width
    );
    setDifChartHeight(
      document.getElementById("deleterelation").getBoundingClientRect().height
    );
    setIcClueChartWidth(
      document.getElementById("filteric").getBoundingClientRect().width
    );
    setIcClueChartHeight(
      document.getElementById("filteric").getBoundingClientRect().height
    );
    setSkeletonChartWidth(
      document.getElementById("skeleton-chart").getBoundingClientRect().width
    );
    setSkeletonChartHeight(
      document.getElementById("skeleton-chart").getBoundingClientRect().height
    );
  });
  return (
    <div id="layout">
      <div id="identifygroup">
        <div id="ileft">
          <div id="titlebar">Black & Gary Instrudy Network Mining</div>
          <div id="searchbar">
            输入/搜索框 用户有IP/Cert类型的线索
            或根据其他节点查找到对应的IP/Cert类型的线索
          </div>
          <div id="filteric">
            <ChartHeader chartName={"冰柱图"} />
            <ICClueChart w={icClueChartWidth} h={icClueChartHeight} />
          </div>
          <div id="nodelinkic">
            <ChartHeader chartName={"IP <——> Cert"} />
            <SkeletonChart w={skeletonChartWidth} h={skeletonChartHeight} />
          </div>
        </div>
        <div id="iright">
          <div id="container-mainmap">
            <div id="controlmainmap">主图的控制台</div>
            <div id="mainmap">主图</div>
          </div>
          <div id="container-filter">
            <div id="deleterelation">
              <ChartHeader chartName={"差异视图"} />
              <DifChart w={difChartWidth} h={difChartHeight} />
              {/* 差异视图 删IP/Cert节点 */}
            </div>
            <div id="existingdomain">展示当前子图中domain情况</div>
          </div>
        </div>
      </div>
      <div id="analyzegroup">
        <div id="infotable">
          <ChartHeader chartName={"团伙基本信息"} />
          <InfoList />
          {/* 列表展示确定团伙的信息 */}
        </div>
        <div id="container-statistic">
          <div id="relations">关系图</div>
          <div id="statistic">
            {/* <CountsBar w={countsBarWidth} h={countsBarHeight} /> */}
          </div>
        </div>

        <div id="assetandpath">核心资产与关键链路展示</div>
        <div id="conclusion">文字模板，描述团伙基本信息与主要运作机制</div>
      </div>
    </div>
  );
}
