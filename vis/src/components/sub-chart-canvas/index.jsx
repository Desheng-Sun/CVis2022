import * as d3 from "d3";
import { event } from "d3";
import { useEffect } from "react";
import  { forceManyBodyReuse } from 'd3-force-reuse'
// import './index.css'

// 数据请求接口
import { qone } from "../..//apis/api.js";

export default function SubChart2() {
    useEffect(() => {
        qone().then((res) => {
            drawChart(res);
        });
    });

    function drawChart(data) {
        const height = 1000, width = 1200;
        const w2 = width / 2, h2 = height / 2, nodeRadius = 5;

        // 获取画笔
        const canvas = document.getElementById('myCanvas');
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d");
        const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]).style('position', 'relative')

        const simulation = forceSimulation(width, height);
        let transform = d3.zoomIdentity;

        // The simulation will alter the input data objects so make
        // copies to protect the originals.
        const nodes = data.nodes.map(d => Object.assign({}, d));
        const edges = data.links.map(d => Object.assign({}, d));

        d3.select(canvas)
            // .on("mouseover", (d)=> {
            //   console.log(d)
            // })
            .call(d3.drag()
                // Must set this in order to drag nodes. New in v5?
                .container(canvas)
                .subject(dragSubject)
                // .subject(() => {
                //     const d = getNodeFromMouseEvent(d3.event.sourceEvent);
                //     return d || { x: d3.event.x, y: d3.event.y };
                // })
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded))
            .call(d3.zoom()
                .scaleExtent([1 / 10, 8])
                .on('zoom', zoomed));

        simulation.nodes(nodes)
            .on("tick",simulationUpdate);
        simulation.force("link")
            .links(edges);

        function zoomed(event) {
            transform = event.transform;
            simulationUpdate();
        }
        
        /** Find the node that was clicked, if any, and return it. */
        function dragSubject(event) {
            const x = transform.invertX(event.x),
                y = transform.invertY(event.y);
            const node = findNode(nodes, x, y, nodeRadius);
            if (node) {
            node.x =  transform.applyX(node.x);
            node.y = transform.applyY(node.y);
            }
            // else: No node selected, drag container
            return node;
        }

        function dragStarted(event) {
            if (!event.active) {
            simulation.alphaTarget(0.3).restart();
            }
            event.subject.fx = transform.invertX(event.x);
            event.subject.fy = transform.invertY(event.y);
        }

        function dragged(event) {
            event.subject.fx = transform.invertX(event.x);
            event.subject.fy = transform.invertY(event.y);
        }

        function dragEnded(event) {
            if (!event.active) {
            simulation.alphaTarget(0);
            }
            event.subject.fx = null;
            event.subject.fy = null;
        }
        var r_scale = d3
            .scaleLinear()
            .domain(d3.extent(data.nodes, (d) => d.value))
            .range([5, 50]);
        function simulationUpdate() {
            ctx.save();
            ctx.clearRect(0, 0, width, height);
            ctx.translate(transform.x, transform.y);
            ctx.scale(transform.k, transform.k);
            // Draw edges
            edges.forEach(function(d) {
            ctx.beginPath();
            ctx.moveTo(d.source.x, d.source.y);
            ctx.lineTo(d.target.x, d.target.y);
            ctx.lineWidth = Math.sqrt(d.value);
            ctx.strokeStyle = '#999';
            ctx.stroke();
            });


            /**
             * First time
             * edges
             * a b c d
             * 
             * Update time
             * edges
             * a c d e
             * 
             * update: a c d
             * append e
             * delete b
             */



            // declare Circle, Line;

            // declare LinesGroup;

            // const lines = edges.map(({source: {x:x1, y:y1}, targte:{x:x2,y:y2}})=>{
            //     const line = new Line({
            //         style:{
            //             x1,y1,x2,y2
            //         }
            //     })

            //     LinesGroup.appendChild(line)


            //     return line
            // })


            // Draw nodes
            nodes.forEach(function(d, i) {
            ctx.beginPath();
            // Node fill
            ctx.moveTo(d.x + r_scale(d.value), d.y);
            ctx.arc(d.x, d.y,r_scale(d.value), 0, 2 * Math.PI);
            ctx.fillStyle = color(d);
            ctx.fill();
            // Node outline
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = '1.5'
            ctx.stroke();
            });
            ctx.restore();
        }

        function forceSimulation(width, height) {
            return d3.forceSimulation()
              .force("center", d3.forceCenter(width / 2, height / 2))
              .force("charge", forceManyBodyReuse().strength(-50).distanceMin(10))
              .force("link", d3.forceLink().id(d => d.id));
          }
        function findNode(nodes, x, y, nodeRadius) {
            const rSq = nodeRadius * nodeRadius;
            let i;
            for (i = nodes.length - 1; i >= 0; --i) {
              const node = nodes[i],
                    dx = x - node.x,
                    dy = y - node.y,
                    distSq = (dx * dx) + (dy * dy);
              if (distSq <= rSq) {    // 点击的位置与点的位置
                  console.log(x, node.x, y, node.y);
                return node;
              }
            }
            // No node selected
            return undefined; 
          }
        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        function color(d){
            return scale(d.group);
        }
        // 鼠标点击时效果
        canvas.addEventListener('click', (e) => {
            console.log(e);
        })


        // brush事件
        const brush = d3.brush().on("start brush end", brushed);
            svg
            .append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.move, [[100, 100], [400, 300]]);
        function brushed({selection}) {
  }
    }
    return (<div id="chart">
         <canvas id="myCanvas" style={{border: '2px solid #000'}}></canvas>
    </div>
    )
}
