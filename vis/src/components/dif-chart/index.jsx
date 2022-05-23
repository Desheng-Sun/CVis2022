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
    d3.selectAll("div#difference-chart svg").remove();
    draw();
  });


  // 绘制结构图
  function draw() {
    let data = [
      {
        group: "IP1",
        relatednum: 2,
        relateddata:
          [{
            name: "IP3",
            samevalue:
              [{ name: "A", value: 1 },
              { name: "AB", value: 0 },
              { name: "ABE", value: 0 },
              { name: "B", value: 0 }],
            fathervalue:
              [{ name: "A", value: 1 },
              { name: "AB", value: 2 },
              { name: "ABE", value: 0 },
              { name: "B", value: 0 }],
            sonvalue:
              [{ name: "A", value: 1 },
              { name: "AB", value: 2 },
              { name: "ABE", value: 1 },
              { name: "B", value: 2 }],

          },
          {
            name: "IP4",
            samevalue:
              [{ name: "B", value: 3 },
              { name: "ABE", value: 0 },
              { name: "AB", value: 0 },
              { name: "BC", value: 0 },],
            fathervalue:
              [{ name: "ABE", value: 5 },
              { name: "AB", value: 2 },
              { name: "BC", value: 0 },
              { name: "B", value: 0 }],
            sonvalue:
              [{ name: "BC", value: 1 },
              { name: "B", value: 2 }, 
              { name: "ABE", value:0 },
              { name: "AB", value: 0 }],
          }]
      },
      { group: "IP2", relatednum: 3 },
      { group: "Cert1", relatednum: 2 },
      { group: "IP3", relatednum: 7 },
      { group: "Cert2", relatednum: 3 },
      { group: "IP4", relatednum: 5 }]

    let svg = d3
      .select("#difference-chart")
      .append("svg")
      .attr("viewBox", [-svgWidth / 2, -svgHeight / 2, svgWidth, svgHeight]);

    let color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.group))
      .range(
        d3
          .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );


    let IPsumdata = data.forEach(d => d.relatednum);
    console.log(IPsumdata)
    //绘制内部扇形
    let pie = d3
      .pie()
      .padAngle(0)
      .sort(null)
      .value(d => d.relatednum);
    let arcs = pie(data);
    let arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(svgWidth, svgHeight) / 6 - 1);
    svg
      .append("g")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.group))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.group}: ${d.data.relatednum.toLocaleString()}`);
    let radius = (Math.min(svgWidth, svgHeight) / 6) * 0.7;
    let arcLabel = d3
      .arc()
      .innerRadius(radius)
      .outerRadius(radius);
    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.group)
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.relatednum.toLocaleString())
      );


    //绘制产业信息
    let industryarc = d3
      .arc()
      .startAngle(0)
      .endAngle(Math.PI / 2)
      .innerRadius(Math.min(svgWidth, svgHeight) / 6 + 3)
      .outerRadius(Math.min(svgWidth, svgHeight) / 3 - 1);
    svg
      .append("g")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.group))
      .attr("d", industryarc)
      .append("title");
    // .text(d => `${d.data.group}: ${d.data.relatednum.toLocaleString()}`);
  }


  return (
    <div
      id="difference-chart"
      style={{ width: svgWidth, height: svgHeight }}
    ></div>
  );
}
