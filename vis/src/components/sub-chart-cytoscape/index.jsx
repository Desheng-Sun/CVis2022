import { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import euler from 'cytoscape-euler'
import navigator from 'cytoscape-navigator'
import "cytoscape-navigator/cytoscape.js-navigator.css";
import { Checkbox, Select } from "antd";

import * as d3 from 'd3';


import './index.css'

// 数据请求接口
import { getMainChartData } from "../..//apis/api.js";
import { style } from "d3";

navigator(cytoscape);
cytoscape.use(euler)

var cy, layoutOption;
export default function SubChartCytoscape({w, h}) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [dataParam, setDataParam] = useState("");


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
    getMainChartData().then((res) => {
      setData(res);
    });
  }, [dataParam]);

  useEffect(() => {
    drawChart();
    // console.log(h);
  }, [data]);


  function drawChart() {
    if (data.nodes.length === 0 && data.edges.length === 0) return 

    const links = data.edges.map((d) => ({'data': {...d}}));
    const nodes = data.nodes.map((d) => ({'data': {...d}}));

    Promise.all([
      fetch('./json/cy-style.json').then(function(res){  // 获取样式文件
        return res.json()
      })
    ]).then(function(fetchData){
      let styles = fetchData[0]
      let newStyleArr = {
        selector: 'node',
        style: {
          width: function(ele){ return ele.degree(); },  // 根据节点的度数设置
          height: function(ele){ return ele.degree(); }
        }
      }
      styles.push(newStyleArr)
      cy = cytoscape({
        container: document.getElementById('main-chart'),
        elements: {
          nodes: nodes,
          edges: links
        },
        style: styles
      }) 

      layoutOption = {
        name: 'euler',
        fit: true, // whether to fit to viewport
        animate: true, // whether to transition the node positions
        avoidOverlap: true,
        springLength: (edge) => 120,
        mass: (node) => 10,
        animateFilter: function ( node, i ){ return true; },   // 决定是否节点的位置应该被渲染
        concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
          return node.degree();
        },
      }
      
      var defaults = {
        container: false, // html dom element
        viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
        thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
        thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
        dblClickDelay: 200, // milliseconds
        removeCustomContainer: false, // destroy the container specified by user on plugin destroy
        rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
      };
      
      var nav = cy.navigator(defaults);
  
      cy.layout(layoutOption).run()
      cy.boxSelectionEnabled(true);  // 设置支持框选操作，如果同时启用平移，用户必须按住shift、control、alt或command中的一个来启动框选择
      
      // 节点的点击事件
      cy.on('click', 'node', function(evt){
        var node = evt.target;
        console.log( 'click ' + node.id());
      });
  
      // 节点的mouseover事件
      cy.on('mouseover', 'node', function(e){
        var neigh = e.target;
        cy.elements().difference(neigh.outgoers().union(neigh.incomers())).not(neigh).addClass('semitransp');
        neigh.addClass('highlight').outgoers().addClass('highlight');
      });
      cy.on('mouseout', 'node', function(e){
        var neigh = e.target;
        cy.elements().removeClass('semitransp');
        neigh.removeClass('highlight').outgoers().union(neigh.incomers()).removeClass('highlight');
    });

    })
     

    
  }

  // 添加节点
  function onAddNode(){
    let newNode = [
      { data: { id: 'n1',type: 'new' }},
      { data: { id: 'e0', source: 'Cert_022b914fcb91d5f90850e33ef3f59e995fb0a291ddf38d351f6624ca71486a22', target: 'n1' } }
    ]
    cy.add(newNode)
    cy.add([
      { data: { id: 'n2',type: 'new' }},
      { data: { id: 'e1', source: 'Cert_022b914fcb91d5f90850e33ef3f59e995fb0a291ddf38d351f6624ca71486a22', target: 'n2' } }
    ])
  }

  // 移除节点以及其相邻的边
  function onDeleteNode(Id){
    Id = 'n2'
    let j = cy.$('#' + Id)
    cy.remove(j)
  }

  // 根据节点类型过滤掉一些点
  function onFilterNode(nodeType){
    nodeType = 'Domain'
    var collection = cy.elements("node[type = '"+ nodeType + "']");   // 使用选择器对元素进行删除
    cy.remove(collection)
  }

  // 根据节点的id获取相应的元素
  function onSearchNode(Id){
    Id = 'n2'
    cy.getElementById(Id).style({'background-color': 'purple'})   // 更改被选中节点的属性

  }

  function onExportChart(){
    let jpg64 = cy.jpg()
  }

  function onCenter(Id){
    Id = 'n2'
    var j = cy.$(Id);
    cy.center( j );
  }

  function onGetSelected(){
    let selection = cy.elements(':selected')
    console.log((selection));
  }


  return (
    <div id="main-container" style={{ width: svgWidth, height: svgHeight, background: "#eee"}}>
      <div id="main-chart-control"  style={{ width: w, height: h, background: "#eee"}}>
        <Checkbox onChange={onAddNode}>增加元素</Checkbox>
        <Checkbox onChange={onDeleteNode}>删除元素</Checkbox>
        <Checkbox onChange={onFilterNode}>按照元素类型过滤</Checkbox>
        <Checkbox onChange={onSearchNode}>按照Id搜索图中节点</Checkbox>
        <Checkbox onChange={onExportChart}>导出图像</Checkbox>
        <Checkbox onChange={onCenter}>按节点位置居中</Checkbox>
        <Checkbox onChange={onGetSelected}>获取选中的元素</Checkbox>
      </div> 
      <div id="navigator"  style={{ width: 100, height: 100, position: 'flex'}}></div> 
      <div id="main-chart" style={{ width: svgWidth, height: svgHeight, background: "#eee"}}>
      </div>
    </div>
  );
}
