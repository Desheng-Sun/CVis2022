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
    setSvgHeight(h);
  }, [h]);

  useEffect(() => {
    if (data.length !== 0) {
      draw();
    }
  }, [svgHeight, data]);

  useEffect(() => {
    // getDifChartSds(linksInfo).then((res) => {
    //   console.log("------", res);
    //   // setData(res);
    // });

    let dt = [
      [
        {
          industry: "B",
          number: 7,
          index: 0,
          height: 1,
        },
        {
          industry: "B",
          number: 109,
          index: 1,
          height: 1,
        },
        {
          industry: "A",
          number: 4,
          index: 0,
          height: 2,
        },
        {
          industry: "A",
          number: 0,
          index: 1,
          height: 2,
        },
        {
          industry: "G",
          number: 1,
          index: 0,
          height: 3,
        },
        {
          industry: "G",
          number: 0,
          index: 1,
          height: 3,
        },
        {
          industry: "BC",
          number: 0,
          index: 0,
          height: 4,
        },
        {
          industry: "BC",
          number: 1,
          index: 1,
          height: 4,
        },
        {
          industry: "AB",
          number: 1,
          index: 0,
          height: 5,
        },
        {
          industry: "AB",
          number: 0,
          index: 1,
          height: 5,
        },
      ],
      [
        {
          IC: {
            numId: "20084--20066",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 1,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 1,
              height: 1,
            },
            {
              industry: "B",
              number: 3,
              startICLinkNum: 1,
              height: 1,
            },
            {
              industry: "B",
              number: 3,
              startICLinkNum: 1,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 1,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 1,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 1,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--529329",
            name: "5fce75b70c--104.21.xxx.xxx",
            startICLinkNum: 2,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 2,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 2,
              height: 1,
            },
            {
              industry: "B",
              number: 5,
              startICLinkNum: 2,
              height: 1,
            },
            {
              industry: "A",
              number: 0,
              startICLinkNum: 2,
              height: 2,
            },
            {
              industry: "A",
              number: 0,
              startICLinkNum: 2,
              height: 2,
            },
            {
              industry: "A",
              number: 4,
              startICLinkNum: 2,
              height: 2,
            },
            {
              industry: "G",
              number: 0,
              startICLinkNum: 2,
              height: 3,
            },
            {
              industry: "G",
              number: 0,
              startICLinkNum: 2,
              height: 3,
            },
            {
              industry: "G",
              number: 1,
              startICLinkNum: 2,
              height: 3,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 2,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 2,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 2,
              height: 4,
            },
            {
              industry: "AB",
              number: 0,
              startICLinkNum: 2,
              height: 5,
            },
            {
              industry: "AB",
              number: 0,
              startICLinkNum: 2,
              height: 5,
            },
            {
              industry: "AB",
              number: 1,
              startICLinkNum: 2,
              height: 5,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602133",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 3,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 3,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 3,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 3,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 3,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 3,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 3,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602148",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 4,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 4,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 4,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 4,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 4,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 4,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 4,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602317",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 5,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 5,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 5,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 5,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 5,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 5,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 5,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602367",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 6,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 6,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 6,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 6,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 6,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 6,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 6,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602420",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 7,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 7,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 7,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 7,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 7,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 7,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 7,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602467",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 8,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 8,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 8,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 8,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 8,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 8,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 8,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602562",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 9,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 9,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 9,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 9,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 9,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 9,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 9,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602592",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 10,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 10,
              height: 1,
            },
            {
              industry: "B",
              number: 4,
              startICLinkNum: 10,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 10,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 10,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 10,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 10,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602620",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 11,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 11,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 11,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 11,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 11,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 11,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 11,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602670",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 12,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 12,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 12,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 12,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 12,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 12,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 12,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602740",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 13,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 13,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 13,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 13,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 13,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 13,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 13,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602756",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 14,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 14,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 14,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 14,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 14,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 14,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 14,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602767",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 15,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 15,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 15,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 15,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 15,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 15,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 15,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602823",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 16,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 16,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 16,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 16,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 16,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 16,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 16,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602887",
            name: "5fce75b70c--194.33.xxx.xxx",
            startICLinkNum: 17,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 17,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 17,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 17,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 17,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 17,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 17,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602914",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 18,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 18,
              height: 1,
            },
            {
              industry: "B",
              number: 4,
              startICLinkNum: 18,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 18,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 18,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 18,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 18,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602935",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 19,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 19,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 19,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 19,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 19,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 19,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 19,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602976",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 20,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 20,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 20,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 20,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 20,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 20,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 20,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602991",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 21,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 21,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 21,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 21,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 21,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 21,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 21,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--602996",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 22,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 22,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 22,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 22,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 22,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 22,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 22,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603055",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 23,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 23,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 23,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 23,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 23,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 23,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 23,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603072",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 24,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 24,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 24,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 24,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 24,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 24,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 24,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603162",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 25,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 25,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 25,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 25,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 25,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 25,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 25,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603240",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 26,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 26,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 26,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 26,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 26,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 26,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 26,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603381",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 27,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 27,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 27,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 27,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 27,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 27,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 27,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603511",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 28,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 28,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 28,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 28,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 28,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 28,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 28,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603557",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 29,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 29,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 29,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 29,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 29,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 29,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 29,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603721",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 30,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 30,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 30,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 30,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 30,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 30,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 30,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603813",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 31,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 31,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 31,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 31,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 31,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 31,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 31,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--603973",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 32,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 32,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 32,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 32,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 32,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 32,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 32,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604043",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 33,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 33,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 33,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 33,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 33,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 33,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 33,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604298",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 34,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 34,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 34,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 34,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 34,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 34,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 34,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604499",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 35,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 35,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 35,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 35,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 35,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 35,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 35,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604666",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 36,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 36,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 36,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 36,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 36,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 36,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 36,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604854",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 37,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 37,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 37,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 37,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 37,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 37,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 37,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604922",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 38,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 38,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 38,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 38,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 38,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 38,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 38,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--604982",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 39,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 39,
              height: 1,
            },
            {
              industry: "B",
              number: 4,
              startICLinkNum: 39,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 39,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 39,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 39,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 39,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--605219",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 40,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 40,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 40,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 40,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 40,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 40,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 40,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--605312",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 41,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 41,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 41,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 41,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 41,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 41,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 41,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--605406",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 42,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 42,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 42,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 42,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 42,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 42,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 42,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--605582",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 43,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 43,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 43,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 43,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 43,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 43,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 43,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--605698",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 44,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 44,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 44,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 44,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 44,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 44,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 44,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--605978",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 45,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 45,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 45,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 45,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 45,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 45,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 45,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606267",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 46,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 46,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 46,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 46,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 46,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 46,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 46,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606279",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 47,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 47,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 47,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 47,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 47,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 47,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 47,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606286",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 48,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 48,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 48,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 48,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 48,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 48,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 48,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606509",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 49,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 49,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 49,
              height: 1,
            },
            {
              industry: "B",
              number: 0,
              startICLinkNum: 49,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 49,
              height: 4,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 49,
              height: 4,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 49,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606634",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 50,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 50,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 50,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 50,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 50,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 50,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 50,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606674",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 51,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 51,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 51,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 51,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 51,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 51,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 51,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606687",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 52,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 52,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 52,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 52,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 52,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 52,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 52,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606706",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 53,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 53,
              height: 1,
            },
            {
              industry: "B",
              number: 2,
              startICLinkNum: 53,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 53,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 53,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 53,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 53,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "20084--606735",
            name: "5fce75b70c--172.252.xxx.xxx",
            startICLinkNum: 54,
          },
          industry: [
            {
              industry: "B",
              number: 69,
              startICLinkNum: 54,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 54,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 54,
              height: 1,
            },
            {
              industry: "BC",
              number: 1,
              startICLinkNum: 54,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 54,
              height: 4,
            },
            {
              industry: "BC",
              number: 0,
              startICLinkNum: 54,
              height: 4,
            },
          ],
        },
        {
          IC: {
            numId: "529329--602767",
            name: "104.21.xxx.xxx--172.252.xxx.xxx",
            startICLinkNum: 55,
          },
          industry: [
            {
              industry: "B",
              number: 5,
              startICLinkNum: 55,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 55,
              height: 1,
            },
            {
              industry: "B",
              number: 1,
              startICLinkNum: 55,
              height: 1,
            },
            {
              industry: "A",
              number: 4,
              startICLinkNum: 55,
              height: 2,
            },
            {
              industry: "A",
              number: 0,
              startICLinkNum: 55,
              height: 2,
            },
            {
              industry: "A",
              number: 0,
              startICLinkNum: 55,
              height: 2,
            },
            {
              industry: "G",
              number: 1,
              startICLinkNum: 55,
              height: 3,
            },
            {
              industry: "G",
              number: 0,
              startICLinkNum: 55,
              height: 3,
            },
            {
              industry: "G",
              number: 0,
              startICLinkNum: 55,
              height: 3,
            },
            {
              industry: "AB",
              number: 1,
              startICLinkNum: 55,
              height: 5,
            },
            {
              industry: "AB",
              number: 0,
              startICLinkNum: 55,
              height: 5,
            },
            {
              industry: "AB",
              number: 0,
              startICLinkNum: 55,
              height: 5,
            },
          ],
        },
      ],
    ];
    setData(dt);
  }, [linksInfo]);

  // 绘制结构图
  function draw() {
    if (JSON.stringify(data) === "[]") return;
    d3.selectAll("#diff-legend svg").remove();
    d3.selectAll("#diff-all-chart svg").remove();

    let chartHeight = svgHeight * 0.7;

    const industryColor = {
      A: "#b3efa7",
      B: "#e4657f",
      G: "#a17fda",
      AB: "#ff9f6d",
      BC: "#64d9d7",
    };

    // 绘制左侧的所有产业数量统计图
    let industrySvg = d3
      .select("#all-industry")
      .append("svg")
      .attr("width", "100%")
      .attr("height", chartHeight);

    let singleInustryHeight = chartHeight / (data[0].length / 2);
    let singleIndustryWidth = 30;

    let industryG = industrySvg
      .append("g")
      .attr("transform", "translate(5, 5)");
    industryG
      .selectAll("rect")
      .data(data[0])
      .join("rect")
      .attr("x", (d, i) => {
        return (i % 2) * singleIndustryWidth - 2;
      })
      .attr("y", (d, i) => {
        return chartHeight - d.height * singleInustryHeight;
      })
      .attr("width", (d, i) => {
        return singleIndustryWidth;
      })
      .attr("height", singleInustryHeight)
      .attr("storke", "#aaa")
      .attr("fill", (d, i) => industryColor[d.industry]);

    // 绘制每一对IC之间的产业信息图
    var ICWidth = svgWidth * 0.8;
    var ICMargin = {
      right: 2,
      left: 0,
      top: 5,
      bottom: 10,
    };

    let ICSvg = d3
      .select("#diff-chart")
      .append("svg")
      .attr("width", ICWidth)
      .attr("height", chartHeight)
      .call(zoom);

    var x = d3
      .scaleBand()
      .domain(data[1].map((d) => d.IC.numId))
      .range([ICMargin.left, ICWidth - ICMargin.right])
      .padding(0.1);

    let ICPairWrpapper = ICSvg.append("g").attr("class", "ICPairs");
    let pairWidth;

    let pairG = ICPairWrpapper.selectAll("g")
      .data(data[1])
      .join("g")
      .attr("class", "pair-g")
      .attr(
        "transform",
        (d, i) => `translate(${x(d.IC.numId)}, ${ICMargin.top})`
      )
      .attr("nodeWidth", (d) => {
        pairWidth = x.bandwidth();
        return x.bandwidth();
      });

    for (let i = 0; i < data[1].length; i++) {
      // 循环对的数目
      for (let j = 0; j < data[1][i].industry.length; j++) {
        d3.select(d3.selectAll(".pair-g")._groups[0][i])
          .append("rect")
          .attr("x", (d) => {
            return Math.floor(pairWidth / 3) * d.industry[j].index;
          })
          .attr("y", (d) => {
            console.log(
              chartHeight - d.industry[j].height * singleInustryHeight,
              d.industry[j].height,
              d
            );
            return chartHeight - d.industry[j].height * singleInustryHeight;
          })
          .attr("width", (d, i) => {
            return pairWidth / 3 - 1;
          })
          .attr("height", singleInustryHeight)
          .attr("fill", (d) => {
            let currIndustry = d.industry[j].industry;
            let currNumber = d.industry[j].number;
            return industryColor[currIndustry];
          });
      }
    }
    // 视图缩放
    function zoom(svg) {
      const extent = [
        [ICMargin.left, ICMargin.top],
        [ICWidth - ICMargin.right, chartHeight - ICMargin.top],
      ];

      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed)
      );

      function zoomed(event) {
        x.range(
          [ICMargin.left, ICWidth - ICMargin.right].map((d) => {
            return event.transform.applyX(d);
          })
        );

        svg
          .selectAll(".ICPairs rect")
          .attr("x", (d) => {
            return x(d.IC.numId);
          })
          .attr("width", x.bandwidth());
      }
    }

    // 绘制图例-------------------------------------------------------------------------------------
    let industrySet = data[0].filter((d, index) => {
      if (index % 2 !== 0) {
        return true;
      }
    });
    industrySet = industrySet.map((d) => d.industry);
    let diffLegendSvg = d3
      .select("#diff-legend")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", "25px");
    diffLegendSvg
      .append("g")
      .attr("class", "diff-legend")
      .selectAll("rect")
      .data(industrySet)
      .join("rect")
      .attr("fill", (d) => industryColor[d])
      .attr("x", (d, i) => {
        return ((svgWidth - 10) / industrySet.length) * i;
      })
      .attr("y", 2)
      .attr("height", 20)
      .attr("width", (svgWidth - 10) / industrySet.length);
    diffLegendSvg
      .append("g")
      .selectAll("text")
      .data(industrySet)
      .join("text")
      .attr("class", "legend-text")
      .attr("width", (svgWidth - 10) / industrySet.length)
      .attr("x", (d, i) => {
        return ((svgWidth - 10) / industrySet.length) * (i + 0.5);
      })
      .attr("y", 15)
      .text((d) => {
        return d;
      });
  }

  return (
    <div id="difference-chart">
      <div
        id="diff-legend"
        style={{ width: "100%", height: "5%", paddingLeft: "5px" }}
      ></div>
      <div id="diff-all-chart" style={{ width: "100%", height: "95%" }}>
        <div id="all-industry" style={{ width: "20%", height: "100%" }}></div>
        <div id="diff-chart" style={{ width: "80%", height: "100%" }}></div>
      </div>
    </div>
  );
}
