import * as d3 from 'd3'
import { partition } from 'd3';
import { useState } from 'react';
import { useEffect } from 'react';
import Icicle from './icicle.js';
import './index.css';

// 数据请求
import { icclue } from '../../apis/api.js';


export default function ICClueChart(){
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [data, setData] = useState({});
    const [dataParam, setDataParam] = useState("");

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
      if(JSON.stringify(data) === '{}') return 
      console.log(data);
        Icicle()
        .orientation('lr')
        .width(width)
        .height(height)
        .data(data)
        .size('pureDomain')
        // .size(d => {
        //   console.log(d);
        //   return 'pureDomain'
        //   // return d.WhoisName + d.WhoisPhone + d.WhoisEmail + d.pureDomain+ dirtyDomain
        // })
        .tooltipContent((d, node) => {
          console.log(d, node);
          return `Node: <i>${node.data.pureDomain}</i>`
        })
        (document.getElementById('icclue-chart'))
  
  }


    return <div id="icclue-chart"></div>
}