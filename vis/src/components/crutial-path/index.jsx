import * as echarts from "echarts";
import { useEffect, useState } from "react";
import { getCrutialpathData } from "../../apis/api";
import PubSub from "pubsub-js";

import './index.css'
export default function CrutialPath({ w, h }) {
  const [canvasHeight, setCanvasHeight] = useState("13.56vh");
  const [data, setData] = useState(undefined);
  /**
   * 在核心资产视图中 选择的起点核心资产与终点核心资产 作为参数请求数据，
   * 数据处理流程：
   *  1. 计算两个核心资产之间的最短路
   *  2. 取最短路的长度L，找出该对核心资产之间长度为L的所有路径，作为关键路径
   * 数据处理依据：
   *  两个核心资产之间的路径为关键路径；路径越短，重要程度越高
   */


  useEffect(() => {
    // getCrutialpathData().then((res) => {
    //   setData(res);
    // });

    // 对应Domain、IP、Cert、Whois、Whois、Whois、IPC、ASN
    let colors = [
      "#2978b4",
      "#33a02c",
      "#ff756a",
      "#f67f02",
      "#f67f02",
      "#f67f02",
      "#7fc97f",
      "#f9bf6f",
    ];

    let dt = [{
        start:"L1",
        end: 'L5',
      nodes:[
      { name: "L1", itemStyle: { color: colors[1] }, depth: 0 },
      { name: "L2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-1", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-3", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-4", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L4", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L5", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L3", itemStyle: { color: colors[1] }, depth: 3 },
    ], links: [
      { source: "L1", target: "L2", value: 2 },
      { source: "L4", target: "L3", value: 4 },
      { source: "L5", target: "L3", value: 3 },
      { source: "L2", target: "L4", value: 1 },
      { source: "L2", target: "L5", value: 1 },
      { source: "L1", target: "L2-1", value: 1 },
      { source: "L1", target: "L2-2", value: 2 },
      { source: "L2-1", target: "L4", value: 1 },
      { source: "L1", target: "L2-3", value: 1 },
      { source: "L2-3", target: "L4", value: 1 },
      { source: "L1", target: "L2-4", value: 1 },
      { source: "L2-4", target: "L5", value: 1 },
      { source: "L2-2", target: "L5", value: 1 },
      { source: "L2-2", target: "L4", value: 1 },
    ]}, {
      start:"L1",
      end: 'L4',nodes:[
      { name: "L1", itemStyle: { color: colors[1] }, depth: 0 },
      { name: "L2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-1", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-3", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-4", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L4", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L5", itemStyle: { color: colors[0] }, depth: 2 },
    ], links: [
      { source: "L1", target: "L2", value: 2 },
      { source: "L2", target: "L4", value: 1 },
      { source: "L2", target: "L5", value: 1 },
      { source: "L1", target: "L2-1", value: 1 },
      { source: "L1", target: "L2-2", value: 2 },
      { source: "L2-1", target: "L4", value: 1 },
      { source: "L1", target: "L2-3", value: 1 },
      { source: "L2-3", target: "L4", value: 1 },
      { source: "L1", target: "L2-4", value: 1 },
      { source: "L2-4", target: "L5", value: 1 },
      { source: "L2-2", target: "L5", value: 1 },
      { source: "L2-2", target: "L4", value: 1 },
    ]}, {
      start:"L1",
      end: 'L5',
      nodes:[
      { name: "L1", itemStyle: { color: colors[1] }, depth: 0 },
      { name: "L2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-1", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-2", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-3", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L2-4", itemStyle: { color: colors[0] }, depth: 1 },
      { name: "L4", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L5", itemStyle: { color: colors[0] }, depth: 2 },
      { name: "L3", itemStyle: { color: colors[1] }, depth: 3 },
    ], links: [
      { source: "L1", target: "L2", value: 2 },
      { source: "L4", target: "L3", value: 4 },
      { source: "L5", target: "L3", value: 3 },
      { source: "L2", target: "L4", value: 1 },
      { source: "L2", target: "L5", value: 1 },
      { source: "L1", target: "L2-1", value: 1 },
      { source: "L1", target: "L2-2", value: 2 },
      { source: "L2-1", target: "L4", value: 1 },
      { source: "L1", target: "L2-3", value: 1 },
      { source: "L2-3", target: "L4", value: 1 },
      { source: "L1", target: "L2-4", value: 1 },
      { source: "L2-4", target: "L5", value: 1 },
      { source: "L2-2", target: "L5", value: 1 },
      { source: "L2-2", target: "L4", value: 1 },
    ]}]

    setData(dt)
  }, []);


  PubSub.unsubscribe("assetsToPathDt");
  PubSub.subscribe("assetsToPathDt", (msg, res) => {
    console.log(res);
  });

  useEffect(() => {
    if(data != undefined){
      drawSankey();
    }
  }, [data]);

  function drawSankey() {
    let chartDom = document.getElementById("sankey-charts");
    // 判断dom是否已经被实例化, 如果已存在实例，则dispose()
    let existInstance = echarts.getInstanceByDom(chartDom);
    if (existInstance != undefined) {
      echarts.dispose(existInstance);
    }
    if(data == undefined) return 

    let sankey = echarts.init(chartDom);
    let option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        formatter: function(params){
          return params.data.name
        },
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderColor: 'transparent',
        // extraCssText:'height:10px;',   // 可以设置提示框的宽高
        padding:2,
        textStyle:{
          color: 'black',
          fontSize: '12px'
        }
      },
      title:[],
      series:[]
    }
    // 循环数据将每一组的数据都放进去
    for(let i in data){
      
      let title = {
        text: data[i].start + '-' + data[i].end,
        // left: 'center',
        left:'3%',
        top:  data.length === 1 ? '2%' : i*28 +'%',
        textAlign: 'center',
        textStyle:{
          color:'black',
          fontSize: '12px',
          fontWeight:'normal',
          fontFamily: 'sans-serif'
        },
        // backgroundColor: '#858585' 
      }

      let series = {
        type: "sankey",
        draggable: false,
        id: i.toString(),
        lineStyle: {
          opacity: 0.3,
          color: "gradient",
          curveness: 0.5,
        },
        height: data.length === 1 ? '71%' :'20%',
        left:"2%",
        right:"4%",
        top: data.length === 1 ? '15%' : i*28 + 8 +'%',
        nodeAlign: "left",
        nodeGap: 10,
        layoutIterations: 1,
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          color: 'source',  // 边的颜色与源节点的颜色相同
          curveness: 0.8
        },
        data: data[i].nodes,
        links: data[i].links,
      }
      option.title.push(title)
      option.series.push(series)
    }

    option && sankey.setOption(option, true);
    window.onresize = sankey.resize;

  }

  return (
    <div id="crutial-path" style={{ height: canvasHeight, width: "100%" }}>
      <div id="sankey-charts" style={{ height: `${13.56*(data == undefined || data.length === 1 ? 1: data.length/2)}` + "5vh", width: "100%" }}></div>
    </div>
  );
}
