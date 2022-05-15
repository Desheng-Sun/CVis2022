import * as d3 from "d3";
import { useEffect, useState } from "react";
import { forceManyBodyReuse } from "d3-force-reuse";
import d3ContextMenu from "d3-context-menu";
import forceInABox from "force-in-a-box";
import { Checkbox, Select } from "antd";
// 数据请求接口
import { qone } from "../..//apis/api.js";
import "./index.css";
const { Option } = Select;

export default function SubChart2() {
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(1200);
  const [data, setData] = useState({ nodes: [], links: [] });
  const [dataParam, setDataParam] = useState("");

  // const [simu, setSimu] = useState("");

  const [isInBox, setIsInBox] = useState(false);
  const [isInTemplate, setIsInTemplate] = useState(false);

  // 请求数据
  useEffect(() => {
    qone().then((res) => {
      setData(res);
    });
  }, [dataParam]);

  useEffect(() => {
    drawChart();
  }, [data.nodes, data.links]);

  useEffect(() => {
    drawChart();
  }, [isInBox, isInTemplate]);

  function drawChart() {
    if (JSON.stringify(data) === "{}") {
      return;
    }

    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));
    const width = 1600;
    const height = 1200;
    var isDragging = false;

    d3.select("#chart svg").remove();

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const outer_g = svg.append("g").attr("transform", `translate(0, 0)`);

    // force-in-a-box算法
    let groupingForce = forceInABox()
      .template("treemap") // Either treemap or force
      .groupBy("group") // Nodes' attribute to group
      .strength(0.2) // Strength to foci
      .links(links) // The graph links. Must be called after setting the grouping attribute (Force template only)
      .enableGrouping(isInBox)
      .size([width, height]); // Size of the chart
    const simulation = d3
      .forceSimulation()
      .nodes(nodes)
      .force("group", groupingForce)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
          .strength(groupingForce.getLinkStrength)
      )
      .force("charge", d3.forceManyBody().strength(-20))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius(function (d) {
          // 避免元素相互重叠
          return 10;
        })
      );

    const gTemplate = svg.append("g").attr("class", "template");

    if (isInTemplate) {
      // console.log(simulation.force("group").getTemplateNodes());
      simulation.force("group").drawTemplate(gTemplate);
      // simulation.restart();
    } else {
      if (simulation.force("group") != undefined) {
        simulation.force("group").deleteTemplate(gTemplate);
        // simulation.restart();
      }
    }

    let Tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("font-size", "12px")
      .style("pointer-events", "none");
    const link_color_dict = {
      r_cert: "#c3e6a1",
      r_subdomain: "#e4657f",
      r_request_jump: "#a17fda",
      r_dns_a: "#ff9f6d",
      r_whois_name: "#4caead",
      r_whois_email: "#64d9d7",
      r_whois_phone: "#0af8f8",
      r_cert_chain: "#fffb96",
      r_cname: "#87ccff",
      r_asn: "#82b461",
      r_cidr: "#fde9d3",
    };
    const arrow_svg = svg.append("defs");
    function maker(arrow_color, index, source_index, target_index) {
      arrow_svg
        .append("marker")
        .attr("id", "arrow_" + index)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30)
        .attr("refY", 0)
        .attr("opacity", 0.8)
        .attr("markerWidth", 3)
        .attr("markerHeight", 3)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", arrow_color)
        .attr("source_target", source_index + "_" + target_index);
      return "url(#" + "arrow_" + index + ")";
    }

    const link = outer_g
      .append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", (d) => link_color_dict[d.relation])
      .attr("stroke-opacity", 0.35)
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("marker-end", (d) =>
        maker(
          link_color_dict[d.relation],
          d.index,
          d.source.index,
          d.target.index
        )
      )
      .on("mouseover", function (event, d) {
        d3.select(this).style("stroke-opacity", 1);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).style("stroke-opacity", 0.35);
      });

    const node_color_dict = {
      Domain: "#ff9f6d",
      IP: "#87ccff",
      Cert: "#c3e6a1",
      Whois_Name: "#4caead",
      Whois_Phone: "#0af8f8",
      Whois_Email: "#64d9d7",
      IP_C: "#fde9d3",
      ASN: "#82b461",
    };
    var r_scale = d3
      .scaleLinear()
      .domain(d3.extent(data.nodes, (d) => d.value))
      .range([5, 50]);
    const menu = [
      {
        title: "Remove node",
        action: function (d, event) {
          // 移除不需要的节点
          let invisible_link = [];
          link.style("stroke-opacity", function (o) {
            if (o.source === d || o.target === d) {
              invisible_link.push(o.source.index + "_" + d.index);
              invisible_link.push(d.index + "_" + o.target.index);
              return 0;
              // 移除当前这一条边
              // d3.select(this).remove()
            }
            return 0.35;
          });
          node.style("opacity", function (o) {
            if (isConnected(d, o)) {
              return 0;
              // 移除当前这一条边
              // d3.select(this).remove()
            }
            return 1;
          });
          var arrows = arrow_svg.selectAll("path");
          arrows.attr("opacity", function (o) {
            if (
              invisible_link.includes(d3.select(this).attr("source_target"))
            ) {
              return 0;
              // 移除当前这一条边
              // d3.select(this).remove()
            }
            return 1;
          });
        },
        disabled: false, // optional, defaults to false
      },
    ];

    const node = outer_g
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("id", (d) => d.id)
      .on("contextmenu", d3ContextMenu(menu)) // attach menu to element
      .on("click", (d) => alert(d))
      .attr("r", (d) => 10)
      .attr("fill", (d) => {
        if (
          d.id ==
          "IP_400c19e584976ff2a35950659d4d148a3d146f1b71692468132b849b0eb8702c"
        )
          return "red";
        else return node_color_dict[d.type];
      })
      .call(drag(simulation));

    node
      .on("mouseover", (event, d) => {
        link.style("stroke-opacity", function (l) {
          if (d === l.source || d == l.target) return 1;
          else return 0.05;
        });

        Tooltip.transition()
          .duration(300)
          .style("opacity", () => (!isDragging ? 0.97 : 0));
        Tooltip.html(() => {
          let tooltip_content = "";
          tooltip_content = d.type;
          // console.log(d);
          return tooltip_content;
        })
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 200 + "px");
      })
      .on("mouseout", (d) => {
        link.style("stroke-opacity", 0.35);
        Tooltip.transition().duration(300).style("opacity", 0);
      });

    var texts = outer_g
      .selectAll(".texts")
      .data(nodes)
      .enter()
      //.filter( d => (d.value >= d3.max(data.nodes, d => d.value)*(1-0.5)) )
      .filter((d) => d.value >= 20)
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("dx", 12)
      .attr("dy", "0.35em")
      //.attr("font-size", "34")
      .attr("font-size", (d) => r_scale(d.value))
      .text((d) => d.type);

    node.append("title").text((d) => d.name);

    /*const text = svg.append("g").attr("class", "labels").selectAll("g")
        .data(nodes)
      .enter().append("g");
      
      text.append("text")
        .attr("x", 14)
        .attr("y", ".31em")
        .attr("opacity", 0.2)
        .attr("pointer-events", "none")
        .style("font-family", "sans-serif")
        .style("font-size", "0.7em")
        .text(function(d) { return d.name; })*/
    function linkArc(d) {
      let x1 = d.source.x;
      let y1 = d.source.y;
      let x2 = d.target.x;
      let y2 = d.target.y;
      let dx = x2 - x1;
      let dy = y2 - y1;
      let dr = Math.sqrt(dx * dx + dy * dy);
      return (
        "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + x2 + "," + y2
      );
    }

    // console.log(simulation);
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)
        .attr("d", linkArc);
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      texts.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    // 节点拖拽事件
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        isDragging = true;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        isDragging = false;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // 判断两点之间是否有关联
    const linkedByIndex = {};
    links.forEach((d) => {
      linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
    });

    function isConnected(a, b) {
      return (
        linkedByIndex[`${a.index},${b.index}`] ||
        linkedByIndex[`${b.index},${a.index}`] ||
        a.index === b.index
      );
    }
    // 视图缩放
    let zoomHandler = d3
      .zoom()
      .on("zoom", zoomAction)
      .filter(function (event) {
        return !event.button && event.type != "dblclick";
      });
    function zoomAction(event) {
      outer_g.attr(
        "transform",
        `translate(${event.transform.x}, ${event.transform.y})` +
          "scale(" +
          event.transform.k +
          ")"
        // outer_g.attr("transform", `translate(${width / 2 + event.transform.x}, ${height / 2 + event.transform.y})` + "scale(" + event.transform.k +")"
      );
    }
    zoomHandler(svg);

    return svg.node();
  }

  var prev_color = "";
  var prevNodeElement = "";

  // 监听input框变化
  function inputChange(event) {
    var ev = window.event || event;
    //13是键盘上面固定的回车键
    if (ev.keyCode == 13) {
      var curNodeId = event.target.value; // 当前输入框的值
      var curNodeElement = d3.select("#" + curNodeId);
      if (prevNodeElement != "") {
        prevNodeElement.attr("fill", prev_color);
      }
      prev_color = curNodeElement.attr("fill");
      curNodeElement.attr("fill", "red");
      prevNodeElement = curNodeElement;
      console.log(prev_color);
    }
  }

  function onChangeInBox(e) {
    if (e.target.checked) {
      setIsInBox(true);
    } else {
      setIsInBox(false);
      setIsInTemplate(false);
    }
  }
  function onChangeDrawTemplate(e) {
    if (isInBox && e.target.checked) {
      setIsInTemplate(true);
    } else {
      setIsInTemplate(false);
    }
  }
  // function handleChange(value){
  //     setTemplate(value)
  // }
  return (
    <div id="main_container">
      <div>
        <input type="text" onKeyDown={inputChange} />
        <Checkbox onChange={onChangeInBox}>useGroupInABox</Checkbox>
        <Checkbox onChange={onChangeDrawTemplate}>Draw the template</Checkbox>
        {/* <Select defaultValue="treemap" onChange={handleChange}>
                    <Option value="treemap">treemap</Option>
                    <Option value="force">force</Option>
                </Select> */}
      </div>
      <div id="chart" style={{ background: "#eee" }}></div>
    </div>
  );
}
