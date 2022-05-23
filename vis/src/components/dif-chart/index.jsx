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
    let radius = svgWidth / 2;

    let rawdata = {
      name: "root",
      children: [
        {
          name: "IP_1", children: [
            {
              name: "IP_2", children: [
                { name: "A", num: 4, children: [{ name: "B", num: 0, children: [{ name: "C", num: 6, value: 5 }] }] },//IP1自己的黑灰产数量num value都是5
                { name: "A", num: 0, children: [{ name: "B", num: 3, children: [{ name: "C", num: 1, value: 5 }] }] },//IP和IP2共有的黑灰产数量
                { name: "A", num: 2, children: [{ name: "B", num: 0, children: [{ name: "C", num: 2, value: 5 }] }] }]//IP2自己的黑灰产数量
            },
            {
              name: "IP_3", children: [
                { name: "AB", num: 0, children: [{ name: "BC", num: 1, children: [{ name: "CE", num: 0, value: 5 }] }] },
                { name: "AB", num: 1, children: [{ name: "BC", num: 3, children: [{ name: "CE", num: 2, value: 5 }] }] },
                { name: "AB", num: 4, children: [{ name: "BC", num: 3, children: [{ name: "CE", num: 1, value: 5 }] }] }]
            }]
        },
        {
          name: "IP_4", children: [{
            name: "IP_5", children: [
              { name: "AE", num: 4, children: [{ name: "B", num: 0, value: 5 }] },//IP1自己的黑灰产数量num value都是5
              { name: "AE", num: 0, children: [{ name: "B", num: 3, value: 5}] },//IP和IP2共有的黑灰产数量
              { name: "AE", num: 2, children: [{ name: "B", num: 0, value: 5}] }]//IP2自己的黑灰产数量
          }]
        },

      ]
    }
    function partition(data) {
      return (d3.partition().size([2 * Math.PI, radius * radius])(
        d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      )
      )
    }
    const root = partition(rawdata);
    // console.log(root);
    // console.log(root.descendants())
    let color = d3
      .scaleOrdinal()
      .domain(d3.range(6))
      .range(["#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb"])
    let svg = d3
      .select("#difference-chart")
      .append("svg")
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    // let element = svg.node();
    // element.value = { sequence: [], percentage: 0.0 };

    // let label = svg
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("fill", "#888")
    //   .style("visibility", "hidden");

    // label
    //   .append("tspan")
    //   .attr("class", "percentage")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("dy", "-0.1em")
    //   .attr("font-size", "3em")
    //   .text("");

    // label
    //   .append("tspan")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("dy", "1.5em")
    //   .text("of visits begin with this sequence");

    svg
      .attr("viewBox", `${-radius} ${-radius} ${svgWidth} ${svgWidth}`)
      .style("max-width", `${svgWidth}px`)
      .style("font", "12px sans-serif");
    let arc = d3
      .arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(1 / radius)
      .cornerRadius(60)
      // .padRadius(0.9)
      .innerRadius(d => {

        if (d.depth === 1) return 0
        return Math.sqrt(d.y0)
      })
      .outerRadius(d => {
        if (!d.depth) return 0
        return Math.sqrt(d.y1) - 1
      }
      )
    const path = svg
      .append("g")
      .selectAll("path")
      .data(root.descendants())
      .join("path")
      .attr("fill", d => {
        if (undefined == d.data.num) return "#9e70cf"
        return color(d.data.num)
      })
      .attr("d", arc);

    // svg
    //   .append("g")
    //   .attr("fill", "none")
    //   .attr("pointer-events", "all")
    //   .on("mouseleave", () => {
    //     path.attr("fill-opacity", 1);
    //     label.style("visibility", "hidden");
    //     // Update the value of this view
    //     element.value = { sequence: [], percentage: 0.0 };
    //     element.dispatchEvent(new CustomEvent("input"));
    //   })
    //   .selectAll("path")
    //   .data(
    //     root.descendants().filter(d => {
    //       // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
    //       return d.depth && d.x1 - d.x0 > 0.001;
    //     })
    //   )
    //   .join("path")
    //   .attr("d", mousearc)
    //   .on("mouseenter", (event, d) => {
    //     // Get the ancestors of the current segment, minus the root
    //     let sequence = d
    //       .ancestors()
    //       .reverse()
    //       .slice(1);
    //     // Highlight the ancestors
    //     path.attr("fill-opacity", node =>
    //       sequence.indexOf(node) >= 0 ? 1.0 : 0.3
    //     );
    //     const percentage = ((100 * d.value) / root.value).toPrecision(3);
    //     label
    //       .style("visibility", null)
    //       .select(".percentage")
    //       .text(percentage + "%");
    //     // Update the value of this view with the currently hovered sequence and percentage
    //     element.value = { sequence, percentage };
    //     element.dispatchEvent(new CustomEvent("input"));
    //   });
  }


  return (
    <div
      id="difference-chart"
      style={{ width: svgWidth, height: svgHeight }}
    ></div>
  );
}
