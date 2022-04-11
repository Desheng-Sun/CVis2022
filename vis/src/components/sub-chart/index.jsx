// import QuesionOneView from './View1'

import * as d3 from "d3";
import { event } from "d3";
import { useEffect } from "react";

// 数据请求接口
import { qone } from "../..//apis/api.js";

export default function SubChart() {
  useEffect(() => {
    qone().then((res) => {
      drawChart(res);
    });
  });

  function drawChart(data) {
    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));
    const height = 2100;
    const width = 2100;
    const radius = 4;
    var nodeHight = false
    var tooltip = d3
      .select("#chart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id))
      .force("charge", d3.forceManyBody().strength(-5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      // .force("x", d3.forceX())
      // .force("y", d3.forceY())

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f3f3f3")
      .attr("viewBox", [0, 0, width, height]);

    const link = svg
      .append("g")
      .attr("stroke", "#aaa")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const color_scale = d3.scaleOrdinal(d3.schemeTableau10);
    const node = svg
      .append("g")
      .attr("stroke", "#000")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", radius)
      .attr("fill", (d) =>{
          return color_scale(d.type);
        })
        .call(drag(simulation))
        .on("mouseover.fade", fade(0.1))
        .on("mouseout.fade", fade(1))
      .on("click", selectNode)

    const textElems = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", 10)
      .attr("font-size", 10)
      .call(drag(simulation))
      // .on("mouseover.fade", fade(0.1))
      // .on("mouseout.fade", fade(1));

    simulation.on("tick", () => {
      // if(force.alpha()<=0.05){  // 足够稳定时，才渲染一次
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node
        .attr("cx", function (d) {
          return (d.x = Math.max(
            radius + 1,
            Math.min(width - (radius + 1), d.x)
          ));
        })
        .attr("cy", function (d) {
          return (d.y = Math.max(
            radius + 1,
            Math.min(height - (radius + 1), d.y)
          ));
        });
      textElems
        .attr("x", (d) => d.x + 10)
        .attr("y", (d) => d.y)
        .attr("visibility", "hidden");
      // force.stop(); // 渲染完成后立即停止刷新
      // }
    });
    
    // simulation.alphaMin(0.8)
    // simulation.alphaDecay(0.5)

    function fade(opacity) {
      return (d, i) => {
        if(!nodeHight){
        node.style("opacity", function (o) {
          return isConnected(i, o) ? 1 : opacity
        });
        textElems.style("visibility", function (o) {
          return isConnected(i, o) ? "visible" : "hidden"
        });
        link.style("stroke-opacity", (o) =>
          o.source === i || o.target === i ? 1 : opacity
        );
        if (opacity === 1) {
          node.style("opacity", 1);
          textElems.style("visibility", "hidden");
          link.style("stroke-opacity", 0.3);
        }
        }
      };
    }

    const linkedByIndex = {};
    links.forEach((d) => {
      linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
    });

    function isConnected(a, b) {
      return (
        linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index
      );
    }

    function drag(simulation){
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
    // 节点的点击事件
    function selectNode(d, i){
      // d3.select(this).attr("fill", "red")
      textElems.style("visibility", function (o) {
        return "hidden"
      });
      nodeHight = !nodeHight
      let opacity = 1
        node.style("opacity", function(o){
          return !nodeHight ? 1: (isConnected(i, o) ? 1 : 0.3)
        })
        link.style("stroke-opacity", (o) =>
          !nodeHight ? 0.3 : (o.source === i || o.target === i ? 1 : 0.3)
        );
    }
  // 视图的缩放
  //   var zoom = container => {
  //   // Zooming function translates the size of the svg container.
  //   function zoomed() {
  //       container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
  //   }
  //   return d3.zoom().scaleExtent([0.5,3]).on('zoom', zoomed)
  // }
    var zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', function(event) {
            svg.selectAll('g')
             .attr("transform", "translate(" + event.transform.x + ", " + event.transform.y + ") scale(" + event.transform.k + ")");
  });
  // svg.call(zoom);
  

    return svg.node();
  }
  return <div id="chart"></div>;
}
