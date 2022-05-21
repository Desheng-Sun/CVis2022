import React, { useEffect, useState } from "react";
import * as d3 from "d3";



export default function IndustryStackChart() {
  useEffect(()=>{
    drawChart();
  })

  function drawChart() {
    let combinationOrder = ["AB", "AE", "BCD"];
    let industryType = ["A", "B", "C", "D", "E"];
    var innerCirlceColor = ["#ffd006", "#67bbd7"];   // 内部的圆的颜色映射节点类型
    let dt = [{
        id: "Myriel",
        industry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "BCD", number: 1 },
        ],
        group: 1,
    }]
    let g = d3
      .select("#industry-stack")
      .append("svg")
      .attr("width", 200)
      .attr("height", 200)
      .append('g')
      .attr('transform', 'translate(50, 50)')
      .data(dt)


    g.append("circle")
      .attr("r", 2)
      .attr("fill", "white")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", (d, index) => innerCirlceColor[index % 2])
      
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
    const arc = d3
      .arc()
      .innerRadius((i, j) => 2 + 10* j)
      .outerRadius((i, j) => 2 + 10 * (j + 1))
      .startAngle((i) => ((2 * Math.PI) / combinationOrder.length) * i - 2)
      .endAngle((i) => ((2 * Math.PI) / combinationOrder.length) * (i + 1) - 2)
      .cornerRadius(60)
      .padAngle(0.5);

    // 环向循环次数为所有产业组合的总类数，径向循环次数为所有组合涉及的黑灰产的种类数
    for (let i = 0; i < combinationOrder.length; i++) {
      let currInduYIndex = [],
        first_flag = true;
      for (let j = 0; j < industryType.length; j++) {
        g.append("path")
          .attr("d", arc(i, j))
          .attr("stroke", "none")
          .attr("fill", (d) => {
            if (first_flag) {
              for (let indus in d.industry) {
                if (combinationOrder.indexOf(d.industry[indus]["industry"]) == i) { // 当前产业与当前弧对应的产业一致
                  let currIndu = d.industry[indus]["industry"];                     // 当前产业集合，然后获取当前产业集合包含的子产业对应的径向索引
                  currInduYIndex = currIndu.split("").map((value) => industryType.indexOf(value));
                  break;
                }
              }
            }
            first_flag = false;
            if (currInduYIndex.length != 0 && currInduYIndex.indexOf(j) != -1) {
                console.log(d, industryColor[j]);
              return industryColor[j];
            }
            return "white";
          });
      }
    }
  }

  return <div id="industry-stack"></div>;
}
