import * as d3 from 'd3'
import { partition } from 'd3';
import { useState } from 'react';
import { useEffect } from 'react';
import Icicle from './icicle.js';
import './index.css';


// 数据请求
import { icclue } from '../../apis/api.js';


export default function ICClueChart(w, h){
    const [svgWidth, setSvgWidth] = useState(300);
    const [svgHeight, setSvgHeight] = useState(350);
    const [data, setData] = useState({});
    const [dataParam, setDataParam] = useState("");

    // 随系统缩放修改画布大小
    // useEffect(() => {
    //   console.log(svgWidth);
    //   setSvgWidth(w);
    // }, [w]);
    // useEffect(() => {
    //   setSvgHeight(h);
    // }, [h]);

    // 请求数据
    useEffect(() => {
      icclue().then((res) => {
        setData(res);
      });
    }, [dataParam]);

    useEffect(() => {
        drawICClueChart()
    }, [data])
    
    function drawICClueChart(){
      console.log(svgWidth);
      // if(JSON.stringify(data) === '{}' || JSON.stringify(svgWidth) === '{}' || JSON.stringify(svgHeight) === '{}') return 
      if(JSON.stringify(data) === '{}' ) return 
      if(JSON.stringify(svgWidth) === '{}' || JSON.stringify(svgHeight) === '{}') return 
      
      
        Icicle()
        .orientation('lr')
        .width(svgWidth)
        .height(svgHeight)
        .data(data)
        .size('pureDomain')
        .tooltipContent((d, node) => {
          return `WhoisPhone: <i>${node.data.WhoisPhone}</i><br>
                  WhoisEmail: <i>${node.data.WhoisEmail}</i><br>
                  WhoisName: <i>${node.data.WhoisName}</i><br>
                  pureDomain: <i>${node.data.pureDomain}</i><br>
                  dirtyDomain: <i>${node.data.dirtyDomain}</i>
                `
        })
        (document.getElementById('icclue-chart'))
  }
  return <div id="icclue-chart" style={{ width: "100%", height: "96%" }}></div>
}