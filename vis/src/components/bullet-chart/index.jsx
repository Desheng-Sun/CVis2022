import bullet from "./bullet";
import "./index.css";
import * as d3 from "d3";

import { getBulletChartData } from "../../apis/api";
import { useEffect, useState } from "react";

export default function BulletChart({ w, h, divname }) {
  const [data, setData] = useState({});
  const [dataRange, setDataRange] = useState({ minNum: 0, maxNum: 0 });

  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [divName, setDivName] = useState(divname);

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
    // console.log(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

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
      width: svgWidth,
      height: svgHeight,
      margin: { top: 10, right: 5, bottom: 20, left: 5 },
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

    // d3.selectAll("div#bullet-chart svg").remove();
    d3.selectAll(`div#${divname} svg`).remove();

    const svg = d3
      .select(`#${divname}`)
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
  }, [data, dataRange, svgHeight, svgWidth]);

  // return <div style={{ width: "100%", height: "100%" }}></div>;
  return <></>;
}
