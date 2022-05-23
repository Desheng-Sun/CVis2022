import { useEffect, useState } from "react";
import "./index.css";
import * as d3 from "d3";
import { Radio } from "antd";
import { getClueDenseDataSds } from "../../apis/api";

const nodeType = ["IP", "Cert"];
const dataType = ["numConnectedDomain", "numDomainWithIn", "rateIn"];
const dataTypeForShow = [
  "连接Domain数",
  "连接涉黑Domain数",
  "涉黑灰产Domain比例",
];

let example_data = {
  IP: [
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 50,
      numDomainWithIn: 30,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 43,
      numDomainWithIn: 10,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 20,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 10,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 35,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 4,
      name: "IP_3",
      numConnectedDomain: 20,
      numDomainWithIn: 20,
      rateIn: 1,
      industryType: ["A", "AB", "ABC"],
    },
    {
      numId: 5,
      name: "IP_4",
      numConnectedDomain: 100,
      numDomainWithIn: 20,
      rateIn: 0.3,
      industryType: ["A", "AB"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
  ],
  Cert: [
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 1,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 2,
      name: "IP_1",
      numConnectedDomain: 40,
      numDomainWithIn: 20,
      rateIn: 0.5,
      industryType: ["A", "AB"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 4,
      name: "IP_3",
      numConnectedDomain: 20,
      numDomainWithIn: 20,
      rateIn: 1,
      industryType: ["A", "AB", "ABC"],
    },
    {
      numId: 5,
      name: "IP_4",
      numConnectedDomain: 100,
      numDomainWithIn: 20,
      rateIn: 0.3,
      industryType: ["A", "AB"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
    {
      numId: 3,
      name: "IP_2",
      numConnectedDomain: 50,
      numDomainWithIn: 20,
      rateIn: 0.4,
      industryType: ["A", "AB", "C"],
    },
  ],
};

let prevIndex = -1;
export default function ClueDense() {
  const [data, setData] = useState({ IP: [], Cert: [] });
  const [currNodeType, setCurrNodeType] = useState(nodeType[0]);
  const [currDataType, setCurrDataType] = useState(dataType[0]);

  useEffect(() => {
    getClueDenseDataSds().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    drawClueDense(currNodeType, currDataType);
  }, [data, currNodeType, currDataType]);

  function drawClueDense(nodetype, datatype) {
    const hdlMouseMove = function handleMouseMove(event) {
      event.stopPropagation();
      let { x, y } = getMousePosition(event, canvas);
      let r = Math.floor(y / squareSize);
      let c = Math.floor(x / squareSize);
      let index = r * oneLine + c;
      if (prevIndex !== index && index >= 0 && index < currdata.length) {
        ctx_mouse.clearRect(0, 0, boundedWidth, boundedHeight);
        ctx_mouse.strokeStyle = "#333";
        ctx_mouse.strokeRect(
          (index % oneLine) * squareSize,
          parseInt(index / oneLine) * squareSize,
          squareSize,
          squareSize
        );
        prevIndex = index;

        let d = currdata[index];

        // 显示当前数值
        if (datatype === "rateIn") {
          d3.select("div#clue-dense-control-info").text(
            d.name + " - " + (d[datatype] * 100).toFixed(2) + "%"
          );
        } else {
          d3.select("div#clue-dense-control-info").text(
            d.name + " - " + d[datatype]
          );
        }
      }
    };
    const dimensions = {
      width: 2000,
      height: 600,
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    };
    const boundedWidth = dimensions.width;
    const boundedHeight = dimensions.height;

    let currdata = data[nodetype];

    let containerRatio = dimensions.width / dimensions.height;
    let squareSize =
      dimensions.height /
      Math.ceil(Math.sqrt(currdata.length / containerRatio));
    let oneLine = Math.floor(boundedWidth / squareSize); //需要画多少列 画不下完整一列时，增加列数 列数取floor
    let rows = Math.ceil(currdata.length / oneLine);

    const canvas = document.getElementById("clue-dense-chart");
    canvas.height = boundedHeight;
    canvas.width = boundedWidth;
    const ctx = canvas.getContext("2d");

    const canvas_mouse = document.getElementById("clue-dense-chart-mouse");
    canvas_mouse.height = boundedHeight;
    canvas_mouse.width = boundedWidth;
    const ctx_mouse = canvas_mouse.getContext("2d");
    ctx_mouse.globalAlpha = 1;

    let colorScale = d3.scaleSequential(
      d3.extent(currdata, (d) => d[datatype]),
      d3.interpolateGnBu
    );

    for (let d in currdata) {
      ctx.fillStyle = colorScale(currdata[d][datatype]);
      ctx.fillRect(
        (d % oneLine) * squareSize,
        parseInt(d / oneLine) * squareSize,
        squareSize,
        squareSize
      );
    }

    function getMousePosition(event, canvas) {
      const { clientX, clientY } = event;
      //  获取 canvas 的边界位置
      const { top, left } = canvas.getBoundingClientRect();
      //  计算鼠标在 canvas 在位置
      const x = clientX - left;
      const y = clientY - top;
      return {
        x,
        y,
      };
    }

    canvas_mouse.addEventListener("mousemove", hdlMouseMove, false);
  }

  function onNodeTypeChange(e) {
    setCurrNodeType(e.target.value);
  }

  function onDataTypeChange(e) {
    setCurrDataType(e.target.value);
  }

  return (
    <div id="clue-dense" style={{ width: 2000, height: 650 }}>
      <div
        id="clue-dense-control"
        style={{ width: 2000, height: 50, padding: 10 }}
      >
        <div id="clue-dense-control-nodetype">
          <Radio.Group
            defaultValue={nodeType[0]}
            size="small"
            onChange={onNodeTypeChange}
          >
            {nodeType.map((item) => {
              return <Radio.Button value={item}>{item}</Radio.Button>;
            })}
          </Radio.Group>
        </div>
        <div id="clue-dense-control-datatype">
          <Radio.Group
            defaultValue={dataType[0]}
            size="small"
            onChange={onDataTypeChange}
          >
            {dataType.map((item, index) => {
              return (
                <Radio.Button value={item}>
                  {dataTypeForShow[index]}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </div>
        <div id="clue-dense-control-info"></div>
      </div>
      <canvas id="clue-dense-chart"></canvas>
      <canvas id="clue-dense-chart-mouse"></canvas>
    </div>
  );
}
