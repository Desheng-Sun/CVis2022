import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function IndustryStackChart({ w, h }) {
  const [data, setData] = useState([]);
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);

  useEffect(() => {
    let dt = [
      {
        id: "A",
        industry: [
          { industry: "AB", number: 2 },
          { industry: "AED", number: 8 },
          { industry: "BCD", number: 1 },
        ],
        group: 1,
      },
      {
        id: "B",
        industry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "DE", number: 1 },
        ],
        group: 1,
      },
      {
        id: "C",
        industry: [
          { industry: "B", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "BCD", number: 1 },
        ],
        group: 1,
      },
      {
        id: "D",
        industry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "H", number: 1 },
        ],
        group: 1,
      },
      {
        id: "E",
        industry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "BCE", number: 1 },
        ],
        group: 1,
      },
    ];
    setData(dt);
  }, []);

  useEffect(() => {
    setSvgWidth(w)
  }, [w])

  useEffect(() =>{
    setSvgHeight(h)
  }, [h])

  useEffect(() => {
    drawChart();
  }, [svgWidth, svgHeight, data]);

  function drawChart() {
    if (data.length === 0) return;

    d3.select("#industry-stack svg").remove();
    var combinationOrderSet = new Set();
    var innerCirlceColor = ["#ffd006", "#67bbd7"]; // 内部的圆的颜色映射节点类型
    // 映射产业类型
    const industryColor = {
      0: "#c3e6a1",
      1: "#e4657f",
      2: "#a17fda",
      3: "#ff9f6d",
      4: "#4caead",
      5: "#64d9d7",
      6: "#82b461",
      7: "#fffb96",
      8: "#87ccff",
    };
    // 获取所有的资产组合和种类
    for (let d of data) {
      for (let j in d.industry) {
        combinationOrderSet.add(d.industry[j]["industry"]);
      }
    }
    let combinationOrder = [...combinationOrderSet].sort();
    let industryType = [
      ...new Set([...combinationOrder.toString().replaceAll(",", "")]),
    ].sort(); // 包含的所有产业类型
    let gWidth = svgWidth / 3, gHeight = 50, circleR = 3, levelNumber = 3
    const arc = d3
      .arc()
      .innerRadius((i, j) => circleR + (gHeight/industryType.length) * j)
      .outerRadius((i, j) => circleR + (gHeight/industryType.length) * (j + 1))
      .startAngle((i) => ((2 * Math.PI) / combinationOrder.length) * i - 2)
      .endAngle((i) => ((2 * Math.PI) / combinationOrder.length) * (i + 1) - 2)
      .cornerRadius(60)
      .padAngle(0.4);

    let wrapper = d3
      .select("#industry-stack")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", (gHeight + circleR + 10)*2 *(data.length/levelNumber + 1))
      .append("g")
      .attr("transform", (d, i) => {
        let x = gWidth/3;
        let y = gHeight + circleR + 20;
        return "translate(" + x.toString() + "," + y.toString() + ")";
      });

    let g = wrapper
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("class", "stackInnerG")
      .attr("stroke", "#aaa")
      .attr("transform", (d, i) => {
        let x = gWidth * (i % levelNumber);
        let y = (gHeight+ circleR + 10)*2* Math.floor(i / levelNumber);
        return "translate(" + x.toString() + "," + y.toString() + ")";
      });

    g.append("text")
      .attr("transform", (d) => "translate(10,10))")
      .selectAll("tspan")
      .data(d => d.industry)
      .join("tspan")
        .attr("x", (gHeight + circleR) + 10)
        .attr("y", (d, i) => `${i * 1.5 - 2}em`)
        .attr("font-weight", "bold")
        .attr("stroke", "none")
        .attr("font", "14px segoe ui")
        .attr('fill', (d, i) => industryColor[i])
        .text(d => {
          return '#'+ d.industry + ': ' + d.number
        });

    g.append("circle")
      .attr("r", circleR)
      .attr("fill", "white")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", (d, index) => innerCirlceColor[index % 3]);

    for (let k = 0; k < data.length; k++) {
      for (let i = 0; i < combinationOrder.length; i++) {
        let currInduYIndex = [],
          first_flag = true;
        for (let j = 0; j < industryType.length; j++) {
          d3.select(d3.selectAll(".stackInnerG")._groups[0][k])
            .append("path")
            .attr("d", arc(i, j))
            .attr("stroke", "#aaa")
            .attr("fill", (d) => {
              if (first_flag) {
                for (let indus in d.industry) {
                  if (
                    combinationOrder.indexOf(d.industry[indus]["industry"]) == i
                  ) {
                    // 当前产业与当前弧对应的产业一致
                    let currIndu = d.industry[indus]["industry"]; // 当前产业集合，然后获取当前产业集合包含的子产业对应的径向索引
                    currInduYIndex = currIndu
                      .split("")
                      .map((value) => industryType.indexOf(value));
                    break;
                  }
                }
              }
              first_flag = false;
              if (
                currInduYIndex.length != 0 &&
                currInduYIndex.indexOf(j) != -1
              ) {
                return industryColor[j];
              }
              return "white";
            });
        }
      }
    }
  }

  return (
    <div
      id="industry-stack"
      style={{ width: svgWidth, height: svgHeight, overflow: "auto" }}
    ></div>
  );
}
