import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PubSub from "pubsub-js";
import "./index.css";

export default function IndustryStackChart({ w, h }) {
  const [data, setData] = useState([]);
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [dataParam, setDataParam] = useState([]);
  const [selectedNodeNumId, setSelectedNodeNumId] = useState("");

  PubSub.unsubscribe("industryStackDt");
  PubSub.subscribe("industryStackDt", (msg, dataparam) => {
    setDataParam(dataparam);
  });
  useEffect(() => {
    let dt = [
      {
        id: "IP_A",
        numId: 0,
        ICIndustry: [
          { industry: "AB", number: 2 },
          { industry: "AED", number: 18 },
          { industry: "BCD", number: 1 },
        ],
        group: 1,
      },
      {
        id: "IP_B",
        numId: 0,
        ICIndustry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "DE", number: 1 },
        ],
        group: 1,
      },
      {
        id: "Cert_C",
        numId: 0,
        ICIndustry: [
          { industry: "B", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "BCD", number: 1 },
        ],
        group: 1,
      },
      {
        id: "IP_D",
        numId: 0,
        ICIndustry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "H", number: 1 },
        ],
        group: 1,
      },
      {
        id: "Cert_E",
        numId: 0,
        ICIndustry: [
          { industry: "AB", number: 2 },
          { industry: "AE", number: 8 },
          { industry: "BCE", number: 1 },
        ],
        group: 1,
      },
    ];
    setData(dt);
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
    setSvgHeight(h);
  }, [h]);

  useEffect(() => {
    drawChart();
  }, [svgWidth, svgHeight, data]);

  function drawChart() {
    if (data.length === 0) return;

    d3.select("#industry-stack svg").remove();
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

    let gHeight = 30,
      circleR = 5,
      levelNumber = 3;
    let gWidth = svgWidth / levelNumber;
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
      .select("#industry-stack")
      .append("svg")
      .attr("width", svgWidth)
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
        // 单击选择，双击取消
        setSelectedNodeNumId("set-" + d.id);
      })
      .on("dblclick", function (event, d) {
        setSelectedNodeNumId("reset-" + d.id);
      });

    g.append("rect")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", -40)
      .attr("y", -57)
      .attr("class", "bgRect")
      .attr("fill", "transparent")
      .attr("stroke", "none")
      .attr("width", (gHeight + circleR * 2) * 2 + 10)
      .attr("height", (gHeight + circleR * 2) * 2 + 5)
      .on("click", function (event, d) {
        // 单击选择，双击取消
        d3.select(this).attr("fill", "#aaa");
      })
      .on("dblclick", function (event, d) {
        d3.select(this).attr("fill", "transparent");
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
      .select("#industry-stack")
      .append("div")
      .attr("class", "toolTip");

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
              // if (currInduYIndex.length !== 0 && currInduYIndex.includes(j))
              //   return industryColor[j];
              // return "#bbb";
              return "none";
            })
            .attr("stroke-width", 0.5)
            .on("mouseover", (event, d) => {
              let htmlText = `产业 <strong>${industryType[j]}</strong>`;
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

  return (
    <div
      id="industry-stack"
      style={{
        width: svgWidth,
        height: svgHeight,
        overflow: "auto",
        background: "white",
      }}
    ></div>
  );
}
