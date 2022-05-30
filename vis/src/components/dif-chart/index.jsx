import * as d3 from "d3";
import { curveCatmullRomOpen } from "d3";
import { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import { getDifChartSds } from "../../apis/api.js";
import "./index.css";

export default function DifChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState([]);
  const [selectICLinks, setSelectICLinks] = useState("");

  const [linksInfo, setLinksInfo] = useState({ nodes: [], links: [] });

  // 随主图数据更新而更新视图
  PubSub.unsubscribe("updateDifChart");
  PubSub.subscribe("updateDifChart", (msg, linksInfo) => {
    setLinksInfo(linksInfo);
  });

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h * 0.85);
  }, [h]);
  useEffect(() => {
    if (data.length !== 0) {
      draw();
    }
  }, [data]);

  useEffect(() => {
    getDifChartSds(linksInfo).then((res) => {
      console.log(res);
      console.log("------", res);
      setData(res);
    });
  }, [linksInfo]);

  // 绘制结构图
  function draw() {
    if (JSON.stringify(data) === "[]") return;
    d3.selectAll("#diff-legend svg").remove();
    d3.selectAll("#diff-chart svg").remove();
  }

  return (
    <div id="difference-chart">
      <div id="diff-legend" style={{ width: "100%", height: "5%" }}></div>
      <div id="diff-chart" style={{ width: "100%", height: "95%" }}></div>
    </div>
  );
}
