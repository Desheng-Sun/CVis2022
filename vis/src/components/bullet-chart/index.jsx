import bullet from "./bullet";
import "./index.css";
import * as d3 from "d3";

import { getBulletChartData, getBulletChartDataSds } from "../../apis/api";
import { useEffect, useState } from "react";

export default function BulletChart({ w, h, divname }) {
  const [data, setData] = useState({});
  const [dataRange, setDataRange] = useState({ minNum: 0, maxNum: 0 });

  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [divName, setDivName] = useState(divname);

  let nodesLinksInfo = {
    nodes: [
      [
        3,
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        "5.180.xxx.xxx",
        "IP",
        "  ",
      ],
      [
        4,
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
        "9ace6aae20",
        "Cert",
        "  ",
      ],
      [
        1,
        "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
        "34a6231f10.com",
        "Domain",
        "ABCE",
      ],
      [
        2,
        "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
        "5052db3f33.com",
        "Domain",
        "ABCE",
      ],
      [
        7,
        "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
        "d3d0abc4c0.com",
        "Domain",
        "  ",
      ],
      [
        16,
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
        "6f51b90ab3.com",
        "Domain",
        "ABCE",
      ],
      [
        17,
        "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
        "aa63f2ee01.com",
        "Domain",
        "  ",
      ],
      [
        18,
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
        "c6fb2192fe.com",
        "Domain",
        "ABCE",
      ],
      [
        19,
        "ASN_3bc5b0706c3df8182f7784cafa0bd864c4a6d432266863609f1f5c22c47fa04b",
        "AS_3bc5b0706c",
        "ASN",
        "  ",
      ],
      [
        20,
        "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
        "47e5873650.com",
        "Domain",
        "ABCE",
      ],
      [
        21,
        "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
        "e9906a199d.com",
        "Domain",
        "ABCE",
      ],
      [
        22,
        "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
        "71d2570dff.com",
        "Domain",
        "ABCE",
      ],
      [
        23,
        "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
        "52718967cb.com",
        "Domain",
        "ABCE",
      ],
      [
        24,
        "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
        "ca1457f910.com",
        "Domain",
        "ABCE",
      ],
      [
        25,
        "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
        "ed5eca0681.com",
        "Domain",
        "ABCE",
      ],
      [
        34716,
        "Whois_Name_fe5804d81ae6b2bf5c9172b56a1c2536d230fc8a1d2a8bcc869422b6cbadb243",
        "梁xxxxx阳",
        "Whois_Name",
        "  ",
      ],
      [
        7076,
        "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
        "9a485b29b7.com",
        "Domain",
        "ABCE",
      ],
      [
        44,
        "Domain_a3322584eaabc2faa2f1da0873b04b4c9333f2553ef2537f6f2d80410790bd71",
        "a3322584ea.com",
        "Domain",
        "ABCE",
      ],
      [
        7092,
        "Domain_81a6e67db0a1709f448fef17e8e6ccc63c5278ecefcdf57df06212b6efc0cd0c",
        "81a6e67db0.com",
        "Domain",
        "ABCE",
      ],
      [
        56,
        "Domain_b0ba5ff2370e445581d1fdbc22a21a26df636ed4de08d1112a2009f1450918a2",
        "b0ba5ff237.com",
        "Domain",
        "ABCE",
      ],
      [
        72,
        "Domain_412f08821afd3f3db92a652e3b8df2a6e1150d99df96b754aadb0c1bda1d7ea0",
        "412f08821a.com",
        "Domain",
        "ABCE",
      ],
      [
        79,
        "Domain_902ed89bc74e60bb9227ce6c71997e659072458aadc885a788e91358b62cd232",
        "902ed89bc7.com",
        "Domain",
        "ABCE",
      ],
      [
        7004,
        "IP_CIDR_6399042623e54e0439705fde4e655b85e0beef20bc18e9eea628bbe6278f71f8",
        "5.180.xxx.0/24",
        "IP_C",
        "  ",
      ],
      [
        97,
        "Domain_d45bbb54e15e2a270b2536db6a27808dfcf239f7d235d45a50bb6f944d72abb2",
        "d45bbb54e1.com",
        "Domain",
        "ABCE",
      ],
      [
        98,
        "Domain_e703113d2e370845c54cebf0866954300d94a3223b3547901a5c8d5b888ced3c",
        "e703113d2e.com",
        "Domain",
        "ABCE",
      ],
      [
        100,
        "Cert_a91593a45b6eceaae2a0478cc243543184d325720bc3f19f91982450b6af57e2",
        "a91593a45b",
        "Cert",
        "  ",
      ],
      [
        34798,
        "Whois_Name_b0a2f98c3906da568052f7116140b5a52b56cabc88c885991797bc47ab12510b",
        "吴xxxxx江",
        "Whois_Name",
        "  ",
      ],
      [
        7028,
        "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
        "4b4db6bc99.com",
        "Domain",
        "ABCE",
      ],
      [
        7030,
        "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
        "88b759b8cb.com",
        "Domain",
        "ABCE",
      ],
    ],
    links: [
      ["r_cert", 1, 4, 2, true],
      ["r_cert", 2, 4, 2, true],
      ["r_cert", 7, 4, 2, true],
      ["r_cert", 16, 4, 2, true],
      ["r_cert", 17, 4, 2, true],
      ["r_cert", 18, 4, 2, true],
      ["r_cert", 20, 4, 2, true],
      ["r_cert", 21, 4, 2, true],
      ["r_cert", 22, 4, 2, true],
      ["r_cert", 23, 4, 2, true],
      ["r_cert", 24, 4, 2, true],
      ["r_cert", 25, 4, 2, true],
      ["r_cert", 7030, 4, 2, true],
      ["r_cert", 7076, 4, 2, true],
      ["r_cert", 44, 4, 1, true],
      ["r_cert", 56, 4, 1, true],
      ["r_cert", 72, 4, 1, true],
      ["r_cert", 79, 4, 1, true],
      ["r_cert", 97, 4, 1, true],
      ["r_cert", 98, 4, 1, true],
      ["r_asn", 3, 19, -1, true],
      ["r_cidr", 3, 7004, -1, true],
      ["r_cert_chain", 4, 100, -1, true],
      ["r_dns_a", 1, 3, 3, true],
      ["r_dns_a", 2, 3, 3, true],
      ["r_dns_a", 7, 3, 3, true],
      ["r_dns_a", 16, 3, 3, true],
      ["r_dns_a", 17, 3, 3, true],
      ["r_dns_a", 18, 3, 3, true],
      ["r_dns_a", 20, 3, 3, true],
      ["r_dns_a", 21, 3, 3, true],
      ["r_dns_a", 22, 3, 3, true],
      ["r_dns_a", 23, 3, 3, true],
      ["r_dns_a", 24, 3, 3, true],
      ["r_dns_a", 25, 3, 3, true],
      ["r_dns_a", 7030, 3, 3, true],
      ["r_dns_a", 7076, 3, 3, true],
      ["r_dns_a", 7092, 3, 3, true],
      ["r_dns_a", 7028, 3, 3, true],
      ["r_subdomain", 1, 2, 2, true],
      ["r_subdomain", 7, 17, 2, true],
      ["r_subdomain", 16, 18, 2, true],
      ["r_subdomain", 18, 16, 2, true],
      ["r_subdomain", 20, 44, 2, true],
      ["r_subdomain", 21, 56, 2, true],
      ["r_subdomain", 22, 72, 2, true],
      ["r_subdomain", 23, 79, 2, true],
      ["r_subdomain", 24, 97, 2, true],
      ["r_subdomain", 25, 98, 2, true],
      ["r_subdomain", 7028, 7076, 2, true],
      ["r_subdomain", 7030, 7092, 2, true],
      ["r_whois_name", 7028, 34798, 2, true],
      ["r_whois_name", 7030, 34716, 2, true],
    ],
  };

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  useEffect(() => {
    getBulletChartData(nodesLinksInfo).then((res) => {
      console.log(res);
      // 计算数据中measures和markers共同的最大、最小值 用于画图比例尺映射
      let allNumInData = [];
      res.forEach((item, index) => {
        allNumInData.push(...item["measures"], ...item["markers"]);
      });

      // 设置数据 + 记录最大、最小值
      setData(res);
      setDataRange({
        minNum: Math.min(...allNumInData),
        maxNum: Math.max(...allNumInData),
      });
    });
  }, []);

  useEffect(() => {
    const dimensions = {
      width: svgWidth,
      height: svgHeight,
      margin: { top: 10, right: 5, bottom: 20, left: 5 },
    };
    const boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;
    const boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    let chart = bullet()
      .minNum(dataRange["minNum"])
      .maxNum(dataRange["maxNum"])
      .height(boundedHeight)
      .width((boundedWidth / data.length) * 0.9);

    // d3.selectAll("div#bullet-chart svg").remove();
    d3.selectAll(`div#${divname} svg`).remove();

    const svg = d3
      .select(`#${divname}`)
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", [0, 0, dimensions.width, dimensions.height])
      .style("max-width", "100%")
      .style("background", "#fff");

    const bounds = svg
      .append("g")
      .attr("width", boundedWidth)
      .attr("height", boundedHeight)
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );

    bounds
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bullet")
      .attr("width", boundedWidth / data.length)
      .attr("height", boundedHeight)
      .style(
        "transform",
        (d, i) => `translate(${(boundedWidth / data.length) * i}px,0px)`
      )
      .call(chart);

    // 添加文字标识类型
    const title = bounds.append("g").style("text-anchor", "start");
    title
      .selectAll(null)
      .data(data)
      .join("text")
      .attr("class", "title")
      .attr(
        "transform",
        (d, i) =>
          `translate(${(boundedWidth / data.length) * (i + 0.3)},${
            boundedHeight + 0.2 * dimensions.margin.bottom
          }) rotate(60)`
      )
      .text((d) => d.title);
  }, [data, dataRange, svgHeight, svgWidth]);

  // return <div style={{ width: "100%", height: "100%" }}></div>;
  return <></>;
}
