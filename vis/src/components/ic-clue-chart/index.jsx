import * as d3 from "d3";
import { partition } from "d3";
import { useState } from "react";
import { useEffect } from "react";
import Icicle from "./icicle.js";
import PubSub from 'pubsub-js'
import "./index.css";

// 数据请求
import { icclue } from "../../apis/api.js";

export default function ICClueChart({ w, h}) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState({});
  const [dataParam, setDataParam] = useState("");
  const [selectedIclcleNode, setSelectedIclcleNode] = useState([])


  useEffect(() => {
    // console.log(selectedIclcleNode);
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
    icclue().then((res) => {
      setData(res);
    });
  }, [dataParam]);

  useEffect(() => {
    drawICClueChart();
  }, [data]);

  function drawICClueChart() {
    if (JSON.stringify(data) === "{}") return;
    if (JSON.stringify(svgWidth) === "{}" || JSON.stringify(svgHeight) === "{}") return;

    var icicleChart = Icicle()
      .orientation("lr")
      .width(svgWidth)
      .height(svgHeight)
      .data(data)
      .size("pureDomain")
      .tooltipContent((d, node) => {
        return `WhoisPhone: <i>${node.data.WhoisPhone}</i><br>
                  WhoisEmail: <i>${node.data.WhoisEmail}</i><br>
                  WhoisName: <i>${node.data.WhoisName}</i><br>
                  pureDomain: <i>${node.data.pureDomain}</i><br>
                  dirtyDomain: <i>${node.data.dirtyDomain}</i>
                `;
      })(document.getElementById("icclue-chart"));

    let prevSelected = []  // 这里获取数据的更新有问题
    setInterval(function(){ 
      let curSelected = icicleChart.getSelectedIcicleNode()  // 获取被选中的节点
      if(prevSelected.sort().toString() != curSelected.sort().toString()){ // 有变化的节点
        prevSelected = curSelected;
        setSelectedIclcleNode(prevSelected)
      }
    }, 1000);
  }
  return <div id="icclue-chart" style={{ width: "100%", height: "96%" }}></div>;
}
