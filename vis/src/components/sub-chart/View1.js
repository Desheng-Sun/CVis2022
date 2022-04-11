import * as d3 from 'd3';
import {useEffect} from 'react';

// 数据请求接口
import {qone} from './apis/api.js';


// 绘制图像
function drawChart() {
    const links = data.links.map(d => Object.create(d))
    const nodes = data.nodes.map(d => Object.create(d))
    const height = 700;
    const width = 700;
    const radius = 4;

    
    var tooltip = d3.select("#chart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-15))
      .force("center", d3.forceCenter(width/2, height/2));
    
    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
    
    const link = svg.append("g")
        .attr("stroke", "#aaa") 
        .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);
        // .attr("stroke-width", d => Math.sqrt(d.value) / 2);
    
    const node = svg.append("g")
        .attr("stroke", "#000")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", radius)
        .attr("fill", color)
        .call(drag(simulation))
        .on('mouseover.fade', fade(0.1))
        .on('mouseout.fade', fade(1));
    
    const textElems = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
        .text(d => d.name)
        .attr('font-size',10)
        .attr('font-size',10)
        .call(drag(simulation))
      .on('mouseover.fade', fade(0.1))
        .on('mouseout.fade', fade(1));
    
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node
        .attr("cx", function(d) { return d.x = Math.max((radius+1), Math.min(width - (radius+1), d.x)); })
        .attr("cy", function(d) { return d.y = Math.max((radius+1), Math.min(height - (radius+1), d.y)); });
      textElems
        .attr("x", d => d.x + 10)
        .attr("y", d => d.y)
        .attr("visibility", "hidden");
    });
    
    function color(){
        const scale = d3.scaleOrdinal(d3.schemeSet2);
        return d => scale(d.type)
      }
    
     var drag = simulation => {
  
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        
        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }
        
        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
      }


    function fade(opacity) {
      return d => {
        node.style('opacity', function (o) { return isConnected(d, o) ? 1 : opacity });
        textElems.style('visibility', function (o) { return isConnected(d, o) ? "visible" : "hidden" });
        link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));
        if(opacity === 1){
          node.style('opacity', 1)
          textElems.style('visibility', 'hidden')
          link.style('stroke-opacity', 0.3)
        }
      };
    }
    
    const linkedByIndex = {};
    links.forEach(d => {
      linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
    });
  
    function isConnected(a, b) {
      return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
    }
    
    invalidation.then(() => simulation.stop());
    
    return svg.node()
  }


export default function QuesionOneView(){
    useEffect(()=>{
        qone().then((res)=>drawChart);
    })
    return (
        <div id="chart"></div>
    )
}