import * as d3 from 'd3'
import { useEffect } from 'react'
import { forceManyBodyReuse } from 'd3-force-reuse'
import {Canvas} from '@antv/g'
import {Renderer as CanvasRenderer} from '@antv/g-canvas'
import {Plugin as PluginCSSSelect } from '@antv/g-plugin-css-select'

// 数据请求接口
import {qone} from "../../apis/api.js"


export default function SunChartGNext(){
    useEffect(() => {
        qone().then((res) => {
            drawChart(res);
        })
    })

    function drawChart(data){
       // 创建渲染器 
        const canvasRenderer = new CanvasRenderer();
        const cssSelectPlugin = new PluginCSSSelect();

        canvasRenderer.registerPlugin(cssSelectPlugin);

        // create a canvas
        const canvas = new Canvas({
            container: 'chart',
            width : 1200,
            height: 1200,
            renderer: canvasRenderer,
        });

        const links = data.links.map((d) => Object.create(d));
        const nodes = data.nodes.map((d) => Object.create(d));
        const height = 1200;
        const width = 1200;
        const radius = 4;
        var nodeHight = false
        var isDragging = false;
        
        // use GCanvas' document element instead of a real DOM
        const wrapper = d3.select(canvas.document.documentElement, );
        const svg = wrapper.append('g').style('transform', `translate(${width / 2}px, ${height / 2}px)`);
        const outer_g = svg.append('g').attr("transform", `translate(0, 0)`);

        const simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links)
                            .id((d) => d.id)
                            .distance(100)
            )
            .force("charge", forceManyBodyReuse().strength(-50).distanceMin(10))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const color_scale = d3.scaleOrdinal(d3.schemeCategory10);
        var r_scale = d3
            .scaleLinear()
            .domain(d3.extent(data.nodes, (d) => d.value))
            .range([5, 50]);
        const node = outer_g
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", (d) => r_scale(d.value))
            .attr("fill", (d) => color_scale(d.group))
            .call(drag(simulation));


        const link = outer_g
                        .append("g")
                        .selectAll("line")
                        .data(links)
                        .join("line")
                        .attr("stroke", "#999")
                        .attr("stroke-opacity", 0.25)
                        .attr("stroke-width", (d) => Math.sqrt(d.value));
                        
        simulation.on("tick", () => {
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });

        function drag(simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
                isDragging = true;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
                isDragging = false;
            }
            return d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        // 视图缩放
        //add zoom capabilities
        let zoomHandler = d3.zoom().on("zoom", zoomAction);

        //Zoom functions
        function zoomAction(event) {
            outer_g.attr("transform", `translate(${event.transform.x}, ${event.transform.y})` + "scale(" + event.transform.k +")"
            // outer_g.attr("transform", `translate(${width / 2 + event.transform.x}, ${height / 2 + event.transform.y})` + "scale(" + event.transform.k +")"
            );
        }
        zoomHandler(svg);
    }

    return <div id="chart"></div>

}