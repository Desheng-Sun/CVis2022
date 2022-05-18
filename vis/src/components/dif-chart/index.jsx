import * as d3 from "d3";
import { useEffect ,useState} from 'react'
import '../dif-chart/index.css'
export default function DifChart({w,h}) {
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
        for (let i = 0; i < 5; i++) { drawChart(i) }
    })
    function getRectPosition(rectWidth, rectPadding) {
        let rectX = []
        for (let i = 0; i <= rectWidth.length; i++) {
            let rectTempWidth = rectWidth.slice(0, i)
            rectX.push((d3.sum(rectTempWidth) + i * rectPadding)*0.7)
        }
        return rectX
    }

    // 绘制结构图
    function drawChart(i) {
        const height = 400;
        const width = svgWidth;
        let dataset = [10, 20, 35, 40, 52];
        let dataset2 = [80, 40, 35, 20, 10];
        let rectWidth = [50, 100, 120, 50, 120];//每个矩形的默认宽度
        let rectPadding = 10;//每个矩形间的间隔
        let rectX = getRectPosition(rectWidth, rectPadding)
        let padding = { top: 30, bottom: 30, left: 30, right: 40 };//定义间隔
        //定义画布
        let svg = d3.select('#difference-chart')
            .append("svg")
            .attr('class','dif-chart'+i)
            .attr("width", width)
            .attr("height", height)
        
        //定义矩形比例尺
        let yScale1 = d3.scaleLinear()
            .domain([0, d3.max([d3.max(dataset), d3.max(dataset2)])])
            .range([height / 2 - padding.top, 0]);
        let yAxis1 = d3.axisLeft(yScale1)
            .ticks(5);
        let yScale2 = d3.scaleLinear()
            .domain([-d3.max([d3.max(dataset), d3.max(dataset2)]), 0])
            .range([height - 2 * padding.top, height / 2 - padding.top]);
        let yAxis2 = d3.axisLeft(yScale2)
            .ticks(5);
        svg.append("g")
            .attr("transform", `translate(${padding.top},${padding.left})`)
            .call(yAxis1);
        svg.append("g")
            .attr("transform", `translate(${padding.top},${padding.left})`)
            .call(yAxis2);
        let xScale = d3.scaleOrdinal()
            .domain([0, 1, 2, 3, 4, 5])
            .range(rectX);
        let xAxis = d3.axisBottom(xScale)
            .ticks(5);
        svg.append("g")
            .attr("transform", `translate(${padding.left},${height / 2})`)
            .call(xAxis);

        //定义矩形
        let g1 = d3.selectAll('.dif-chart'+i)
            .append("g")
            .attr("transform", `translate(${padding.top},${padding.left})`);

        let graph1 = g1.selectAll("rect")
            .data(dataset)
            .enter()
            .append("g");

        graph1.append("rect")
            .style("fill", "#43d4f4b5")
            .attr("x", function (d, i) {
                return rectX[i];
            })
            .attr("width", function (d, i) {
                return rectWidth[i]*0.7
            })
            .attr("y", function (d, i) {
                // console.log(height / 2 - padding.top - yScale1(d))
                return yScale1(d)
            })
            .attr("height", function (d, i) {

                return (height / 2 - padding.top - yScale1(d));
            })

        graph1.append("text")
            .style("fill", "pink")
            .attr("x", function (d, i) {
                return rectX[i] + rectWidth[i] / 2 - 2 * rectPadding;
            })
            .attr("dx", 10)
            .text(function (d) {
                return d
            })
            .attr("y", function (d, i) {
                return yScale1(d) - 10;
            })

        let g2 = d3.selectAll('.dif-chart'+i)
            .append("g")
            .attr("transform", `translate(${padding.bottom},${padding.left})`);

        let graph2 = g2.selectAll("rect")
            .data(dataset2)
            .enter()
            .append("g");

        graph2.append("rect")
            .style("fill", "#fbc6419e")
            .attr("x", function (d, i) {
                return rectX[i];
            })
            .attr("width", function (d, i) {
                // console.log(rectWidth[i])
                return rectWidth[i]*0.7
            })
            .attr("y", function (d, i) {
                // console.log(yScale2(-d) - height / 2 + padding.top)
                return height / 2 - padding.top
            })
            .attr("height", function (d, i) {
                return yScale2(-d) - height / 2 + padding.top
            })
            // .on('mouseover', (event, d) => {
            //     console.log(d3.select(this))
            // })
        // let yScale2 = d3.scaleLinear()
        // .domain([-d3.max([d3.max(dataset),d3.max(dataset2)]), 0])
        // .range([height - 2*padding.top, height / 2 - padding.top]);

        graph2.append("text")
            .style("fill", "pink")
            .attr("x", function (d, i) {
                return rectX[i] + rectWidth[i] / 2 - 2 * rectPadding;
            })
            .attr("dx", 10)
            .text(function (d) {
                return d
            })
            .attr("y", function (d, i) {
                return yScale2(-d) + 10;
            })
    }


    return <div id="difference-chart" style={{ width: svgWidth, height: svgHeight, overflow:'auto'}}></div>
}