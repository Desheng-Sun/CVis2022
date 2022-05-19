import bullet from "./bullet";
import "./index.css";
import * as d3 from "d3";

import { getBulletChartData } from "../../apis/api";
import { useEffect, useState } from "react";

export default function BulletChart() {
  const [data, setData] = useState({});
  const [dataRange, setDataRange] = useState({ minNum: 0, maxNum: 0 });
  useEffect(() => {
    getBulletChartData().then((res) => {
      // 计算数据中measures和markers共同的最大、最小值 用于画图比例尺映射
      let allNumInData = [];
      res.forEach((item, index) => {
        allNumInData.push(...item["measures"], ...item["markers"]);
      });

      // 设置数据 + 记录最大、最小值
      setData(res);
      setDataRange({
        minNum: Math.min(...allNumInData),
        maxNum: Math.max(...allNumInData),
      });
    });
  }, []);

  useEffect(() => {
    const dimensions = {
      width: 300,
      height: 600,
      margin: { top: 20, right: 20, bottom: 50, left: 20 },
    };
    const boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;
    const boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    let chart = bullet()
      .minNum(dataRange["minNum"])
      .maxNum(dataRange["maxNum"])
      .height(boundedHeight)
      .width((boundedWidth / data.length) * 0.9);

    d3.selectAll("div#bullet-chart svg").remove();

    const svg = d3
      .select("#bullet-chart")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", [0, 0, dimensions.width, dimensions.height])
      .style("max-width", "100%")
      .style("background", "#fff");

    const bounds = svg
      .append("g")
      .attr("width", boundedWidth)
      .attr("height", boundedHeight)
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );

    bounds
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bullet")
      .attr("width", boundedWidth / data.length)
      .attr("height", boundedHeight)
      .style(
        "transform",
        (d, i) => `translate(${(boundedWidth / data.length) * i}px,0px)`
      )
      .call(chart);

    // 添加文字标识类型
    const title = bounds.append("g").style("text-anchor", "start");
    title
      .selectAll(null)
      .data(data)
      .join("text")
      .attr("class", "title")
      .attr(
        "transform",
        (d, i) =>
          `translate(${(boundedWidth / data.length) * (i + 0.3)},${
            boundedHeight + 0.2 * dimensions.margin.bottom
          }) rotate(60)`
      )
      .text((d) => d.title);
  }, [data, dataRange]);

  return <div id="bullet-chart" style={{ width: 900, height: 300 }}></div>;
}
