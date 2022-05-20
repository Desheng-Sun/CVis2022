import * as d3 from "d3";
import { useEffect, useState } from "react";
import "../dif-chart/index.css";
export default function DifChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);
  useEffect(() => {
    let n = 5;
    let svg = d3
      .select("#difference-chart")
      .append("svg")
      .attr("id", "all-svg")
      .attr("width", svgWidth)
      .attr("height", n * svgHeight * 1.1);
    for (let i = 0; i < n; i++) {
      drawChart(i, svg);
    }
  });
  function getRectPosition(rectWidth, rectPadding) {
    let rectX = [];
    for (let i = 0; i <= rectWidth.length; i++) {
      let rectTempWidth = rectWidth.slice(0, i);
      rectX.push((d3.sum(rectTempWidth) + i * rectPadding) * 0.7);
    }
    return rectX;
  }

  // 绘制结构图
  function drawChart(i, svg) {
    const height = 400;
    const width = svgWidth;
    const difdata = [
      {
        name: "IP_1", value:
          [{ name: 'A', value: 10 },
          { name: 'A,B', value: 20 },
          { name: 'B,C', value: 35 },
          { name: 'B,D,E', value: 40 },
          { name: 'B,D', value: 52 }
          ]
      },
      {
        name: 'IP_2', value:
          [{ name: 'A', value: 80 },
          { name: 'A,B', value: 40 },
          { name: 'B,C', value: 35 },
          { name: 'B,D,E', value: 20 },
          { name: 'B,D', value: 10 }]
      },
      {
        name: "IP_1+IP_2", value:
          [{ name: 'A', value: 50 },
          { name: 'A,B', value: 100 },
          { name: 'B,C', value: 120 },
          { name: 'B,D,E', value: 50 },
          { name: 'B,D', value: 120 }]
      }];
    let dataset1 = [];
    Object.values(difdata[0].value).forEach(val => { dataset1.push(val.value) });
    let dataset2 = [];
    Object.values(difdata[1].value).forEach(val => { dataset2.push(val.value) });
    let rectWidth = []; //每个矩形的默认宽度
    Object.values(difdata[2].value).forEach(val => { rectWidth.push(val.value) });
    let rectPadding = 10; //每个矩形间的间隔
    let rectX = getRectPosition(rectWidth, rectPadding);
    let padding = { top: 30, bottom: 30, left: 30, right: 30 }; //定义间隔
    //定义画布
    let g = svg
      .append("g")
      .attr("class", "dif-chart" + i)
      .attr("transform", `translate(${padding.left},${svgHeight * i * 1.1})`)
      .attr("width", width)
      .attr("height", height);

    //定义矩形比例尺
    let yScale1 = d3
      .scaleLinear()
      .domain([0, d3.max([d3.max(dataset1), d3.max(dataset2)])])
      .range([height / 2 - padding.top, 0]);
    let yAxis1 = d3.axisLeft(yScale1).ticks(5);
    let yScale2 = d3
      .scaleLinear()
      .domain([-d3.max([d3.max(dataset1), d3.max(dataset2)]), 0])
      .range([height - 2 * padding.top, height / 2 - padding.top]);
    let yAxis2 = d3.axisLeft(yScale2).ticks(5);
    g
      .append("g")
      .attr("transform", `translate(${padding.top},${padding.left})`)
      .call(yAxis1);
    g
      .append("g")
      .attr("transform", `translate(${padding.top},${padding.left})`)
      .call(yAxis2);
    let xScale = d3.scaleOrdinal().domain([0, 1, 2, 3, 4, 5]).range(rectX);
    let xAxis = d3.axisBottom(xScale).ticks(5);
    g
      .append("g")
      .attr("transform", `translate(${padding.left},${height / 2})`)
      .call(xAxis);
    //定义矩形
    let g1 = d3
      .selectAll(".dif-chart" + i)
      .append("g")
      .attr("transform", `translate(${padding.top},${padding.left})`);

    let graph1 = g1.selectAll("rect").data(dataset1).enter().append("g");

    graph1
      .append("rect")
      .style("fill", "#43d4f4b5")
      .attr("x", function (d, i) {
        return rectX[i];
      })
      .attr("width", function (d, i) {
        return rectWidth[i] * 0.7;
      })
      .attr("y", function (d, i) {
        return yScale1(d);
      })
      .attr("height", function (d, i) {
        return height / 2 - padding.top - yScale1(d);
      });

    graph1
      .append("text")
      .style("fill", "pink")
      .attr("x", function (d, i) {
        return rectX[i] + rectWidth[i] / 2 - 2 * rectPadding;
      })
      .attr("dx", 10)
      .text(function (d) {
        return d;
      })
      .attr("y", function (d, i) {
        return yScale1(d) - 10;
      });

    let g2 = d3
      .selectAll(".dif-chart" + i)
      .append("g")
      .attr("transform", `translate(${padding.bottom},${padding.left})`);

    let graph2 = g2.selectAll("rect").data(dataset2).enter().append("g");

    graph2
      .append("rect")
      .style("fill", "#fbc6419e")
      .attr("x", function (d, i) {
        return rectX[i];
      })
      .attr("width", function (d, i) {
        return rectWidth[i] * 0.7;
      })
      .attr("y", function (d, i) {
        return height / 2 - padding.top;
      })
      .attr("height", function (d, i) {
        return yScale2(-d) - height / 2 + padding.top;
      });
    // .on('mouseover', (event, d) => {
    //     console.log(d3.select(this))
    // })
    // let yScale2 = d3.scaleLinear()
    // .domain([-d3.max([d3.max(dataset),d3.max(dataset2)]), 0])
    // .range([height - 2*padding.top, height / 2 - padding.top]);

    graph2
      .append("text")
      .style("fill", "pink")
      .attr("x", function (d, i) {
        return rectX[i] + rectWidth[i] / 2 - 2 * rectPadding;
      })
      .attr("dx", 10)
      .text(function (d) {
        return d;
      })
      .attr("y", function (d, i) {
        return yScale2(-d) + 10;
      });
  }

  return (
    <div
      id="difference-chart"
      style={{ width: svgWidth, height: svgHeight, overflow: "auto" }}
    ></div>
  );
}
