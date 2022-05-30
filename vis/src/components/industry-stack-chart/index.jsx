import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PubSub from "pubsub-js";
import d3ContextMenu from "d3-context-menu";
import "./index.css";
import { Button } from "antd";
import { NodeIndexOutlined } from "@ant-design/icons";
import { getIdentifyICNodesSds } from "../../apis/api";
export default function IndustryStackChart({ w, h }) {
  const [data, setData] = useState([]);
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState("26.29vh");
  const [dataParam, setDataParam] = useState([]);

  // 传递给其他组件的数据
  const [selectedNodeNumId, setSelectedNodeNumId] = useState(""); // 主图高亮的数据
  const [toPath, setToPath] = useState({ startNode: [], endNode: [] }); // 传递给关键路径识别的算法并在关键路径图中绘制出当前路径

  PubSub.unsubscribe("industryStackDt");
  // 数据格式: 缺少每种产业的数量信息
  //   [  {
  //     "numId": 16802,
  //     "id": "IP_7cc9198e5eaa613f2e0065ab6600b9dcfb62f4f598b20383925897b83e1b1f9b",
  //     "name": "104.244.xxx.xxx",
  //     "type": "IP",
  //     "industry": "  ",
  //     "InICLinks": []
  // },
  // {
  //   "numId": 16802,
  //   "id": "IP_7cc9198e5eaa613f2e0065ab6600b9dcfb62f4f598b20383925897b83e1b1f9b",
  //   "name": "104.244.xxx.xxx",
  //   "type": "IP",
  //   "industry": "  ",
  //   "InICLinks": []
  // }]

  PubSub.subscribe("industryStackDt", (msg, dataparam) => {
    // 这里根据dataParamn参数从后端获取数据
    setDataParam(dataparam);
  });

  useEffect(() => {
    getIdentifyICNodesSds(dataParam).then((res) => {
      console.log("------", res);
      setData(res);
    });
    // let dt = [
    //   {
    //     id: "IP_A",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AED", number: 18 },
    //       { industry: "BCD", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "IP_B",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "DE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_C",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "B", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCD", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "IP_D",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "H", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    //   {
    //     id: "Cert_E",
    //     numId: 0,
    //     ICIndustry: [
    //       { industry: "AB", number: 2 },
    //       { industry: "AE", number: 8 },
    //       { industry: "BCE", number: 1 },
    //     ],
    //     group: 1,
    //   },
    // ];
    // setData(dt);
  }, [dataParam]);

  useEffect(() => {
    if (selectedNodeNumId !== "") {
      PubSub.publish("industryStackToMainDt", selectedNodeNumId);
    }
  }, [selectedNodeNumId]);

  useEffect(() => {
    setSvgWidth(w);
  }, [w]);

  useEffect(() => {
    drawChart();
  }, [svgWidth, data]);

  function drawChart() {
    if (data.length === 0) return;

    d3.select("#industry-stack-chart svg").remove();
    d3.select("#industry-stack-chart .stackToolTip").remove();
    var combinationOrderSet = new Set();
    var innerCirlceColor = { IP: "#33a02c", Cert: "#ff756a" };
    // 映射产业类型
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

    // 获取所有的资产组合和种类
    // let AMin=0, AMax=0, BMin=0, BMax=0, CMin=0, CMax=0, DMin=0, DMax=0, EMin=0, EMax=0, FMin=0, FMax=0, GMin=0, GMax=0, HMIn=0 ,HMax=0, IMin=0, IMax=0;
    let min = 0,
      max = 0;
    for (let d of data) {
      for (let j in d.ICIndustry) {
        min = Math.min(min, d.ICIndustry[j]["number"]);
        max = Math.max(max, d.ICIndustry[j]["number"]);
        combinationOrderSet.add(d.ICIndustry[j]["industry"]);
      }
    }
    let combinationOrder = [...combinationOrderSet].sort();
    let industryType = [
      ...new Set([...combinationOrder.toString().replaceAll(",", "")]),
    ].sort(); // 包含的所有产业类型

    const AColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#c3e6a1"]);
    const BColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#e4657f"]);
    const CColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#a17fda"]);
    const DColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#ff9f6d"]);
    const EColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#4caead"]);
    const FColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#64d9d7"]);
    const GColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#82b461"]);
    const HColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#fffb96"]);
    const IColorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["#fff", "#87ccff"]);
    console.log(max);
    const industryColoeScale = {
      A: AColorScale,
      B: BColorScale,
      C: CColorScale,
      D: DColorScale,
      E: EColorScale,
      F: FColorScale,
      G: GColorScale,
      H: HColorScale,
      I: IColorScale,
    };

    let gHeight = 50,
      circleR = 5,
      levelNumber = 3;
    let gWidth = (svgWidth * 0.9) / levelNumber;
    const arc = d3
      .arc()
      .innerRadius((i, j) => circleR + (gHeight / industryType.length) * j)
      .outerRadius(
        (i, j) => circleR + (gHeight / industryType.length) * (j + 1)
      )
      .startAngle((i) => ((2 * Math.PI) / combinationOrder.length) * i - 2)
      .endAngle((i) => ((2 * Math.PI) / combinationOrder.length) * (i + 1) - 2)
      .cornerRadius(60)
      .padAngle(0.2);

    let wrapper = d3
      .select("#industry-stack-chart")
      .append("svg")
      .attr("width", svgWidth * 0.9)
      .attr(
        "height",
        (gHeight + circleR + 10) * 2 * (data.length / levelNumber + 1)
      )
      .append("g")
      .attr("transform", (d, i) => {
        let x = gWidth / levelNumber + 10;
        let y = gHeight + circleR * 2;
        return "translate(" + x.toString() + "," + y.toString() + ")";
      });

    // 节点的右键事件
    const menu = [
      {
        title: "资产起点",
        action: function (d, event, index) {
          d3.select(this).select("rect").attr("stroke", "green");
          setToPath((toPath) => ({
            startNode: [...toPath.startNode, d.numId],
            endNode: [...toPath.endNode],
          }));
        },
      },
      {
        title: "资产终点",
        action: function (d, event, index) {
          d3.select(this).select("rect").attr("stroke", "red");
          setToPath((toPath) => ({
            startNode: [...toPath.startNode],
            endNode: [...toPath.endNode, d.numId],
          }));
        },
      },
    ];

    let g = wrapper
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("class", "stackInnerG")
      .attr("stroke", "#aaa")
      .attr("transform", (d, i) => {
        let x = gWidth * (i % levelNumber);
        let y = (gHeight + circleR + 10) * 2 * Math.floor(i / levelNumber);
        return "translate(" + x.toString() + "," + y.toString() + ")";
      })
      .on("click", function (event, d) {
        if (event.ctrlKey) {
          // 按下Ctrl键 + click 取消选择
          // setSelectedNodeNumId("reset-" + d.id); // 取消在主图中高亮当前数据点
        } else {
          console.log(d);
          // setSelectedNodeNumId("set-" + d.id); // 在主图中高亮当前数据点
        }
      })
      .on(
        "contextmenu",
        d3ContextMenu(menu, {
          position: function (d, event) {
            return {
              top: event.y + 10,
              left: event.x + 10,
            };
          },
        })
      );

    g.append("rect")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", -63)
      .attr("y", -59)
      .attr("class", "bgRect")
      .attr("fill", "transparent")
      .attr("stroke", "none")
      .attr("width", (gHeight + circleR * 2) * 2 + 2)
      .attr("height", (gHeight + circleR * 2) * 2 + 2)
      .on("click", function (event, d) {
        if (event.ctrlKey) {
          // 按下Ctrl键 + click 取消选择
          d3.select(this).attr("fill", "transparent");
        } else {
          d3.select(this).attr("fill", "#ccc");
        }
      });

    g.append("text")
      .attr("transform", (d) => "translate(10,10)")
      .selectAll("tspan")
      .data((d) => d.ICIndustry)
      .join("tspan")
      .attr("x", 50)
      .attr("y", (d, i) => `${i * 1.5 - 2}em`)
      .attr("font-weight", "bold")
      .attr("stroke", "none")
      .attr("font-size", "10px")
      .attr("font", "10px segoe ui")
      .style("user-select", "none")
      .attr("fill", (d, i) => industryColor[i])
      .text((d) => {
        return "#" + d.industry + ": " + d.number;
      });

    g.append("circle")
      .attr("r", circleR)
      .attr("fill", "transparent")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("stroke", (d, index) => {
        return innerCirlceColor[d["id"].split("_")[0]];
      })
      .attr("stroke-width", 3);

    var industryStacktoolTip = d3
      .select("#industry-stack-chart")
      .append("div")
      .attr("class", "stackToolTip");

    for (let k = 0; k < data.length; k++) {
      for (let i = 0; i < combinationOrder.length; i++) {
        let currInduYIndex = [],
          first_flag = true,
          indu = 0;
        for (let j = 0; j < industryType.length; j++) {
          d3.select(d3.selectAll(".stackInnerG")._groups[0][k])
            .append("path")
            .attr("d", arc(i, j))
            // .attr("stroke", "#aaa")
            .attr("fill", (d) => {
              if (first_flag) {
                for (let loopIndu in d.ICIndustry) {
                  if (
                    combinationOrder.indexOf(
                      d.ICIndustry[loopIndu]["industry"]
                    ) === i
                  ) {
                    // 当前产业与当前弧对应的产业一致
                    let currIndu = d.ICIndustry[loopIndu]["industry"]; // 当前产业集合，然后获取当前产业集合包含的子产业对应的径向索引
                    currInduYIndex = currIndu
                      .split("")
                      .map((value) => industryType.indexOf(value));
                    indu = loopIndu;
                    break;
                  }
                }
              }
              first_flag = false;
              if (
                currInduYIndex.length !== 0 &&
                currInduYIndex.indexOf(j) !== -1
              ) {
                // return industryColor[j];
                return industryColoeScale[industryType[j]](
                  d.ICIndustry[indu]["number"]
                );
              }
              return "#bbb";
            })
            .attr("stroke", () => {
              return "none";
            })
            .attr("stroke-width", 0.5)
            .on("mouseover", (event, d) => {
              let htmlText = `id: <strong>${d.id}</strong> <br>产业: <strong>${industryType[j]}</strong>`;
              industryStacktoolTip
                .style("left", event.pageX + 5 + "px")
                .style("top", event.pageY + 5 + "px")
                .style("visibility", "visible")
                .html(htmlText);
            })
            .on("mouseout", () => {
              industryStacktoolTip.style("visibility", "hidden"); // Hide toolTip
            });
        }
      }
    }
  }

  function onClearSelection() {
    d3.selectAll("#industry-stack-chart rect").attr("fill", "transparent");
    d3.selectAll("#industry-stack-chart rect").attr("stroke", "none");
    setSelectedNodeNumId("reset-");
    setToPath({ startNode: [], endNode: [] });
    PubSub.publish("assetsToPathDt", { startNode: [], endNode: [] }); // 传递给关键路径组件空数据，用于清空数据
  }
  function onSubmitToPath() {
    // 向关键路径图传递数据
    PubSub.publish("assetsToPathDt", toPath);
  }

  return (
    <div id="industry-stack" style={{ width: "100%", height: svgHeight }}>
      <div id="industry-stack-chart" style={{ height: svgHeight }}></div>
      <div id="stackControl" style={{ height: svgHeight }}>
        <Button onClick={onClearSelection} type="dashed" size="small">
          清空
        </Button>
        <Button
          onClick={onSubmitToPath}
          type="dashed"
          size="small"
          icon={<NodeIndexOutlined />}
        >
          路径
        </Button>
      </div>
    </div>
  );
}
