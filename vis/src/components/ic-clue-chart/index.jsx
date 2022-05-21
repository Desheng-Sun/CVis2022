import { useState } from "react";
import { useEffect } from "react";
import Icicle from "./icicle.js";
import PubSub from 'pubsub-js';
import { Button } from 'antd';
import * as d3 from 'd3';
import "./index.css";

// 数据请求
import { getIcClueData } from "../../apis/api.js";


var icicleChart;
let prevSelected = []
export default function ICClueChart({ w, h}) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState({});
  const [dataParam, setDataParam] = useState("");
  const [selectedIclcleNode, setSelectedIclcleNode] = useState([])
  // const [icicleChart, setIcicleChart] = useState([])
  


  // 监听选择的节点的变化，如果变化了就传递给另一个组件
  useEffect(() => {
    PubSub.publish('icicleSelect',selectedIclcleNode)
  }, [selectedIclcleNode])
  // 随系统缩放修改画布大小
  useEffect(() => {
    console.log(svgWidth);
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  // 请求数据
  useEffect(() => {
    getIcClueData().then((res) => {
      setData(res);
    });
  }, [dataParam]);

  useEffect(() => {
    drawICClueChart();
  }, [data]);

  function drawICClueChart() {
    if (JSON.stringify(data) === "{}") return;
    if (JSON.stringify(svgWidth) === "{}" || JSON.stringify(svgHeight) === "{}") return;
    console.log(svgWidth, svgHeight);
    var titleSvg = d3.select('#icclue-title').append('svg').attr('class', 'icicleTitleSvg')
    var titleG = titleSvg
      .style('width', svgWidth + 'px')
      .style('height', 20 + 'px')
      .append('g')
      .attr('class', 'icicleTitleG')
      .attr('transform', 'translate(0, 15)')
    titleG.selectAll('text')
      .data(['起点', '第一跳', '第二跳'])
      .join('text')
      .text(d => d)
      .attr('x', (d, i) => i === 0 ? `${(svgWidth - 20)/6*(i*5 + 1.3)}` : `${(svgWidth - 20)/6*(i*2+1)}`)
      .style('font-size', '12px')
      .style('font-weight', 'bolder')
      .style('color', 'black')
      .style('line-height', 1)
      .attr("text-align","center")


    icicleChart = Icicle()
      .orientation("lr")
      .width(svgWidth)
      .height(svgHeight*0.95)
      .data(data)
      .size("pureDomain")
      .tooltipContent((d, node) => {
        return `WhoisPhone: <i>${node.data.WhoisPhone}</i><br>
                  WhoisEmail: <i>${node.data.WhoisEmail}</i><br>
                  WhoisName: <i>${node.data.WhoisName}</i><br>
                  pureDomain: <i>${node.data.pureDomain}</i><br>
                  dirtyDomain: <i>${node.data.dirtyDomain}</i>
                `;
      })(document.getElementById("icclue-graph"));
  }


  function btnGetSelectedIcicleNode(){
    let curSelected = icicleChart.getSelectedIcicleNode()  // 获取被选中的节点
    if(prevSelected.sort().toString() != curSelected.sort().toString()){ // 有变化的节点
      prevSelected = [...curSelected];
      setSelectedIclcleNode([...prevSelected])
    }
  }

  return (
  <div id="icclue-chart" style={{ width: "100%", height: "100%" }}>
    <div id="icclue-control" >
      <div id="icclue-title"></div>
      <div id="control">
        <Button type="primary" size='small' onClick={btnGetSelectedIcicleNode}>提交</Button>
      </div>
    </div>
    <div id="icclue-graph" ></div>
  </div>
  )
}
