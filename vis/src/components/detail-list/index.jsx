import * as d3 from "d3";
import "./index.css";
import { table } from "@observablehq/inputs";
import { useEffect, useState } from "react";
import { html } from "htl";

export default function DetailList({ w, h, divname }) {
  const [data, setData] = useState([]);

  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  useEffect(() => {
    let data = [
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 4,
        id: "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
        name: "9ace6aae20",
        type: "Cert",
        industry: " ",
        isCore: true,
        r_cert_chain: 8,
        r_cert: 12,
        r_whois_name: 22,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 1,
        id: "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
        name: "34a6231f10.com",
        type: "Domain",
        industry: "ABCE",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 25,
        r_whois_email: 2,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
      {
        numId: 3,
        id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
        name: "5.180.xxx.xxx",
        type: "IP",
        industry: " ",
        isCore: true,
        r_cert_chain: 2,
        r_cert: 2,
        r_whois_name: 2,
        r_whois_phone: 32,
        r_whois_email: 12,
        r_cname: 22,
        r_request_jump: 42,
        r_subdomain: 12,
        r_dns_a: 2,
        r_cidr: 1,
        r_asn: 2,
      },
    ];
    setData(data);
  }, []);
  useEffect(() => {
    const dimensions = {
      width: svgWidth,
      height: svgHeight,
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    };
    const boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;
    const boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // d3.selectAll("div#detail-list g").remove();
    d3.selectAll(`div#${divname} g`).remove();
    const g = d3
      .select(`#${divname}`)
      .append("g")
      .attr("width", boundedWidth)
      .attr("height", boundedHeight)
      .attr("viewBox", [0, 0, boundedWidth, boundedHeight])
      .style("max-width", "100%")
      .style("background", "#aaa")
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );

    g.append(() =>
      table(data, {
        // rows: Infinity,
        required: false,
        format: {
          r_cert_chain: sparkbar(d3.max(data, (d) => d.r_cert_chain)),
          r_cert: sparkbar(d3.max(data, (d) => d.r_cert)),
          r_whois_name: sparkbar(d3.max(data, (d) => d.r_whois_name)),
          r_whois_phone: sparkbar(d3.max(data, (d) => d.r_whois_phone)),
          r_whois_email: sparkbar(d3.max(data, (d) => d.r_whois_email)),
          r_cname: sparkbar(d3.max(data, (d) => d.r_cname)),
          r_request_jump: sparkbar(d3.max(data, (d) => d.r_request_jump)),
          r_subdomain: sparkbar(d3.max(data, (d) => d.r_subdomain)),
          r_dns_a: sparkbar(d3.max(data, (d) => d.r_dns_a)),
          r_cidr: sparkbar(d3.max(data, (d) => d.r_cidr)),
          r_asn: sparkbar(d3.max(data, (d) => d.r_asn)),
        },
        // width: {
        //   r_cert_chain: 120,
        //   r_cert: 120,
        //   r_whois_name: 120,
        //   r_whois_phone: 120,
        //   r_whois_email: 120,
        //   r_cname: 120,
        //   r_request_jump: 120,
        //   r_subdomain: 120,
        //   r_dns_a: 120,
        //   r_cidr: 120,
        //   r_asn: 120,
        // },
        // layout: "fixed",
        maxWidth: svgWidth,
        maxHeight: svgHeight,
      })
    );
  }, [data, svgWidth, svgHeight]);

  function sparkbar(max) {
    let colorScale = d3.scaleSequential([0, max], d3.interpolateBlues);
    return (x) => html`<div
      style="
      background: ${colorScale(x)};
      width: ${(100 * x) / max}%;
      float: right;
      padding-right: 3px;
      box-sizing: border-box;
      overflow: visible;
      display: flex;
      justify-content: end;"
    >
      ${x.toLocaleString("en")}
    </div>`;
  }

  // return <div style={{ width: "100%", height: "100%" }}></div>;
  return <></>;
}
