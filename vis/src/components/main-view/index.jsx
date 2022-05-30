import { useEffect, useState, React } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import euler from "cytoscape-euler";
import navigator from "cytoscape-navigator";
import coseBilkent from "cytoscape-cose-bilkent";
import undoRedo from "cytoscape-undo-redo";
import PubSub from "pubsub-js";
import {
  UndoOutlined,
  RedoOutlined,
  RollbackOutlined,
  CheckOutlined,
  CaretUpOutlined,
  ExpandOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import fcose from "cytoscape-fcose";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import contextMenus from "cytoscape-context-menus";
import { Cascader, Select, Input, Slider, Button, Checkbox } from "antd";
import * as d3 from "d3";
import "./index.css";

// 数据请求接口
import { getMainChartSds } from "../..//apis/api.js";

navigator(cytoscape);
undoRedo(cytoscape);
contextMenus(cytoscape);
cytoscape.use(dagre);
cytoscape.use(euler);
cytoscape.use(coseBilkent);
cytoscape.use(fcose);

const { Option } = Select;
const { Search } = Input;

var cy, layoutOption, stylesJson, layout;
var ur, urOption; // 保留点和边的初状态
var layoutOptionDict = {
  euler: {
    name: "euler",
    fit: true, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
    springLength: 10,
    mass: 7,
    // animateFilter: function (node, i) {
    //   return true;
    // }, // 决定是否节点的位置应该被渲染
    // concentric: function (node) {
    //   return node.degree();
    // },
  },
  concentric: {
    name: "concentric",
    // fit: false, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
    minNodeSpace: 1,
    concentric: function (node) {
      return node.degree();
    },
    levelWidth: function (nodes) {
      // the variation of concentric values in each level
      return nodes.maxDegree() / 5;
    },
    spacingFactor: 0.2,
    animationDuration: 1000, // duration of animation in ms if enabled
  },
  dagre: {
    name: "dagre",
    fit: false, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
  },
  coseBilkent: {
    name: "cose-bilkent",
    fit: false,
    animate: true,
    randomize: false,
    avoidOverlap: true,
    nodeRepulsion: 5000,
    idealEdgeLength: 50,
    edgeElasticity: 0.55,
    nestingFactor: 0.1,
    gravity: 0.55,
  },
  fcose: {
    name: "fcose",
    fit: false,
    quality: "default",
    animate: true,
    randomize: true,
    avoidOverlap: true,
    nodeRepulsion: 5000,
    idealEdgeLength: 50,
    edgeElasticity: 0.55,
    gravity: 0.55,
  },
};
export default function MainView({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [searchNodebyId, setSearchNodebyId] = useState(""); //
  const [filterType, setFilterType] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [edgeLength, setEdgeLength] = useState(10);
  const [nodeDistance, setNodeDistance] = useState(6);
  const [distanceFlag, setDistanceFlag] = useState(false);
  const [chartLayout, setChartLayout] = useState("euler");
  const [undoOut, setUndoOut] = useState(false);
  const [redoIn, setRedoIn] = useState(false);
  const [rollback, setRollback] = useState(false);
  const [layoutFlag, setLayoutFlag] = useState(false);
  const [arrowFlag, setArrowFlag] = useState(false);
  const [styleCheck, setStyleCheck] = useState(false);
  const [fromTableNode, setFromTableNode] = useState([]);
  const [fromTableLink, setFromTableLink] = useState([]);
  const [fromIndustryStackNode, setFromIndustryStackNode] = useState("");
  const [data, setData] = useState({ nodes: [], links: [] });
  const [dataFirst, setDataFirst] = useState(true);
  const [dataParam, setDataParam] = useState("");

  // 给其他组件的数据
  const [resData, setResData] = useState({ nodes: [], links: [] }); // 右侧表格和子弹图的确定的团伙子图
  const [difChartInput, setDifChartInput] = useState({ nodes: [], links: [] }); // 当前主图中的点和边 改变时更新DifChart视图
  const [statistics, setDataStatistics] = useState({ nodes: [], links: [] }); //  对选中的数据点进行统计分析，不一定是团伙子图

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
    drawLegend();
  }, [h]);

  // 监听搜索事件
  useEffect(() => {
    if (searchNodebyId) {
      var j = cy.getElementById(searchNodebyId);
      cy.center(j); // 将被搜索元素居中
      j.select();

      // j.addClass("searched");
      // cy.getElementById(searchNodebyId).style({
      //   // 高亮显示被选中节点
      //   "background-color": "#ffff00",
      // });
    }
  }, [searchNodebyId]);

  // 监听过滤事件
  useEffect(() => {
    if (filterFlag) {
      let ele = filterType[0];
      let type = filterType[1];
      let collection;
      if (ele === "node") {
        collection = cy.elements(ele + "[type='" + type + "']");
      } else {
        collection = cy.elements(ele + "[relation='" + type + "']");
        ur.do("remove", collection.connectedNodes());
      }
      ur.do("remove", collection);
    }
    setFilterFlag(false);
  }, [filterFlag]);

  // 监听主图中节点数据是否变化，如果变化，更新DifChart
  useEffect(() => {
    if (difChartInput.nodes.length !== 0 || difChartInput.links.length !== 0) {
      PubSub.publish("updateDifChart", difChartInput);
    }
  }, [difChartInput]);

  // 当确定了团伙的时候对团伙数据进行统计分析，并获取团伙中的关键路径和核心资产
  useEffect(() => {
    if (resData.nodes.length !== 0) {
      PubSub.publish("combinedNodeTableDt", resData); // 分别向节点表和边表传递数据
      PubSub.publish("combinedLinkTableDt", resData);
      // let tempNode = [];
      // for (let n of resData.nodes) {
      //   if (["IP", "Cert"].includes(n.type)) {
      //     tempNode.push(n);
      //   }
      // }
      PubSub.publish("industryStackDt", resData.links); // 将选中的数据中的IP和Cert传给stack组件
    }
  }, [resData]);

  // 对选择的数据在右侧表格和核心资产图中进行统计分析
  useEffect(() => {
    if (statistics.nodes.length !== 0) {
      PubSub.publish("combinedNodeTableDt", statistics); // 分别向节点表和边表传递数据
      PubSub.publish("combinedLinkTableDt", statistics);
      // let tempNode = [];
      // for (let n of statistics.nodes) {
      //   if (["IP", "Cert"].includes(n.type)) {
      //     tempNode.push(n);
      //   }
      // }
      PubSub.publish("industryStackDt", statistics.links); // 将选中的数据中的IP和Cert传给stack组件
    }
  }, [statistics]);

  // 监听布局是否变化
  useEffect(() => {
    if (layoutFlag) {
      layout.stop();
      layoutOption = layoutOptionDict[chartLayout];
      layout = cy.layout(layoutOption);
      if (edgeLength === 10 && nodeDistance === 10) {
        layout.run();
      } else {
        setEdgeLength(10);
        setNodeDistance(10);
      }
    }
    setLayoutFlag(false);
  }, [chartLayout]);

  // 监听节点和边之间的距离是否变化
  useEffect(() => {
    if (distanceFlag && nodeDistance && edgeLength) {
      layout.stop();
      if (chartLayout === "euler") {
        layoutOption.mass = nodeDistance;
        layoutOption.springLength = edgeLength * 20;
      } else if (chartLayout === "fcose" || chartLayout === "coseBilkent") {
        layoutOption.nodeRepulsion = nodeDistance * 1000;
        layoutOption.idealEdgeLength = edgeLength * 10;
      } else if (chartLayout === "concentric") {
        layoutOption.spacingFactor = 1; // 分辨率
        layoutOption.minNodeSpacing = nodeDistance;
      }
      layout = cy.layout(layoutOption);
      layout.run();
    }
    setDistanceFlag(true);
  }, [nodeDistance, edgeLength]);

  // 撤销上一步操作
  useEffect(() => {
    if (undoOut) {
      ur.undo();

      getDataForDifChart();
    }
    setUndoOut(false);
  }, [undoOut]);

  // 还原上一步撤销
  useEffect(() => {
    if (redoIn) {
      ur.redo();
      getDataForDifChart();
    }
    setRedoIn(false);
  }, [redoIn]);

  // 还原所有操作
  useEffect(() => {
    if (rollback) {
      ur.undoAll();
      getDataForDifChart();
    }
    setRollback(false);
  }, [rollback]);

  // 是否添加箭头
  useEffect(() => {
    if (arrowFlag) {
      cy.edges(":selected").addClass("arrow");
    } else if (cy) {
      cy.edges().removeClass("arrow");
    }
  }, [arrowFlag]);

  // 从table中传入数据进行高亮
  PubSub.unsubscribe("tableToMainNodeDt");
  PubSub.subscribe("tableToMainNodeDt", (msg, nodeData) => {
    setFromTableNode(nodeData);
  });
  PubSub.unsubscribe("tableToMainLinkDt");
  PubSub.subscribe("tableToMainLinkDt", (msg, linkData) => {
    setFromTableLink(linkData);
  });
  useEffect(() => {
    console.log(fromTableNode);
    if (cy) cy.nodes().removeClass("tablehighlightNode");
    if (fromTableNode.length !== 0) {
      cy.nodes().forEach((ele) => {
        if (fromTableNode.includes(parseInt(ele.json().data["numId"]))) {
          ele.addClass("tablehighlightNode");
        }
      });
    }
  }, [fromTableNode]);
  useEffect(() => {
    if (cy) cy.edges().removeClass("tablehighlightLink");
    if (cy && fromTableLink.length !== 0) {
      cy.edges().forEach((ele) => {
        if (
          fromTableLink.includes(
            ele.json().data["source"] + "-" + ele.json().data["target"]
          )
        ) {
          ele.addClass("tablehighlightLink");
        }
      });
    }
  }, [fromTableLink]);

  // 从industry stack中传入数据进行高亮显示
  PubSub.unsubscribe("industryStackToMainDt");
  PubSub.subscribe("industryStackToMainDt", (msg, industryStackToMainDt) => {
    setFromIndustryStackNode(industryStackToMainDt);
  });
  useEffect(() => {
    // if (cy) cy.nodes().removeClass("stackhighlightNode");
    if (cy && fromIndustryStackNode !== "") {
      if (fromIndustryStackNode.split("-")[0] === "set") {
        cy.$("#" + fromIndustryStackNode.split("-")[1]).addClass(
          "stackhighlightNode"
        );
      } else if (fromIndustryStackNode.split("-")[0] === "reset") {
        if (cy.$("#" + fromIndustryStackNode.split("-").length === 1)) {
          // 选择清除所有高亮的点
          cy.nodes().removeClass("stackhighlightNode");
        } else {
          cy.$("#" + fromIndustryStackNode.split("-")[1]).removeClass(
            "stackhighlightNode"
          );
        }
      }
    }
  }, [fromIndustryStackNode]);

  // 接收skeleton图过来的参数是否变化
  PubSub.unsubscribe("skeletonSelect");
  PubSub.subscribe("skeletonSelect", (msg, nodeLink) => {
    setDataParam(nodeLink);
  });

  // 请求数据并初始化图形
  useEffect(() => {
    if (dataParam === "") {
      setData({ nodes: [], links: [] });
    } else {
      getMainChartSds(dataParam).then((res) => {
        setData(res);
        console.log(res);
        setDifChartInput(res);
      });
    }
  }, [dataParam]);
  // 处理节点的搜索事件
  useEffect(() => {
    if (!dataFirst) {
      drawChart();
      dragElement(document.getElementById("main-legend"));
      setStyleCheck(false);
    }
    setDataFirst(false);
  }, [data]);

  // 绘制图形
  function drawChart() {
    if (data.nodes.length === 0) return;
    const nodes = data.nodes.map((d) => ({ data: { ...d } }));
    const links = data.links.map((d) => ({ data: { ...d } }));

    d3.selectAll("#main-chart div").remove();
    d3.selectAll("div#main-container .mainToolTip").remove();
    Promise.all([
      fetch("./json/cy-style-class.json").then(function (res) {
        return res.json();
      }),
    ]).then(function (fetchData) {
      stylesJson = fetchData[0];
      cy = cytoscape({
        container: document.getElementById("main-chart"),
        elements: {
          nodes: nodes,
          edges: links,
        },
        boxSelectionEnabled: true,
        style: stylesJson,
      });
      var defaults = {
        container: false, // html dom element
        viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
        thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
        thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
        dblClickDelay: 200, // milliseconds
        removeCustomContainer: false, // destroy the container specified by user on plugin destroy
        // rerenderDelay: 100, // ms to throttle rerender updates to the panzoom for performance
      };
      cy.navigator(defaults);

      layoutOption = layoutOptionDict[chartLayout];
      layout = cy.layout(layoutOption);
      layout.run();

      urOption = {
        isDebug: true,
        actions: {},
        undoableDrag: true,
        stackSizeLimit: undefined,
      };
      ur = cy.undoRedo(urOption);
      // ///////////////////////////////////////// 键盘、鼠标事件///////////////////////////////////
      document.addEventListener("keydown", function (e) {
        if (e.which === 46) {
          // 按删除键
          var selecteds = cy.$(":selected");
          if (selecteds.length > 0) {
            ur.do("remove", selecteds);
            getDataForDifChart();
          }
        }
        if (e.ctrlKey && e.target.nodeName === "BODY")
          if (e.which === 90) {
            ur.undo();
            getDataForDifChart();
          } else if (e.which === 89) {
            ur.redo();
            getDataForDifChart();
          }
      });

      var maintoolTip = d3
        .select("#main-container")
        .append("div")
        .attr("class", "mainToolTip");
      cy.on("click", "node", function (e) {
        var node = e.target;
      });
      cy.on("mouseover", "node", function (e) {
        var neigh = e.target;
        let curNOdeData = neigh.json().data;
        cy.elements()
          .difference(neigh.outgoers().union(neigh.incomers()))
          .not(neigh)
          .addClass("semitransp");
        neigh.addClass("highlight").outgoers().addClass("highlight");
        // 增加tooltip
        let htmlText;
        if (curNOdeData.type === "Domain")
          htmlText =
            "<b>" +
            "id: " +
            "</b>" +
            curNOdeData.id +
            "<br>" +
            "<b>" +
            "name: " +
            "</b>" +
            curNOdeData.name +
            "<br>" +
            "<b>" +
            "industry: " +
            "</b>" +
            curNOdeData.industry;
        else
          htmlText =
            "<b>" +
            "id: " +
            "</b>" +
            curNOdeData.id +
            "<br>" +
            "<b>" +
            "name: " +
            "</b>" +
            curNOdeData.name;
        maintoolTip
          .style("left", e.renderedPosition.x + 610 + "px")
          .style("top", e.renderedPosition.y + 110 + "px")
          .style("visibility", "visible")
          .html(htmlText);
      });
      cy.on("mouseout", "node", function (e) {
        var neigh = e.target;
        cy.elements().removeClass("semitransp");
        neigh
          .removeClass("highlight")
          .outgoers()
          .union(neigh.incomers())
          .removeClass("highlight");
        maintoolTip.style("visibility", "hidden");
      });

      var menuOptions = {
        evtType: "cxttap",
        menuItems: [
          {
            id: "select-self-neigh",
            content: "选中节点",
            tooltipText: "选中当前节点和邻居节点",
            selector: "node",
            onClickFunction: function (e) {
              let n = e.target;
              let curNodeId = n.id();
              n.select();
              cy.getElementById(curNodeId).neighborhood().select();
            },
          },
          {
            id: "select-neigh",
            content: "选中邻居节点",
            tooltipText: "选中邻居节点",
            selector: "node",
            onClickFunction: function (e) {
              let n = e.target;
              let curNodeId = n.id();
              cy.getElementById(curNodeId).neighborhood().select();
            },
          },
          {
            id: "select-analyze",
            content: "统计分析",
            tooltipText: "统计分析",
            selector: "node",
            onClickFunction: function (e) {
              let selection = cy.$(":selected"); // 获取当前选中的数据
              let nodes = selection.nodes().map((ele) => ele.json().data);
              let links = selection.edges().map((ele) => ele.json().data);
              setDataStatistics({ nodes: [...nodes], links: [...links] });
            },
          },
          {
            id: "copy-self",
            content: "复制id",
            tooltipText: "复制id",
            selector: "node",
            onClickFunction: function (e) {
              let currId = e.target.json().data["id"];
              document.execCommand("Copy", true, currId);
              const temp_input = document.createElement("input");
              document.body.appendChild(temp_input);
              temp_input.setAttribute("value", currId);
              temp_input.select();
              if (document.execCommand("copy")) {
                document.execCommand("copy");
              }
              document.body.removeChild(temp_input);
            },
          },
        ],
      };
      cy.contextMenus(menuOptions);
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

  // 根据节点类型过滤掉一些点
  function onFilterNode(nodeType) {
    nodeType = "Domain";
    var collection = cy.elements("node[type = '" + nodeType + "']"); // 使用选择器对元素进行删除
    cy.remove(collection);
  }

  // 图片的下载功能
  function onExportChart() {
    let blob = cy.png({
      output: "blob",
      bg: "transparent",
      full: true,
      scale: 4,
      quality: 1,
    });
    let aLink = document.createElement("a");
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);
    aLink.download = `${new Date().getTime()}.png`;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
    aLink.click();
    // document.body.removeChild(aLink);
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
    setLayoutFlag(true);
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
  function onUndoOut() {
    setUndoOut(true);
  }
  function onRedoIn() {
    setRedoIn(true);
  }
  function onRollback() {
    setRollback(true);
  }
  function addArrow() {
    setArrowFlag(!arrowFlag);
  }

  // 获取确定当前为一个子图并在右侧展示子图的数据
  function onSubmitRes() {
    let nodes, links;
    nodes = cy.nodes().map(function (ele, i) {
      return ele.json().data;
    });
    links = cy.edges().map(function (ele, i) {
      return ele.json().data;
    });
    setResData({ nodes: [...nodes], links: [...links] });
  }

  function getDataForDifChart() {
    let currICNodes = cy.nodes().filter((ele, index) => {
      return ele.data("type") === "IP" || ele.data("type") === "Cert";
    });
    currICNodes = currICNodes.map((item, index) => {
      return item.data("numId");
    });

    let graphnodes, graphlinks;
    graphnodes = cy.nodes().map(function (ele, i) {
      let inICLinks = data.nodes.filter((item, index) => {
        console.log(item, ele);
        return item["id"] === ele.data("id");
      });

      inICLinks = inICLinks[0]["InICLinks"];

      let inICLinksAfterDelete = []; // 删除后的ICLinks

      inICLinks.forEach((item, index) => {
        let l = item.split(",");
        let s, t;
        if (l.length === 2) {
          //  "1,1"
          s = l[0]; // 取该链路的source
          t = l[1]; // 取该链路的target

          if (
            currICNodes.includes(parseInt(s)) &&
            currICNodes.includes(parseInt(t))
          ) {
            inICLinksAfterDelete.push(item);
          }
          // else if (
          //   !currICNodes.includes(parseInt(s)) &&
          //   currICNodes.includes(parseInt(t))
          // ) {
          //   inICLinksAfterDelete.push(t);
          // } else if (
          //   !currICNodes.includes(parseInt(t)) &&
          //   currICNodes.includes(parseInt(s))
          // ) {
          //   inICLinksAfterDelete.push(s);
          // }
        } else if (l.length === 1) {
          s = l[0];
          if (currICNodes.includes(parseInt(s))) {
            inICLinksAfterDelete.push(item);
          }
        }
      });
      ele.data("InICLinks", inICLinksAfterDelete);
      return ele.json().data;
    });
    graphlinks = cy.edges().map(function (ele, i) {
      return ele.json().data;
    });

    setDifChartInput({ nodes: [...graphnodes], links: [...graphlinks] });
  }

  // 复选框确定是否添加样式
  function applyStyle(e) {
    setStyleCheck(!styleCheck);
    if (e.target.checked) {
      // 读取新的样式文件获取样式
      Promise.all([
        fetch("./json/cy-style-details.json").then(function (res) {
          return res.json();
        }),
      ]).then(function (fetchData) {
        let styleDetailsJson = fetchData[0];
        styleDetailsJson = [...styleDetailsJson, ...stylesJson];
        let newStyleArr = {
          selector: "node",
          style: {
            width: function (ele) {
              return ele.degree() < 30 ? 30 : ele.degree();
            },
            height: function (ele) {
              return ele.degree() < 30 ? 30 : ele.degree();
            },
          },
        };
        let domainNodeStyle = {
          selector: 'node[type="Domain"]',
          style: {
            "pie-size": "100%",
            "pie-1-background-color": "#2978b4",
            "pie-1-background-size": function (ele, curIndustry = "A") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-2-background-color": "#f9bf6f",
            "pie-2-background-size": function (ele, curIndustry = "B") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-3-background-color": "#ff756a",
            "pie-3-background-size": function (ele, curIndustry = "C") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-4-background-color": "#E8747C",
            "pie-4-background-size": function (ele, curIndustry = "D") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-5-background-color": "#2978b4",
            "pie-5-background-size": function (ele, curIndustry = "E") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-6-background-color": "#a6cee3",
            "pie-6-background-size": function (ele, curIndustry = "F") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-7-background-color": "#e53f32",
            "pie-7-background-size": function (ele, curIndustry = "G") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-8-background-color": "#f9b4ae",
            "pie-8-background-size": function (ele, curIndustry = "H") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
            "pie-9-background-color": "#f5f440",
            "pie-9-background-size": function (ele, curIndustry = "I") {
              if (ele.data("industry").trim() === "") return "0";
              let curIndustryArr = ele.data("industry").split("");
              let cellPie = 100 / curIndustryArr.length; // 每个单元格的面积
              if (curIndustryArr.includes(curIndustry))
                return cellPie.toString();
              return "0";
            },
          },
        };
        styleDetailsJson.push(newStyleArr);
        styleDetailsJson.push(domainNodeStyle);
        cy.style().fromJson(styleDetailsJson).update();
      });
    } else {
      cy.style().fromJson(stylesJson).update(); // 恢复到只添加类的样式
    }
  }

  function drawLegend() {
    d3.selectAll("#main-legend-content svg").remove();
    let legendSvg = d3
      .select("#main-legend-content")
      .append("svg")
      .attr("width", "115px")
      .attr("height", "280px");
    let nodeType = ["Domain", "IP", "IP_C", "Cert", "Whois", "ASN"];
    let nodeColor = [
      "#fff",
      "#7fc97f",
      "#7fc97f",
      "#ff756a",
      "#f67f02",
      "#f9bf6f",
    ];
    let edgeType = [
      "cert",
      "subdomain",
      "request_jump",
      "dns_a",
      "whois",
      "cert_chain",
      "cname",
      "asn",
      "cidr",
    ];
    let edgeColor = [
      "#ff756a",
      "#2978b4",
      "#1e38a1",
      "#33a02c",
      "#f67f02",
      "#f9b4ae",
      "#a6cee3",
      "#f9bf6f",
      "#7fc97f",
    ];
    let industryType = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let industryColor = [
      "#7fc97f",
      "#f9bf6f",
      "#ff756a",
      "#2978b4",
      "#f67f02",
      "#a6cee3",
      "#e53f32",
      "#f9b4ae",
      "#f5f440",
    ];
    // 添加节点类型的图例
    let nodeTypeWrapper = legendSvg
      .append("g")
      .attr("transform", "translate(5, 0)")
      .attr("class", "node-tyle-wrapper");
    nodeTypeWrapper
      .append("text")
      .text("节点类型")
      .attr("y", "20px")
      .attr("font-weight", "bold")
      .attr("font-size", "12px");
    let nodeTypeG = nodeTypeWrapper
      .selectAll("g")
      .data(nodeType)
      .join("g")
      .attr(
        "transform",
        (d, i) =>
          "translate(" +
          `${(i % 2) * 60 + 10}` +
          "," +
          `${Math.floor(i / 2) * 20 + 40}` +
          ")"
      );
    nodeTypeG
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", "6px")
      .attr("stroke", (d, i) => {
        if (i === 0) return "red";
      })
      .style("stroke-dasharray", (d, i) => {
        if (i === 0) return "2, 2";
      })
      .attr("fill", (d, i) => nodeColor[i]);
    nodeTypeG
      .append("text")
      .text((d) => d)
      .attr("x", 10)
      .attr("y", 3)
      .attr("font-size", "10px");
    // 添加边类型的图例
    let edgeTypeWrapper = legendSvg
      .append("g")
      .attr("transform", "translate(5, 90)")
      .attr("class", "edge-type-wrapper");
    edgeTypeWrapper
      .append("text")
      .text("边类型")
      .attr("y", "20px")
      .attr("font-weight", "bold")
      .attr("font-size", "12px");
    let edgeTypeG = edgeTypeWrapper
      .selectAll("g")
      .data(edgeType)
      .join("g")
      .attr(
        "transform",
        (d, i) =>
          "translate(" +
          `${0}`.toString() +
          "," +
          `${i * 12 + 25}`.toString() +
          ")"
      );

    edgeTypeG
      .append("line")
      .attr("x1", 0) //起点横坐标
      .attr("y1", 5)
      .attr("x2", 40)
      .attr("y2", 5)
      .attr("stroke", (d, i) => edgeColor[i])
      .attr("stroke-width", 3);
    edgeTypeG
      .append("text")
      .text((d) => d)
      .attr("x", 42)
      .attr("dy", 8)
      .attr("font-size", "11px");

    // 添加产业类型的图例
    let industryTypeWrapper = legendSvg
      .append("g")
      .attr("transform", "translate(5, 220)")
      .attr("class", "industry-tyle-wrapper");

    industryTypeWrapper
      .append("text")
      .text("产业类型")
      .attr("y", "20px")
      .attr("font-weight", "bold")
      .attr("font-size", "12px");

    let industryTypeG = industryTypeWrapper
      .selectAll("g")
      .data(industryType)
      .join("g")
      .attr(
        "transform",
        (d, i) => "translate(" + `${i * 2 + 3}`.toString() + ",20)"
      );
    industryTypeG
      .append("rect")
      .attr("x", (d, i) => i * 9)
      .attr("y", 10)
      .attr("width", 9)
      .attr("height", 15)
      .attr("fill", (d, i) => industryColor[i]);
    industryTypeG
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 9 + 2)
      .attr("y", 35)
      .attr("font-size", "10px")
      .attr("text-align", "center");
  }
  function onCollapse() {
    d3.select("#main-legend-content").style("display", "none");
  }
  function onExpand() {
    d3.select("#main-legend-content").style("display", "contents");
  }
  // 图例可拖拽
  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <div
      id="main-container"
      style={{ width: svgWidth, height: svgHeight, background: "#fff" }}
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
            <Button
              type="dashed"
              icon={<UndoOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={onUndoOut}
            >
              undo
            </Button>
            <Button
              type="dashed"
              icon={<RedoOutlined />}
              style={{ marginLeft: "5px" }}
              onClick={onRedoIn}
            >
              redo
            </Button>
            <Button
              type="dashed"
              icon={<RollbackOutlined />}
              style={{ marginLeft: "5px" }}
              onClick={onRollback}
            >
              rollback
            </Button>
            <Button
              type="dashed"
              icon={<CheckOutlined />}
              style={{ marginLeft: "5px" }}
              onClick={onSubmitRes}
            >
              submit
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
          <Checkbox onChange={addArrow}>箭头方向</Checkbox>
          <Checkbox checked={styleCheck} onChange={applyStyle}>
            应用样式
          </Checkbox>
        </div>
      </div>
      <div id="main-legend">
        <div id="legend-header">
          图例
          <CaretUpOutlined
            id="collapse-legend-icon"
            style={{ paddingLeft: "40px" }}
            onClick={onCollapse}
          />
          <CaretDownOutlined
            id="expand-legend-icon"
            style={{ paddingLeft: "10px" }}
            onClick={onExpand}
          />
        </div>
        <div id="legend-divider"></div>
        <div id="main-legend-content"></div>
      </div>
      <div id="navigator"></div>
      <div id="main-chart"></div>
    </div>
  );
}
