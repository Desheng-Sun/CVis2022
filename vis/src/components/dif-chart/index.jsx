import * as d3 from "d3";
import { curveCatmullRomOpen } from "d3";
import { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import { getDifChartSds } from "../../apis/api.js";
import "./index.css";

export default function DifChart({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [data, setData] = useState([]);
  const [selectICLinks, setSelectICLinks] = useState("");

  const [linksInfo, setLinksInfo] = useState({ nodes: [], links: [] });

  // 随主图数据更新而更新视图
  PubSub.unsubscribe("updateDifChart");
  PubSub.subscribe("updateDifChart", (msg, linksInfo) => {
    setLinksInfo(linksInfo);
  });

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h * 0.85);
  }, [h]);
  useEffect(() => {
    if (data.length !== 0) {
      draw();
    }
  }, [data]);

  useEffect(() => {
    getDifChartSds(linksInfo).then((res) => {
      console.log("------", res);
      setData(res);
    });
  }, [linksInfo]);

  // 绘制结构图
  function draw() {
    if (JSON.stringify(data) === "[]") return;
    d3.selectAll("#diff-legend svg").remove();
    d3.selectAll("#diff-chart svg").remove();

    


    // let outerData = data[0];
    // let innerData = data[1];
    // let radius = Math.min(svgWidth / 2, svgHeight / 2);
    // let selectICLInksNum = 0;
    // function partition(data) {
    //   return d3.partition().size([2 * Math.PI, radius * radius])(
    //     d3
    //       .hierarchy(data)
    //       .sum((d) => d.value)
    //       .sort((a, b) => b.value - a.value)
    //   );
    // }
    // let ICNodesPad = (Math.PI * 2) / outerData.ICLinksNum / 10;
    // let ICLinksPad = (Math.PI * 2) / outerData.ICLinksNum / 50;
    // let childrenPad = 1 / radius;
    // let childrenLen =
    //   (Math.PI * 2 -
    //     ICNodesPad * outerData.startICNum -
    //     ICLinksPad * (outerData.ICLinksNum + outerData.startICNum)) /
    //   (outerData.ICLinksNum * 3);
    // const root = partition(outerData);
    // let innerRadius = (radius / 10) * 5;
    // let radiusUse = (radius / (10 * outerData.depthmax)) * 4;
    // let industryName = new Set();
    // let d3_category437 = [
    //   0xd3fe14, 0xfec7f8, 0x0b7b3e, 0x0bf0e9, 0xc203c8, 0xfd9b39, 0x888593,
    //   0x906407, 0x98ba7f, 0xfe6794, 0x10b0ff, 0xac7bff, 0xfee7c0, 0x964c63,
    //   0x1da49c, 0x0ad811, 0xbbd9fd, 0xfe6cfe, 0x297192, 0xd1a09c, 0x78579e,
    //   0x81ffad, 0x739400, 0xca6949, 0xd9bf01, 0x646a58, 0xd5097e, 0xbb73a9,
    //   0xccf6e9, 0x9cb4b6, 0xb6a7d4, 0x9e8c62, 0x6e83c8, 0x01af64, 0xa71afd,
    //   0xcfe589, 0xd4ccd1, 0xfd4109, 0xbf8f0e, 0x2f786e, 0x4ed1a5, 0xd8bb7d,
    //   0xa54509, 0x6a9276, 0xa4777a, 0xfc12c9, 0x606f15, 0x3cc4d9, 0xf31c4e,
    //   0x73616f, 0xf097c6, 0xfc8772, 0x92a6fe, 0x875b44, 0x699ab3, 0x94bc19,
    //   0x7d5bf0, 0xd24dfe, 0xc85b74, 0x68ff57, 0xb62347, 0x994b91, 0x646b8c,
    //   0x977ab4, 0xd694fd, 0xc4d5b5, 0xfdc4bd, 0x1cae05, 0x7bd972, 0xe9700a,
    //   0xd08f5d, 0x8bb9e1, 0xfde945, 0xa29d98, 0x1682fb, 0x9ad9e0, 0xd6cafe,
    //   0x8d8328, 0xb091a7, 0x647579, 0x1f8d11, 0xe7eafd, 0xb9660b, 0xa4a644,
    //   0xfec24c, 0xb1168c, 0x188cc1, 0x7ab297, 0x4468ae, 0xc949a6, 0xd48295,
    //   0xeb6dc2, 0xd5b0cb, 0xff9ffb, 0xfdb082, 0xaf4d44, 0xa759c4, 0xa9e03a,
    //   0x0d906b, 0x9ee3bd, 0x5b8846, 0x0d8995, 0xf25c58, 0x70ae4f, 0x847f74,
    //   0x9094bb, 0xffe2f1, 0xa67149, 0x936c8e, 0xd04907, 0xc3b8a6, 0xcef8c4,
    //   0x7a9293, 0xfda2ab, 0x2ef6c5, 0x807242, 0xcb94cc, 0xb6bdd0, 0xb5c75d,
    //   0xfde189, 0xb7ff80, 0xfa2d8e, 0x839a5f, 0x28c2b5, 0xe5e9e1, 0xbc79d8,
    //   0x7ed8fe, 0x9f20c3, 0x4f7a5b, 0xf511fd, 0x09c959, 0xbcd0ce, 0x8685fd,
    //   0x98fcff, 0xafbff9, 0x6d69b4, 0x5f99fd, 0xaaa87e, 0xb59dfb, 0x5d809d,
    //   0xd9a742, 0xac5c86, 0x9468d5, 0xa4a2b2, 0xb1376e, 0xd43f3d, 0x05a9d1,
    //   0xc38375, 0x24b58e, 0x6eabaf, 0x66bf7f, 0x92cbbb, 0xddb1ee, 0x1be895,
    //   0xc7ecf9, 0xa6baa6, 0x8045cd, 0x5f70f1, 0xa9d796, 0xce62cb, 0x0e954d,
    //   0xa97d2f, 0xfcb8d3, 0x9bfee3, 0x4e8d84, 0xfc6d3f, 0x7b9fd4, 0x8c6165,
    //   0x72805e, 0xd53762, 0xf00a1b, 0xde5c97, 0x8ea28b, 0xfccd95, 0xba9c57,
    //   0xb79a82, 0x7c5a82, 0x7d7ca4, 0x958ad6, 0xcd8126, 0xbdb0b7, 0x10e0f8,
    //   0xdccc69, 0xd6de0f, 0x616d3d, 0x985a25, 0x30c7fd, 0x0aeb65, 0xe3cdb4,
    //   0xbd1bee, 0xad665d, 0xd77070, 0x8ea5b8, 0x5b5ad0, 0x76655e, 0x598100,
    //   0x86757e, 0x5ea068, 0xa590b8, 0xc1a707, 0x85c0cd, 0xe2cde9, 0xdcd79c,
    //   0xd8a882, 0xb256f9, 0xb13323, 0x519b3b, 0xdd80de, 0xf1884b, 0x74b2fe,
    //   0xa0acd2, 0xd199b0, 0xf68392, 0x8ccaa0, 0x64d6cb, 0xe0f86a, 0x42707a,
    //   0x75671b, 0x796e87, 0x6d8075, 0x9b8a8d, 0xf04c71, 0x61bd29, 0xbcc18f,
    //   0xfecd0f, 0x1e7ac9, 0x927261, 0xdc27cf, 0x979605, 0xec9c88, 0x8c48a3,
    //   0x676769, 0x546e64, 0x8f63a2, 0xb35b2d, 0x7b8ca2, 0xb87188, 0x4a9bda,
    //   0xeb7dab, 0xf6a602, 0xcab3fe, 0xddb8bb, 0x107959, 0x885973, 0x5e858e,
    //   0xb15bad, 0xe107a7, 0x2f9dad, 0x4b9e83, 0xb992dc, 0x6bb0cb, 0xbdb363,
    //   0xccd6e4, 0xa3ee94, 0x9ef718, 0xfbe1d9, 0xa428a5, 0x93514c, 0x487434,
    //   0xe8f1b6, 0xd00938, 0xfb50e1, 0xfa85e1, 0x7cd40a, 0xf1ade1, 0xb1485d,
    //   0x7f76d6, 0xd186b3, 0x90c25e, 0xb8c813, 0xa8c9de, 0x7d30fe, 0x815f2d,
    //   0x737f3b, 0xc84486, 0x946cfe, 0xe55432, 0xa88674, 0xc17a47, 0xb98b91,
    //   0xfc4bb3, 0xda7f5f, 0xdf920b, 0xb7bbba, 0x99e6d9, 0xa36170, 0xc742d8,
    //   0x947f9d, 0xa37d93, 0x889072, 0x9b924c, 0x23b4bc, 0xe6a25f, 0x86df9c,
    //   0xa7da6c, 0x3fee03, 0xeec9d8, 0xaafdcb, 0x7b9139, 0x92979c, 0x72788a,
    //   0x994cff, 0xc85956, 0x7baa1a, 0xde72fe, 0xc7bad8, 0x85ebfe, 0x6e6089,
    //   0x9b4d31, 0x297a1d, 0x9052c0, 0x5c75a5, 0x698eba, 0xd46222, 0x6da095,
    //   0xb483bb, 0x04d183, 0x9bcdfe, 0x2ffe8c, 0x9d4279, 0xc909aa, 0x826cae,
    //   0x77787c, 0xa96fb7, 0x858f87, 0xfd3b40, 0x7fab7b, 0x9e9edd, 0xbba3be,
    //   0xf8b96c, 0x7be553, 0xc0e1ce, 0x516e88, 0xbe0e5f, 0x757c09, 0x4b8d5f,
    //   0x38b448, 0xdf8780, 0xebb3a0, 0xced759, 0xf0ed7c, 0xe0eef1, 0x0969d2,
    //   0x756446, 0x488ea8, 0x888450, 0x61979c, 0xa37ad6, 0xb48a54, 0x8193e5,
    //   0xdd6d89, 0x8aa29d, 0xc679fe, 0xa4ac12, 0x75bbb3, 0x6ae2c1, 0xc4fda7,
    //   0x606877, 0xb2409d, 0x5874c7, 0xbf492c, 0x4b88cd, 0xe14ec0, 0xb39da2,
    //   0xfb8300, 0xd1b845, 0xc2d083, 0xc3caef, 0x967500, 0xc56399, 0xed5a05,
    //   0xaadff6, 0x6685f4, 0x1da16f, 0xf28bff, 0xc9c9bf, 0xc7e2a9, 0x5bfce4,
    //   0xe0e0bf, 0xe8e2e8, 0xddf2d8, 0x9108f8, 0x932dd2, 0xc03500, 0xaa3fbc,
    //   0x547c79, 0x9f6045, 0x04897b, 0x966f32, 0xd83212, 0x039f27, 0xdf4280,
    //   0xef206e, 0x0095f7, 0xa5890d, 0x9a8f7f, 0xbc839e, 0x88a23b, 0xe55aed,
    //   0x51af9e, 0x5eaf82, 0x9e91fa, 0xf76c79, 0x99a869, 0xd2957d, 0xa2aca6,
    //   0xe3959e, 0xadaefc, 0x5bd14e, 0xdf9ceb, 0xfe8fb1, 0x87ca80, 0xfc986d,
    //   0x2ad3d9, 0xe8a8bb, 0xa7c79c, 0xa5c7cc, 0x7befb7, 0xb7e2e0, 0x85f57b,
    //   0xf5d95b, 0xdbdbff, 0xfddcff, 0x6e56bb, 0x226fa8, 0x5b659c, 0x58a10f,
    //   0xe46c52, 0x62abe2, 0xc4aa77, 0xb60e74, 0x087983, 0xa95703, 0x2a6efb,
    //   0x427d92,
    // ].map(d3_rgbString);
    // function d3_rgbString(value) {
    //   return d3.rgb(value >> 16, (value >> 8) & 0xff, value & 0xff);
    // }
    // for (let i of innerData["industryInLinks"]) {
    //   industryName.add(i["industry"]);
    // }
    // for (let i of innerData["industryInNodes"]) {
    //   industryName.add(i["industry"]);
    // }
    // industryName = Array.from(industryName);
    // industryName.sort();
    // industryName.sort((a, b) => a.length - b.length);
    // let color = d3.scaleOrdinal().domain(industryName).range(d3_category437);
    // let svg = d3
    //   .select("#diff-chart")
    //   .append("svg")
    //   .attr("width", svgWidth)
    //   .attr("height", svgHeight);

    // svg
    //   .attr("viewBox", `${-radius} ${-radius} ${svgWidth} ${svgWidth}`)
    //   .style("max-width", `${svgWidth}px`)
    //   .style("font", "12px sans-serif");

    // let diffCHartWrapper = svg.append("g").attr("transform", "translate(0, 0)");
    // // 绘制图例-------------------------------------------------------------------------------------
    // let totalLetter = industryName.reduce(function (prev, curr) {
    //   // 所有字符出现得总次数
    //   return prev + curr.length;
    // }, 0);
    // let diffLegendSvg = d3
    //   .select("#diff-legend")
    //   .append("svg")
    //   .attr("width", svgWidth)
    //   .attr("height", "25px");
    // diffLegendSvg
    //   .append("g")
    //   .attr("class", "diff-legend")
    //   .selectAll("rect")
    //   .data(industryName)
    //   .join("rect")
    //   .attr("fill", (d) => color(d))
    //   .attr("x", (d, i) => {
    //     return ((svgWidth - 10) / industryName.length) * i;
    //     // let beforeLatter = 0;
    //     // for (let j = 0; j < i; j++) beforeLatter += industryName[j].length;
    //     // return ((svgWidth - 10) / totalLetter) * beforeLatter + 5;
    //   })
    //   .attr("y", 2)
    //   .attr("height", 20)
    //   .attr("width", (svgWidth - 10) / industryName.length);
    // diffLegendSvg
    //   .append("g")
    //   .selectAll("text")
    //   .data(industryName)
    //   .join("text")
    //   .attr("class", "legend-text")
    //   .attr("width", (d, i) => ((svgWidth - 10) / totalLetter) * d.length)
    //   .attr("x", (d, i) => {
    //     return ((svgWidth - 10) / industryName.length) * (i + 0.5);
    //     // let beforeLatter = 0;
    //     // for (let j = 0; j < i; j++) beforeLatter += industryName[j].length;
    //     // return (
    //     //   ((svgWidth - 10) / totalLetter) * (beforeLatter + d.length / 2) + 5
    //     // );
    //   })
    //   .attr("y", 15)
    //   .text((d) => {
    //     return d;
    //   });

    // // 绘制外部视图--------------------------------------------------------------------------------------
    // let arc = d3
    //   .arc()
    //   .startAngle((d) => {
    //     if (d.depth > 2) {
    //       let startAngle =
    //         (d.data.nowICIndex - 0.5) * ICNodesPad +
    //         (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad +
    //         childrenPad +
    //         childrenLen * ((d.data.nowICLinksIndex - 1) * 3 + d.data.index - 1);
    //       return startAngle;
    //     } else if (d.depth === 1) {
    //       let startAngle =
    //         (d.data.startICNum + 0.5) * ICNodesPad +
    //         (d.data.startICLinkNum + d.data.startICNum) * ICLinksPad +
    //         d.data.startICLinkNum * 3 * childrenLen;
    //       return startAngle;
    //     }
    //   })
    //   .endAngle((d) => {
    //     if (d.depth > 2) {
    //       let endAngle =
    //         (d.data.nowICIndex - 0.5) * ICNodesPad +
    //         (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad -
    //         childrenPad +
    //         childrenLen * ((d.data.nowICLinksIndex - 1) * 3 + d.data.index);
    //       return endAngle;
    //     } else if (d.depth === 1) {
    //       let endAngle =
    //         (d.data.startICNum + 0.5) * ICNodesPad +
    //         (d.data.startICLinkNum +
    //           d.data.children.length +
    //           d.data.startICNum +
    //           2) *
    //           ICLinksPad +
    //         (d.data.startICLinkNum + d.data.children.length) * 3 * childrenLen;
    //       return endAngle;
    //     }
    //   })
    //   .cornerRadius(5)
    //   .innerRadius((d) => {
    //     if (d.depth === 1) {
    //       return (innerRadius * 9) / 10;
    //     } else if (d.depth > 2) {
    //       return (
    //         (innerRadius * 19) / 20 +
    //         1 +
    //         radiusUse *
    //           (root.data.depthmax / d.data.childrenLen) *
    //           (d.depth - 3)
    //       );
    //     }
    //   })
    //   .outerRadius((d) => {
    //     if (d.depth === 1) {
    //       return radiusUse * root.data.depthmax + innerRadius;
    //     } else if (d.depth > 2) {
    //       return (
    //         radiusUse *
    //           (root.data.depthmax / d.data.childrenLen) *
    //           (d.depth - 2) +
    //         (innerRadius * 19) / 20 -
    //         1
    //       );
    //     }
    //   });

    // let plainArc = diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(root.descendants().filter((d) => d.depth !== 0))
    //   .join("path")
    //   .attr("fill", "#ffffff")
    //   // .attr("fill", d => {
    //   //   if (d.depth < 2) {
    //   //     return "#ffffff"
    //   //   }
    //   //   return color(d.data.name)
    //   // })
    //   .attr("stroke", "black")
    //   .attr("d", arc)
    //   .on("click", function (event, d, i) {
    //     selectICLInksNum = d.data.nowICLinksIndex;
    //   });

    // let arc2 = d3
    //   .arc()
    //   .startAngle((d) => {
    //     let startAngle =
    //       (d.data.nowICIndex - 0.5) * ICNodesPad +
    //       (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad +
    //       childrenPad +
    //       childrenLen * ((d.data.nowICLinksIndex - 1) * 3 + d.data.index - 1);
    //     return startAngle;
    //   })
    //   .endAngle((d) => {
    //     let endAngle =
    //       (d.data.nowICIndex - 0.5) * ICNodesPad +
    //       (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad -
    //       childrenPad +
    //       childrenLen *
    //         ((d.data.nowICLinksIndex - 1) * 3 + d.data.index - 1 + d.data.prop);
    //     return endAngle;
    //   })
    //   .cornerRadius(5)
    //   .innerRadius((d) => {
    //     return (
    //       (innerRadius * 19) / 20 +
    //       1 +
    //       radiusUse * (root.data.depthmax / d.data.childrenLen) * (d.depth - 3)
    //     );
    //   })
    //   .outerRadius((d) => {
    //     return (
    //       radiusUse *
    //         (root.data.depthmax / d.data.childrenLen) *
    //         (d.depth - 2) +
    //       (innerRadius * 19) / 20 -
    //       1
    //     );
    //   });

    // let colorArcs = diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(root.descendants().filter((d) => d.depth > 2 && d.data.prop > 0))
    //   .join("path")
    //   .attr("fill", (d) => color(d.data.name))
    //   .attr("d", arc2)
    //   .on("click", function (event, d, i) {
    //     selectICLInksNum = d.data.nowICLinksIndex;
    //   });

    // svg
    //   .append("g")
    //   .selectAll("text")
    //   .data(
    //     root.descendants().filter((d) => {
    //       return d.depth > 0;
    //     })
    //   )
    //   .join("text")
    //   .attr("class", "data-text")
    //   .attr("transform", (d) => {
    //     let x, y;
    //     if (d.depth === 1) {
    //       x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    //       y = (innerRadius * 9) / 10 - 6;
    //       if (x >= 90 && x <= 270) {
    //         y = y + 8;
    //       }
    //     } else if (d.depth === 2) {
    //       x =
    //         (((d.data.nowICNum - 0.5) * ICNodesPad +
    //           (d.data.nowICLinksNum + d.data.nowICNum - 1) * ICLinksPad +
    //           childrenLen * ((d.data.nowICLinksNum - 1) * 3 + 1.5)) *
    //           180) /
    //         Math.PI;
    //       y = innerRadius + radiusUse * root.data.depthmax + 8;
    //       if (x < 90 || x > 270) {
    //         y = y - 5;
    //       }
    //     } else {
    //       x =
    //         (((d.data.nowICIndex - 0.5) * ICNodesPad +
    //           (d.data.nowICLinksIndex + d.data.nowICIndex - 1) * ICLinksPad +
    //           childrenLen *
    //             ((d.data.nowICLinksIndex - 1) * 3 + d.data.index - 0.5)) *
    //           180) /
    //         Math.PI;
    //       y =
    //         (innerRadius * 19) / 20 +
    //         radiusUse *
    //           (root.data.depthmax / d.data.childrenLen) *
    //           (d.depth - 2.5);
    //       if (x >= 90 && x <= 270) {
    //         y = y + 2;
    //       } else {
    //         y = y - 2;
    //       }
    //     }
    //     return `rotate(${x - 90}) translate(${y},${0}) rotate(${
    //       x < 90 || x > 270 ? 90 : 270
    //     })`;
    //   })
    //   .text((d) => {
    //     if (d.depth <= 2) {
    //       return d.data.name;
    //     }
    //     return d.data.num;
    //     // return d.data.num !== 0 ? d.data.num : "";
    //   })
    //   .attr("z-index", 999);

    // // 绘制中间的玫瑰图-------------------------------------------------------------------------------------------------------------
    // let maxLength = Math.log(innerData["largestLength"] + 1);
    // let innerDataPad =
    //   (Math.PI * 2) /
    //   (innerData["industryInLinks"].length +
    //     innerData["industryInNodes"].length -
    //     2) /
    //   50;
    // let innerDataILPad =
    //   (Math.PI * 2) /
    //   (innerData["industryInLinks"].length +
    //     innerData["industryInNodes"].length -
    //     2) /
    //   2;
    // let innerDataAngle =
    //   (Math.PI * 2 -
    //     innerDataILPad * 2 -
    //     innerDataPad *
    //       (innerData["industryInLinks"].length +
    //         innerData["industryInNodes"].length -
    //         2)) /
    //   (innerData["industryInLinks"].length +
    //     innerData["industryInNodes"].length);
    // innerRadius = (innerRadius * 4) / 5;
    // let arc3 = d3
    //   .arc()
    //   .startAngle((d, i) => {
    //     if (i === 0) {
    //       return 0;
    //     }
    //     return (
    //       innerDataILPad +
    //       (innerDataPad + innerDataAngle) *
    //         innerData["industryInLinks"].length -
    //       innerDataPad
    //     );
    //   })
    //   .endAngle((d, i) => {
    //     if (i === 0) {
    //       return (
    //         innerDataILPad +
    //         (innerDataPad + innerDataAngle) *
    //           innerData["industryInLinks"].length -
    //         innerDataPad
    //       );
    //     }
    //     return Math.PI * 2;
    //   })
    //   .innerRadius(0)
    //   .outerRadius(innerRadius + innerRadius / 10);

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(["1", "2"])
    //   .enter()
    //   .append("path")
    //   .attr("d", arc3)
    //   .attr("fill", "#ffffff")
    //   .attr("stroke", "black");

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("text")
    //   .data(["In", "Not In"])
    //   .join("text")
    //   .attr("class", "diff-left-right-text")
    //   .attr("transform", (d, i) => {
    //     let x =
    //       ((innerDataILPad +
    //         (innerDataPad + innerDataAngle) *
    //           innerData["industryInLinks"].length -
    //         innerDataPad) *
    //         90) /
    //         Math.PI +
    //       i * 180;
    //     let y = innerRadius + innerRadius / 10 - 5;
    //     return `rotate(${x - 90}) translate(${y},${0}) rotate(${
    //       x < 90 || x > 270 ? 90 : 270
    //     })`;
    //   })
    //   .text((d) => {
    //     return d;
    //   })
    //   .attr("fill", "purple");

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("text")
    //   .data(innerData["industryInLinks"])
    //   .join("text")
    //   .attr("class", "data-text")
    //   .attr("transform", (d, i) => {
    //     let x =
    //       ((innerDataILPad / 2 +
    //         (i + 0.5) * innerDataAngle +
    //         i * innerDataPad) *
    //         180) /
    //       Math.PI;
    //     let y = (innerRadius * Math.log(d.number + 1)) / maxLength + 2;
    //     if (x >= 90 && x <= 270) {
    //       y = y + 8;
    //     }
    //     return `rotate(${x - 90}) translate(${y},${0}) rotate(${
    //       x < 90 || x > 270 ? 90 : 270
    //     })`;
    //   })
    //   .text((d) => {
    //     return d.number;
    //   })
    //   .attr("fill", "red");

    // let arc4 = d3
    //   .arc()
    //   .startAngle((d, i) => {
    //     return innerDataILPad / 2 + i * innerDataAngle + i * innerDataPad;
    //   })
    //   .endAngle((d, i) => {
    //     return innerDataILPad / 2 + (i + 1) * innerDataAngle + i * innerDataPad;
    //   })
    //   .innerRadius(0)
    //   .outerRadius((d) => {
    //     return (innerRadius * Math.log(d.number + 1)) / maxLength;
    //   });

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(innerData["industryInLinks"])
    //   .enter()
    //   .append("path")
    //   .attr("d", arc4)
    //   .attr("fill", (d) => color(d.industry));

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(innerData["industryInLinks"])
    //   .enter()
    //   .append("text")
    //   .attr("class", "data-text")
    //   .attr("transform", (d, i) => {
    //     let x =
    //       ((innerDataILPad / 2 +
    //         (i + 0.5) * innerDataAngle +
    //         i * innerDataPad) *
    //         180) /
    //       Math.PI;
    //     let y = (innerRadius * Math.log(d.number + 1)) / maxLength + 2;
    //     if (x >= 90 && x <= 270) {
    //       y = y + 8;
    //     }
    //     return `rotate(${x - 90}) translate(${y},${0}) rotate(${
    //       x < 90 || x > 270 ? 90 : 270
    //     })`;
    //   })
    //   .text((d) => {
    //     return d.number;
    //   });

    // let arc5 = d3
    //   .arc()
    //   .startAngle((d, i) => {
    //     return (
    //       innerDataILPad * 1.5 +
    //       (i + innerData["industryInLinks"].length) * innerDataAngle +
    //       (i + innerData["industryInLinks"].length - 1) * innerDataPad
    //     );
    //   })
    //   .endAngle((d, i) => {
    //     return (
    //       innerDataILPad * 1.5 +
    //       (i + 1 + innerData["industryInLinks"].length) * innerDataAngle +
    //       (i + innerData["industryInLinks"].length - 1) * innerDataPad
    //     );
    //   })
    //   .innerRadius(0)
    //   .outerRadius((d) => {
    //     return (innerRadius * Math.log(d.number + 1)) / maxLength;
    //   });

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(innerData["industryInNodes"])
    //   .enter()
    //   .append("path")
    //   .attr("d", arc5)
    //   .attr("fill", (d) => color(d.industry));

    // diffCHartWrapper
    //   .append("g")
    //   .selectAll("path")
    //   .data(innerData["industryInNodes"])
    //   .enter()
    //   .append("text")
    //   .attr("class", "inner-radar-text")
    //   .attr("transform", (d, i) => {
    //     let x =
    //       ((innerDataILPad * 1.5 +
    //         (i + 0.5 + innerData["industryInLinks"].length) * innerDataAngle +
    //         (i + innerData["industryInLinks"].length - 1) * innerDataPad) *
    //         180) /
    //       Math.PI;
    //     let y = (innerRadius * Math.log(d.number + 1)) / maxLength + 2;
    //     if (x >= 90 && x <= 270) {
    //       y = y + 8;
    //     }
    //     return `rotate(${x - 90}) translate(${y},${0}) rotate(${
    //       x < 90 || x > 270 ? 90 : 270
    //     })`;
    //   })
    //   .text((d) => {
    //     return d.number;
    //   });
    // let nowNum = 0;
    // for (let i of outerData["children"]) {
    //   for (let j of i["children"]) {
    //     nowNum += 1;
    //     if (nowNum == selectICLInksNum) {
    //       setSelectICLinks([i["numId"], j["numId"]].toString());
    //     }
    //   }
    // }
  }

  return (
    <div id="difference-chart">
      <div id="diff-legend" style={{ width: "100%", height: "5%" }}></div>
      <div id="diff-chart" style={{ width: "100%", height: "95%" }}></div>
    </div>
  );
}
