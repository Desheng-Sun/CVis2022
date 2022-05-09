import * as d3 from "d3";
import { useEffect } from "react";
import  { forceManyBodyReuse } from 'd3-force-reuse'
import  { forceManyBodySampled } from 'd3-force-sampled'


// 数据请求接口
import { qone } from "../..//apis/api.js";

export default function SubChart2() {
    useEffect(() => {
        qone().then((res) => {
            // var data = {}
            // data['nodes'] = res['nodes'].map(value => {
            //     return {"id": value[0], "name": value[1], "type": value[3], "industry": eval(value[4])}
            // })

            // data['links'] = res['links'].map(value => {
            //     return {"source": parseInt(value[1]), "target": parseInt(value[2])}
            // })
            var data = res
            drawChart(data);
        });
    });

    function drawChart(data) {
        const links = data.links.map((d) => Object.create(d));
        const nodes = data.nodes.map((d) => Object.create(d));
        const width = 1000;
        const height = 1000;
        var isDragging = false;
        
        const svg = d3
            .select("#chart")
            .append("svg")
            .attr("viewBox", [0, 0, width, height]);
        const outer_g = svg.append('g').attr("transform", `translate(0, 0)`);

        const xScale = d3.scaleOrdinal()
                        .domain(['IP', 'Whois_Name', 'Domain', 'Cert'])
                        .range([10, 110, 200, 300])
        const simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links)
                            .id((d) => d.id)
                            .distance(100)
            )
            // .velocityDecay(0.2)
            // .force("charge", forceManyBodySampled().strength(-50).distanceMin(10))
            // .force("charge", d3.forceManyBody().strength(-50).distanceMin(10))
            .force("charge", forceManyBodyReuse().strength(-50).distanceMin(10))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('x', d3.forceX().x(function(d) {
                return xScale(d.type);
              }))
            .force('y', d3.forceY().y(function(d) {
                return 0;
              }))
            //   .force('collision', d3.forceCollide().radius(function(d) {   // 避免元素相互重叠
            //     return d.radius;
            //   }))

              
        let Tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("font-size","12px")
            .style("pointer-events","none");

        const link = outer_g
            .append("g")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.75)
            .attr("stroke-width", 2)
            // .attr("stroke-width", (d) => Math.sqrt(d.value));

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
            // .attr("r", (d) => d.industry.length + 5)
            // .attr("fill", (d) => color_scale(d.type))
            .on('click', d => alert(d))
            .attr("r", (d) => r_scale(d.value))
            .attr("fill", (d) => color_scale(d.group))
            .call(drag(simulation));

        node.on("mouseover", (event, d) => {
                link.style("stroke-opacity", function (l) {
                    if (d === l.source || d == l.target) return 1;
                    else return 0.05;
                });

                Tooltip.transition()
                    .duration(300)
                    .style('opacity', () => (!isDragging)? 0.97: 0)
                Tooltip.html(() => {
                    let tooltip_content = '';
                    tooltip_content = d
                    return tooltip_content
                })
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 200) + "px");
            })
            .on("mouseout", (d) => {
                link.style("stroke-opacity", 0.25);
                Tooltip.transition()
                    .duration(300)
                    .style("opacity", 0);
            });

        var texts = outer_g
            .selectAll(".texts")
            .data(nodes)
            .enter()
            //.filter( d => (d.value >= d3.max(data.nodes, d => d.value)*(1-0.5)) )
            .filter((d) => d.value >= 20)
            .append("text")
            .attr("font-family", "sans-serif")
            .attr("dx", 12)
            .attr("dy", "0.35em")
            //.attr("font-size", "34")
            .attr("font-size", (d) => r_scale(d.value))
            .text((d) => d.name);

        node.append("title").text((d) => d.name);

        /*const text = svg.append("g").attr("class", "labels").selectAll("g")
        .data(nodes)
      .enter().append("g");
      
      text.append("text")
        .attr("x", 14)
        .attr("y", ".31em")
        .attr("opacity", 0.2)
        .attr("pointer-events", "none")
        .style("font-family", "sans-serif")
        .style("font-size", "0.7em")
        .text(function(d) { return d.name; })*/

        simulation.on("tick", () => {
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
            texts.attr("x", (d) => d.x).attr("y", (d) => d.y);
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

        return svg.node();
    }

    return <div id="chart"></div>;
}
