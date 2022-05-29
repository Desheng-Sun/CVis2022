import * as echarts from "echarts";
import { useEffect, useState } from "react";

export default function CrutialPath() {
  const [data, setData] = useState({ nodes: [], links: [] });
  /**
   * 在核心资产视图中 选择的起点核心资产与终点核心资产 作为参数请求数据，
   * 数据处理流程：
   *  1. 计算两个核心资产之间的最短路
   *  2. 取最短路的长度L，找出该对核心资产之间长度为L的所有路径，作为关键路径
   * 数据处理依据：
   *  两个核心资产之间的路径为关键路径；路径越短，重要程度越高
   */
  useEffect(() => {
    drawSankey();
  }, []);

  function drawSankey() {
    let chartDom = document.getElementById("crutial-path");
    // 判断dom是否已经被实例化, 如果已存在实例，则dispose()
    let existInstance = echarts.getInstanceByDom(chartDom);
    if (existInstance != undefined) {
      echarts.dispose(existInstance);
    }

    // 对应Domain、IP、Cert、Whois、Whois、Whois、IPC、ASN
    let colors = [
      "#2978b4",
      "#33a02c",
      "#ff756a",
      "#f67f02",
      "#f67f02",
      "#f67f02",
      "#7fc97f",
      "#f9bf6f",
    ];
    let nodes = [
      { name: "L1", itemStyle: { color: colors[1] }, depth: 0 },
      { name: "L2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-1", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-3", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-4", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L4", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L5", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L3", itemStyle: { color: colors[1] }, depth: 3 },
    ];

    let links = [
      { source: "L1", target: "L2", value: 2 },
      { source: "L4", target: "L3", value: 4 },
      { source: "L5", target: "L3", value: 3 },
      { source: "L2", target: "L4", value: 1 },
      { source: "L2", target: "L5", value: 1 },
      { source: "L1", target: "L2-1", value: 1 },
      { source: "L1", target: "L2-2", value: 2 },
      { source: "L2-1", target: "L4", value: 1 },
      { source: "L1", target: "L2-3", value: 1 },
      { source: "L2-3", target: "L4", value: 1 },
      { source: "L1", target: "L2-4", value: 1 },
      { source: "L2-4", target: "L5", value: 1 },
      { source: "L2-2", target: "L5", value: 1 },
      { source: "L2-2", target: "L4", value: 1 },
    ];

    let sankey = echarts.init(chartDom);

    let option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: {
        type: "sankey",
        lineStyle: {
          opacity: 0.3,
          color: "gradient",
          curveness: 0.7,
        },
        nodeAlign: "left",
        nodeGap: 10,
        layoutIterations: 1,
        emphasis: {
          focus: "adjacency",
        },
        data: nodes,
        links: links,
      },
    };

    sankey.setOption(option);
    window.onresize = sankey.resize;
  }

  return (
    <div id="crutial-path" style={{ height: "400px", width: "800px" }}></div>
  );
}
