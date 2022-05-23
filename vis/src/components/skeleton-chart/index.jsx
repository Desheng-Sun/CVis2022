import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";
import lasso from "./d3-lasso";
import d3ContextMenu from "d3-context-menu";
import PubSub from "pubsub-js";

import "./index.css";
import { icclue, getSkeletonChartDataSds } from "../../apis/api";

const d3Lasso = lasso;
var linkedByIndex = {};
export default function SkeletonChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState({});
  const [dataParam, setDataParam] = useState("");
  const [selectedNode, setSelectedNode] = useState([]);
  const [currIc, setCurrIc] = useState(["3", "4", "101", "112"]); // 当前已选择的ic

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  // 请求数据
  // 监听冰柱图选择的节点的变化
  useEffect(() => {
    // getSkeletonChartDataSds(currIc).then((res) => {
    //   // console.log(res);
    //   setData(res);
    // });

    let dt = {
      nodes: [
        {
          id: "Myriel",
          numId: 1,
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Napoleon",
          numId: 2,
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Mlle.Baptistine",
          numId: 3,
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Mme.Magloire",
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "CountessdeLo",
          numId: 4,
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Geborand",
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        },
        {
          id: "Champtercier",
          numId: 5,
          ICIndustry: [
            { industry: "AB", number: 2 },
            { industry: "AE", number: 8 },
            { industry: "BCD", number: 1 },
          ],
          group: 1,
        }
      ],
      links: [
        { source: "Napoleon", target: "Myriel", value: 1 },
        { source: "Champtercier", target: "Myriel", value: 8 },
        { source: "Geborand", target: "Champtercier", value: 10 },
        { source: "Mlle.Baptistine", target: "Mme.Magloire", value: 6 },
        { source: "Mlle.Baptistine", target: "Myriel", value: 1 },
      ],
    };
    setData(dt)
  }, [currIc]);

  // 监听用户选择的节点
  useEffect(() => {
    // PubSub.publish("skeletonSelect", selectedNode);
    

    console.log(linkedByIndex);
  }, [selectedNode])

  useEffect(() => {
    drawChart();
  }, [data]);

  PubSub.subscribe("icicleSelect", (msg, ic) => {
    setCurrIc(ic);
  });

  // 判断两个点之间是否有连接
  function isConnected(a, b) {
    return (
      linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index
    );
  }

  // 绘制结构图
  function drawChart() {
    if (JSON.stringify(data) === "{}") return;

    var combinationOrderSet = new Set();
    var links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d, i) => {
      for (let item in d.ICIndustry) {
        combinationOrderSet.add(d.ICIndustry[item]["industry"]);
      }
      return Object.create({ ...d, group: i });
    }); 

    if(links){
      links.forEach((d, i) => {
        console.log(d, d.source.numId);
        linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
      });
    }

    let combinationOrder = [...combinationOrderSet].sort(); // 包含的所有产业类型组合
    let industryType = [
      ...new Set([...combinationOrder.toString().replaceAll(",", "")]),
    ].sort(); // 包含的所有产业类型

    d3.selectAll("div#skeleton-chart svg").remove();
    const svg = d3
      .select("#skeleton-chart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("viewBox", [0, 0, svgWidth, svgHeight]);
    var displayGroupOnHover = false,
      scaleFactor = 1.2, // 值为1表示紧连边缘的点
      margin = scaleFactor,
      nodeRadius = 10,
      onHover = undefined,
      onClick = undefined,
      onLeave = undefined,
      chargeStrength = undefined,
      linkStrength = undefined;
    // combinationOrder = ["AB", "AE", "BCD"]; // 按字母对所有产业组合进行排序
    const wrapper = svg.append("g").attr("transform", `translate(0, 0)`);

    // create groups, links and nodes
    const groups = wrapper.append("g").attr("class", "groups");
    // 节点的右键事件
    const menu = [
      {
        title: "取消选择",
        action: function (groupId, event) {
          d3.select(this)
            .classed("selected", false)
            .attr("fill", "white")
            .attr("opacity", 0.2);

          // 获取被取消数据对应的numId
          let numId = nodes
            .filter((d) => d.group == groupId)
            .map((d) => d.id)[0];
          // 从选择的数据中删掉被取消的元素
          setSelectedNode((selectedNode) =>
            selectedNode.filter((d) => d != numId)
          );
        },
      },
    ];
    const link = wrapper
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1)
      .attr("stroke", "#ccc");
    const nodeColor = d3.scaleOrdinal(d3.schemeCategory10);
    const nodeG = wrapper
      .append("g")
      .attr("class", "nodeG")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("fill", "white")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
    nodeG.append("title").text(function (d) {
      return d.id;
    });
    var innerCirlceColor = ["#ffd006", "#67bbd7"];
    nodeG
      .append("circle")
      .attr("r", 2)
      .attr("fill", "white")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", (d, index) => innerCirlceColor[index % 2]);

    if (typeof onHover === "function") {
      nodeG.on("mouseover", onHover);
    }
    if (typeof onLeave === "function") {
      nodeG.on("mouseout", onLeave);
    }
    if (typeof onClick === "function") {
      nodeG.on("click", onClick);
    }
    function onHover() {
      console.log(this);
    }

    // 绘制每个节点的内部图
    const industryColor = {
      0: "#c3e6a1",
      1: "#e4657f",
      2: "#a17fda",
      3: "#ff9f6d",
      4: "#4caead",
      5: "#64d9d7",
      6: "#82b461",
      7: "#fffb96",
      8: "#87ccff",
    };
    const arc = d3
      .arc()
      .innerRadius((i, j) => 2 + 2 * j)
      .outerRadius((i, j) => 2 + 2 * (j + 1))
      .startAngle((i) => ((2 * Math.PI) / combinationOrder.length) * i - 2)
      .endAngle((i) => ((2 * Math.PI) / combinationOrder.length) * (i + 1) - 2)
      .cornerRadius(60)
      .padAngle(0.5);

    for (let i = 0; i < combinationOrder.length; i++) {
      let currInduYIndex = [],
        first_flag = true;
      for (var j = 0; j < industryType.length; j++) {
        nodeG
          .append("path")
          .attr("d", arc(i, j))
          .attr("stroke", "none")
          .attr("fill", (d) => {
            if (first_flag) {
              for (let indus in d.ICIndustry) {
                if (
                  combinationOrder.indexOf(d.ICIndustry[indus]["industry"]) == i
                ) {
                  // 当前产业与当前弧对应的产业一致
                  let currIndu = d.ICIndustry[indus]["industry"]; // 当前产业集合，然后获取当前产业集合包含的子产业对应的径向索引
                  currInduYIndex = currIndu
                    .split("")
                    .map((value) => industryType.indexOf(value));
                  break;
                }
              }
            }
            first_flag = false;
            if (currInduYIndex.length != 0 && currInduYIndex.indexOf(j) != -1) {
              return industryColor[j];
            }
            return "white";
          });
      }
    }

    // 定义simulation
    const simulation = d3
      .forceSimulation()
      .nodes(nodes)
      .force("charge", d3.forceManyBody().strength(-50));
    if (linkStrength && typeof linkStrength === "number") {
      simulation.force(
        "link",
        d3
          .forceLink()
          .links(links)
          .id((d) => d.id)
          .strength(linkStrength)
      );
    } else {
      // simulation.force('link', d3.forceLink().links(links).id(d => d.id));
      simulation.force(
        "link",
        d3
          .forceLink()
          .links(links)
          .id((d) => d.id)
          .strength((d) => (d.source.group == d.target.group ? 0.6 : 0.1))
      );
    }
    simulation
      .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
      .force("collision", d3.forceCollide().radius(19));
    simulation.on("tick", tick);
    function tick() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeG.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
      updateGroups(groupPath, groupIds, nodeG, margin);
    }

    // 选择group中的节点，检索该节点的位置并返回特定点的convex hull（最少为3个点，否则返回null）
    const groupIds = [...new Set(nodes.map((n) => +n.group))]
      .map((groupId) => ({
        groupId: groupId,
        count: nodes.filter((n) => +n.group == groupId).length,
      }))
      .map((group) => group.groupId);

    const groupPath = groups
      .selectAll(".path_placeholder")
      .data(groupIds, (d) => +d)
      .join("g")
      .attr("class", "path_placeholder")
      .attr("groupId", (d) => d)
      .append("path")
      .attr("stroke", "grey")
      .attr("fill", "white")
      //   .attr("fill", (d) => nodeColor(d))
      .attr("opacity", 0.2)
      .on("contextmenu", d3ContextMenu(menu));
    // .on('mouseover', (event, d) => {
    //   d3.select(this).transition()
    //   .duration(2000)
    //   .attr('opacity', 0.8);
    //   console.log(this);
    // })
    // .on('mouseout', (event, d) => {
    //   d3.select(this).transition()
    //   .duration(2000)
    //   .attr('opacity', 0.2);
    // })

    if (displayGroupOnHover) {
      groupPath.transition().duration(2000).attr("opacity", 0.8);
    }

    // 对group添加交互
    // groups.selectAll('.path_placeholder')
    //   .call(d3.drag()
    //     .on('start', group_dragstarted)
    //     .on('drag', group_dragged)
    //     .on('end', group_dragended)
    //   )
    //拖拽节点
    function dragstarted(evt, d) {
      if (!evt.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(evt, d) {
      d.fx = evt.x;
      d.fy = evt.y;
    }
    function dragended(evt, d) {
      if (!evt.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // 拖拽group
    function group_dragstarted(event, groupId) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d3.select(this).select("path").style("stroke-width", 3);
    }
    function group_dragged(event, groupId) {
      nodeG
        .filter(function (d) {
          return d.group == groupId;
        })
        .each(function (d) {
          d.x += event.dx;
          d.y += event.dy;
        });
    }
    function group_dragended(event, groupId) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d3.select(this).select("path").style("stroke-width", 1);
    }

    // // 生成group表示，检索group中的节点的位置，返回特定点的convex hull，至少有三个点，否则返回null
    function polygonGenerator(groupId, node) {
      var node_coords = nodeG
        .filter((d) => d.group == groupId)
        .data()
        .map((d) => [d.x, d.y]);
      // 处理点数小于3的组
      if (node_coords.length == 2) {
        let point_x1 = node_coords[0][0],
          point_y1 = node_coords[0][1];
        let point_x2 = node_coords[1][0],
          point_y2 = node_coords[1][1];
        node_coords = [];
        node_coords.push([point_x1, point_y1 + nodeRadius]);
        node_coords.push([point_x1, point_y1 - nodeRadius]);
        node_coords.push([point_x2, point_y2 + nodeRadius]);
        node_coords.push([point_x2, point_y2 - nodeRadius]);
      } else if (node_coords.length == 1) {
        let point_x = node_coords[0][0],
          point_y = node_coords[0][1];
        node_coords = [];
        node_coords.push([point_x - nodeRadius, point_y + nodeRadius]);
        node_coords.push([point_x + nodeRadius, point_y + nodeRadius]);
        node_coords.push([point_x + nodeRadius, point_y - nodeRadius]);
        node_coords.push([point_x - nodeRadius, point_y - nodeRadius]);
      }
      return d3.polygonHull(node_coords);
    }
    function updateGroups(groupPath, groupIds, node, margin) {
      const valueline = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(d3["curveCardinalClosed"]);

      groupIds.forEach((groupId) => {
        let centroid = [];
        let path = groupPath
          .filter((d) => d == groupId)
          .attr("transform", "scale(1) translate(0,0)")
          .attr("d", (d) => {
            const polygon = polygonGenerator(d, node);
            centroid = d3.polygonCentroid(polygon);
            // 适当缩放形状：移动g元素到质心点，translate g围绕中心的所有路径
            return valueline(
              polygon.map((point) => [
                point[0] - centroid[0],
                point[1] - centroid[1],
              ])
            );
          });
        d3.select(path.node().parentNode).attr(
          "transform",
          "translate(" +
            centroid[0] +
            "," +
            centroid[1] +
            ") scale(" +
            margin +
            ")"
        );
      });
    }

    // 视图缩放：缩放了就不会有选择
    // let zoomHandler = d3
    //   .zoom()
    //   .on("zoom", zoomAction)
    //   .filter(function (event) {
    //     return !event.button && event.type != "dblclick";
    //   });
    // function zoomAction(event) {
    //   wrapper.attr(
    //     "transform",
    //     `translate(${event.transform.x}, ${event.transform.y})` +
    //       "scale(" +
    //       event.transform.k +
    //       ")"
    //     );
    // }
    // zoomHandler(svg);

    // ----------------   LASSO STUFF . ----------------
    var lasso_start = function () {
      // 可以选择在框选之前删除所有的样式
      // lasso.items()
      //     .classed("not_possible",true)
      //     .classed("selected",false);
    };

    var lasso_draw = function () {
      lasso
        .possibleItems()
        .selectAll("path")
        .attr("fill", "#fe2236")
        .attr("opacity", 0.5);

      // lasso.notPossibleItems()
      //     .classed("not_possible",true)
      //     .classed("possible",false);
    };

    var lasso_end = function () {
      lasso.selectedItems().selectAll("path").classed("selected", "selected");

      // 保留多次选择的结果
      d3.selectAll(".path_placeholder path")
        .filter(function (d) {
          return d3.select(this).attr("class") != "selected";
        })
        .attr("fill", "white")
        .attr("opacity", 0.2);

      // lasso.notSelectedItems()
      //     .selectAll('path')
      //     .attr('fill', 'none')
      //     .attr("opacity", 0.5);

      // 获取选中的数据对应的numId
      var groupIdArr = lasso.selectedItems()._groups[0].map((d) => d.__data__);
      
      if (groupIdArr.length != 0) {
        let numIdArr = nodes
          .filter((d) => groupIdArr.includes(d.group))
          .map((d) => {
            console.log(d);
            return d.id
          });
        setSelectedNode((selectedNode) =>
          Array.from(new Set([...selectedNode, ...numIdArr]))
        );
      }
    };

    const lasso = d3Lasso()
      .closePathDistance(305)
      .closePathSelect(true)
      .targetArea(svg)
      .items(d3.selectAll(".path_placeholder"))
      .on("start", lasso_start)
      .on("draw", lasso_draw)
      .on("end", lasso_end);

    svg.call(lasso);
  }

  return (
    <div id="skeleton-chart" style={{ width: "100%", height: "100%" }}></div>
  );
}
