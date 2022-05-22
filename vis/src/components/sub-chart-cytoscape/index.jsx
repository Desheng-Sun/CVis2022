import { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import euler from "cytoscape-euler";
import navigator from "cytoscape-navigator";
import coseBilkent from "cytoscape-cose-bilkent";
import fcose from 'cytoscape-fcose'
import "cytoscape-navigator/cytoscape.js-navigator.css";
import contextMenus from 'cytoscape-context-menus';  
import { Cascader, Select, Input, Slider, Button } from "antd";
import * as d3 from "d3";
import "./index.css";


// 数据请求接口
import { getMainChartData } from "../..//apis/api.js";

navigator(cytoscape);
contextMenus(cytoscape);
cytoscape.use(euler);
cytoscape.use(coseBilkent);
cytoscape.use(fcose);


const { Option } = Select;
const { Search } = Input;

var cy, layoutOption, styles, layout, collection;
var layoutOptionDict={
  'euler':{
    name: "euler",
    fit: true, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
    springLength: 5,
    mass: 5,
    animateFilter: function (node, i) {
      return true;
    }, // 决定是否节点的位置应该被渲染
    concentric: function (node) {
      // returns numeric value for each node, placing higher nodes in levels towards the centre
      return node.degree();
    },
  },
  'concentric':{
    name: "concentric",
    // fit: true, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
    minNodeSpace:1,
    concentric: function(node){ return node.degree()},
    levelWidth: function( nodes ){ // the variation of concentric values in each level
      return nodes.maxDegree() / 5;
    },
    spacingFactor: 0.2,
    animationDuration: 2000, // duration of animation in ms if enabled
    // width: 200,
    // height: 200
    // boundingBox:{x1:0, x2:0, w:500, h:500}
  },
  'dagre':{
    name: "concentric",
    fit: true, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
  },
  'coseBilkent':{   // 这两个很类似，决定保留哪一个
    name: "cose-bilkent",
    fit: true,
    animate: true,
    randomize: false,
    avoidOverlap: true,
    nodeRepulsion: 5000,
    idealEdgeLength: 50,
    edgeElasticity: 0.55,
    nestingFactor: 0.1,
    gravity: 0.55
  },
  'fcose':{
    name: "fcose",
    fit: true,
    quality: "default",
    animate: true,
    randomize: true,
    avoidOverlap: true,
    nodeRepulsion: 5000,
    idealEdgeLength: 50,
    edgeElasticity: 0.55,
    gravity: 0.55,
  }
}


export default function SubChartCytoscape({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [searchNodebyId, setSearchNodebyId] = useState(""); //
  const [filterType, setFilterType] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [edgeLength, setEdgeLength] = useState(5);
  const [nodeDistance, setNodeDistance] = useState(5);
  const [distanceFlag, setDistanceFlag] = useState(false);
  const [chartLayout, setChartLayout] = useState("euler");
  const [layoutFlag, setLayoutFlag] = useState(false);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [dataParam, setDataParam] = useState("");

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  // 请求数据并初始化图形
  useEffect(() => {
    getMainChartData().then((res) => {
      setData(res);
    });
  }, [dataParam]);

  // 监听搜索事件
  useEffect(() => {
    if (searchNodebyId) {
      var j = cy.getElementById(searchNodebyId);
      cy.center(j);                              // 将被搜索元素居中
      cy.getElementById(searchNodebyId).style({  // 高亮显示被选中节点
        "background-color": "#ffff00",
      }); 
    }
  }, [searchNodebyId]);

  // 监听过滤事件
  useEffect(() => {
    if (filterFlag) {
      // console.log("执行过滤", filterType);
      let ele = filterType[0];
      let type = filterType[1];
      let collection;
      if (ele === "node") {
        collection = cy.elements(ele + "[type='" + type + "']");
      } else {
        collection = cy.elements(ele + "[relation='" + type + "']");
      }
      cy.remove(collection);
    }
    setFilterFlag(false);
  }, [filterFlag]);

  // 处理节点的搜索事件
  useEffect(() => {
    drawChart();
  }, [data]);

  // 监听布局是否变化
  useEffect(() => {
    if(layoutFlag){
      layoutOption = layoutOptionDict[chartLayout]
      layout.stop();
      layout = cy.layout(layoutOption);
      layout.run();
      setEdgeLength(5)
      setNodeDistance(5)
    }
    setLayoutFlag(false)
  }, [chartLayout]);


  // 监听节点和边之间的距离是否变化
  useEffect(() => {
    if (distanceFlag && nodeDistance && edgeLength) {
      layout.stop();
      if(chartLayout === 'euler'){
        layoutOption.mass = 20 - nodeDistance;
        layoutOption.springLength = edgeLength * 20;
      }else if(chartLayout === 'fcose' || chartLayout === 'coseBilkent'){
        layoutOption.nodeRepulsion = nodeDistance*1000;
        layoutOption.idealEdgeLength = edgeLength*10
      }
      
      layout = cy.layout(layoutOption);
      layout.run();
    }
    setDistanceFlag(true);
  }, [nodeDistance, edgeLength]);

  function drawChart() {
    if (data.nodes.length === 0 && data.edges.length === 0) return;
    const links = data.edges.map((d) => ({ data: { ...d } }));
    const nodes = data.nodes.map((d) => ({ data: { ...d } }));
    // 初始化图
    Promise.all([
      fetch("./json/cy-style.json").then(function (res) {
        // 获取样式文件
        return res.json();
      }),
    ]).then(function (fetchData) {
      styles = fetchData[0];
      let newStyleArr = {
        selector: "node",
        style: {
          width: function (ele) {
            return ele.degree() < 15 ? 15 : ele.degree();
          }, // 根据节点的度数设置
          height: function (ele) {
            return ele.degree() < 15 ? 15 : ele.degree();
          },
        },
      };
      styles.push(newStyleArr);
      cy = cytoscape({
        container: document.getElementById("main-chart"),
        elements: {
          nodes: nodes,
          edges: links,
        },
        style: styles,
      });
      layoutOption = layoutOptionDict[chartLayout]

      var defaults = {
        container: false, // html dom element
        viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
        thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
        thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
        dblClickDelay: 200, // milliseconds
        removeCustomContainer: false, // destroy the container specified by user on plugin destroy
        rerenderDelay: 100, // ms to throttle rerender updates to the panzoom for performance
      };

      cy.navigator(defaults);
      layout = cy.layout(layoutOption);
      layout.run();
      cy.boxSelectionEnabled(true); // 设置支持框选操作，如果同时启用平移，用户必须按住shift、control、alt或command中的一个来启动框选择
      collection = cy.collection();
      // 节点的点击事件
      cy.on("click", "node", function (e) {
        var node = e.target;
        // console.log("click " + node.id());
      });

      // 节点的mouseover事件
      cy.on("mouseover", "node", function (e) {
        var neigh = e.target;
        collection = collection.union(neigh);
        cy.elements()
          .difference(neigh.outgoers().union(neigh.incomers()))
          .not(neigh)
          .addClass("semitransp");
        neigh.addClass("highlight").outgoers().addClass("highlight");
      });
      cy.on("mouseout", "node", function (e) {
        var neigh = e.target;
        cy.elements().removeClass("semitransp");
        neigh
          .removeClass("highlight")
          .outgoers()
          .union(neigh.incomers())
          .removeClass("highlight");
      });


      var menuOptions = {
        evtType: 'cxttap',
        menuItems: [
          {
            id: 'select-self-neigh', // ID of menu item
            content: '选中节点', // Display content of menu item
            tooltipText: '选中当前节点和邻居节点', // Tooltip text for menu item
            selector: 'node', 
            onClickFunction: function (e) { // 选中当前节点及其邻居节点
              let n = e.target;
              let curNodeId = n.id()
              n.select()
              cy.getElementById(curNodeId).neighborhood().select()
            }
          },
          {
            id: 'select-neigh', // ID of menu item
            content: '选中邻居节点', // Display content of menu item
            tooltipText: '选中邻居节点', // Tooltip text for menu item
            selector: 'node', 
            onClickFunction: function (e) { // 选中当前节点及其邻居节点
              let n = e.target;
              let curNodeId = n.id()
              cy.getElementById(curNodeId).neighborhood().select()
            }
          }
        ],
        menuItemClasses: [],
        contextMenuClasses: []
    };
    var muneInstance = cy.contextMenus(menuOptions);
    });
  }

  // 绘制控制面板
  const options = [
    {
      value: "node",
      label: "node",
      children: [
        {
          value: "Domain",
          label: "Domain",
        },
        {
          value: "IP",
          label: "IP",
        },
        {
          value: "Cert",
          label: "Cert",
        },
        {
          value: "Whois_Name",
          label: "Whois_Name",
        },
        {
          value: "Whois_Phone",
          label: "Whois_Phone",
        },
        {
          value: "Whois_Email",
          label: "Whois_Email",
        },
        {
          value: "IP_C",
          label: "IP_C",
        },
        {
          value: "ASN",
          label: "ASN",
        },
      ],
    },
    {
      value: "edge",
      label: "edge",
      children: [
        {
          value: "r_cert",
          label: "r_cert",
        },
        {
          value: "r_subdomain",
          label: "r_subdomain",
        },
        {
          value: "r_request_jump",
          label: "r_request_jump",
        },
        {
          value: "r_dns_a",
          label: "r_dns_a",
        },
        {
          value: "r_whois_name",
          label: "r_whois_name",
        },
        {
          value: "r_whois_email",
          label: "r_whois_email",
        },
        {
          value: "r_whois_phone",
          label: "r_whois_phone",
        },
        {
          value: "r_cert_chain",
          label: "r_cert_chain",
        },
        {
          value: "r_cname",
          label: "r_cname",
        },
        {
          value: "r_asn",
          label: "r_asn",
        },
        {
          value: "r_cidr",
          label: "r_cidr",
        },
      ],
    },
  ];

  // 添加节点
  function onAddNode() {
    let newNode = [
      { data: { id: "n1", type: "new" } },
      {
        data: {
          id: "e0",
          source:
            "Cert_022b914fcb91d5f90850e33ef3f59e995fb0a291ddf38d351f6624ca71486a22",
          target: "n1",
        },
      },
    ];
    cy.add(newNode);
    cy.add([
      { data: { id: "n2", type: "new" } },
      {
        data: {
          id: "e1",
          source:
            "Cert_022b914fcb91d5f90850e33ef3f59e995fb0a291ddf38d351f6624ca71486a22",
          target: "n2",
        },
      },
    ]);
  }

  // 移除节点以及其相邻的边
  function onDeleteNode(Id) {
    Id = "n2";
    let j = cy.$("#" + Id);
    cy.remove(j);
  }

  // 根据节点类型过滤掉一些点
  function onFilterNode(nodeType) {
    nodeType = "Domain";
    var collection = cy.elements("node[type = '" + nodeType + "']"); // 使用选择器对元素进行删除
    cy.remove(collection);
  }

  // 根据节点的id获取相应的元素
  function onSearchNode(Id) {
    Id = "n2";
    cy.getElementById(Id).style({ "background-color": "purple" }); // 更改被选中节点的属性
  }

  function onExportChart() {
    let jpg64 = cy.jpg();
  }

  function onCenter(Id) {
    Id = "n2";
    var j = cy.$(Id);
    cy.center(j);
  }

  function onGetSelected() {
    let selection = cy.elements(":selected");
    // console.log(selection);
  }

  // 过滤对应的回车和按钮提交事件
  function onFilterDetails(e) {
    setFilterType(e);
  }
  function onFilter() {
    setFilterFlag(true);
  }
  function onSearchNode(value) {
    setSearchNodebyId(value);
  }
  function onChangeLayout(value) {
    setLayoutFlag(true)
    setChartLayout(value);
  }
  function onChangeEdgeLength(value) {
    setEdgeLength(value);
  }
  function onChangeNodeDistance(value) {
    setNodeDistance(value);
  }
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }
  return (
    <div
      id="main-container"
      style={{ width: svgWidth, height: svgHeight, background: "#eee" }}
    >
      <div id="main-chart-control">
        <div
          id="data-mani"
          style={{
            display: "flex",
            flexDirection: "row",
            background: "#dacfca",
            paddingTop: "5px",
            paddingLeft: "10px",
            lineHeight: 2.2,
          }}
        >
          {" "}
          {/*  控制数据 */}
          <div id="main-data-search">
            节点搜索：
            <Search
              onSearch={onSearchNode}
              placeholder="输入节点id"
              style={{ width: 300 }}
            />
          </div>
          <div id="main-data-filter" style={{ paddingLeft: "10px" }}>
            过滤：
            <Cascader
              options={options}
              onChange={onFilterDetails}
              placeholder="Please select"
              showSearch={{ filter }}
            />
            <Button type="primary" onClick={onFilter}>
              Submit
            </Button>
          </div>
        </div>
        <div
          id="chart-mani"
          style={{
            display: "flex",
            flexDirection: "row",
            background: "#dacfca",
            paddingTop: "2px",
            paddingLeft: "10px",
            paddingBottom: "5px",
            lineHeight: 2.2,
            whiteSpace: "pre",
          }}
        >
          <div id="main-layout">
            布 局：
            <Select
              value={chartLayout}
              style={{ width: 120 }}
              onChange={onChangeLayout}
            >
              <Option value="euler">euler</Option>
              <Option value="coseBilkent">coseBilkent</Option>
              <Option value="dagre">dagre</Option>
              <Option value="concentric">concentric</Option>
              <Option value="fcose">fcose</Option>
            </Select>
          </div>
          <div
            id="edge-length"
            style={{
              paddingLeft: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            边长度
            <Slider
              min={1}
              max={50}
              value={edgeLength}
              onChange={onChangeEdgeLength}
              style={{ width: 120 }}
            />
          </div>
          <div
            id="node-distance"
            style={{
              paddingLeft: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            节点距离
            <Slider
              min={1}
              max={20}
              value={nodeDistance}
              onChange={onChangeNodeDistance}
              style={{ width: 120 }}
            />
          </div>
        </div>
      </div>
      <div id="navigator"></div>
      <div id="main-chart"></div>
    </div>
  );
}
