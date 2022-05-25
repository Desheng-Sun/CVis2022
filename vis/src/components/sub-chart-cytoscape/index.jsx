import { useEffect, useState, React } from "react";
import cytoscape, { use } from "cytoscape";
import expandCollapse from "cytoscape-expand-collapse";
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
} from "@ant-design/icons";
import fcose from "cytoscape-fcose";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import contextMenus from "cytoscape-context-menus";
import { Cascader, Select, Input, Slider, Button, Checkbox } from "antd";
import * as d3 from "d3";
import "./index.css";

// 数据请求接口
import { getMainChartData, getMainChartSds } from "../..//apis/api.js";
import SkeletonChart from "../skeleton-chart";

navigator(cytoscape);
undoRedo(cytoscape);
expandCollapse(cytoscape);
contextMenus(cytoscape);
cytoscape.use(euler);
cytoscape.use(coseBilkent);
cytoscape.use(fcose);

const { Option } = Select;
const { Search } = Input;

var cy, layoutOption, ecLayoutOption, stylesJson, layout, api;
var ur, urOption; // 保留点和边的初状态
var layoutOptionDict = {
  euler: {
    name: "euler",
    fit: true, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
    springLength: 10,
    mass: 5,
    animateFilter: function (node, i) {
      return true;
    }, // 决定是否节点的位置应该被渲染
    concentric: function (node) {
      // returns numeric value for each node, placing higher nodes in levels towards the centre
      return node.degree();
    },
  },
  concentric: {
    name: "concentric",
    // fit: true, // whether to fit to viewport
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
    name: "concentric",
    fit: true, // whether to fit to viewport
    animate: true, // whether to transition the node positions
    avoidOverlap: true,
  },
  coseBilkent: {
    name: "cose-bilkent",
    fit: true,
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
    fit: true,
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
var ecLayoutOptionDict = {
  euler: {
    layoutBy: {
      name: "euler",
      // fit: false
    }
  },
  concentric: {
    layoutBy: {
      name: "concentric",
      // fit: false
    }
  },
  dagre: {
    layoutBy: {
      name: "concentric",
      // fit: false
    }
  },
  fcose: {
    layoutBy: {
      name: "fcose",
      // fit: false
    }
  },
  coseBilkent: {
    layoutBy: {
      name: "cose-bilkent",
      randomize: false,
      // fit: false
    }
  },
};

export default function SubChartCytoscape({ w, h }) {
  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [searchNodebyId, setSearchNodebyId] = useState(""); //
  const [filterType, setFilterType] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [edgeLength, setEdgeLength] = useState(10);
  const [nodeDistance, setNodeDistance] = useState(10);
  const [distanceFlag, setDistanceFlag] = useState(false);
  const [chartLayout, setChartLayout] = useState("euler");
  const [undoOut, setUndoOut] = useState(false);
  const [redoIn, setRedoIn] = useState(false);
  const [rollback, setRollback] = useState(false);
  const [layoutFlag, setLayoutFlag] = useState(false);
  const [arrowFlag, setArrowFlag] = useState(false);
  const [fromtableNode, setFromtableNode] = useState([]);
  const [fromTableLink, setFromTableLink] = useState([]);
  const [fromIndustryStackNode, setFromIndustryStackNode] = useState("");
  const [data, setData] = useState({ nodes: [], links: [] });
  // 给其他组件的数据
  const [resData, setResData] = useState({ nodes: [], links: [] }); // 右侧表格和子弹图的所有数据
  const [doaminStatistic, setDoaminStatistic] = useState([]); // 下方图的数据
  const [dataParam, setDataParam] = useState("");

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  // 接收skeleton图过来的参数是否变化
  PubSub.unsubscribe("skeletonSelect");
  PubSub.subscribe("skeletonSelect", (msg, nodeLink) => {
    setDataParam(nodeLink);
  });
  // 请求数据并初始化图形
  useEffect(() => {
    // getMainChartSds(dataParam).then((res) => {
    //   setData(res);
    // });

    // 测试数据
    let dt = {
      nodes: [
        {
          numId: 1,
          id: "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
          name: "34a6231f10.com",
          type: "Domain",
          industry: "ABCE\r",
          nodeToICNumId: 3,
          childrenNum: 17,
          children: [
            {
              numId: 1,
              id: "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
              name: "34a6231f10.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 2,
              id: "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
              name: "5052db3f33.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 16,
              id: "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
              name: "6f51b90ab3.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 18,
              id: "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
              name: "c6fb2192fe.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 20,
              id: "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
              name: "47e5873650.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 21,
              id: "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
              name: "e9906a199d.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 22,
              id: "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
              name: "71d2570dff.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 23,
              id: "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
              name: "52718967cb.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 24,
              id: "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
              name: "ca1457f910.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 25,
              id: "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
              name: "ed5eca0681.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7014,
              id: "Domain_8aebac6de3bb8f775e3a04a5dde443a37d525ef7b38f7ee02368cc1997202463",
              name: "8aebac6de3.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7028,
              id: "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
              name: "4b4db6bc99.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7030,
              id: "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
              name: "88b759b8cb.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7046,
              id: "Domain_857d52beae28391fa727395d7fe97ed22db609f755df5b19346b2a1fcc686371",
              name: "857d52beae.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7057,
              id: "Domain_928f2139fe04b2bf2870653bee7b25d2f0fc3b6aec6dab114270f13dd6f1a661",
              name: "928f2139fe.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7076,
              id: "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
              name: "9a485b29b7.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 7092,
              id: "Domain_81a6e67db0a1709f448fef17e8e6ccc63c5278ecefcdf57df06212b6efc0cd0c",
              name: "81a6e67db0.com",
              type: "Domain",
              industry: "ABCE\r",
            },
          ],
        },
        {
          numId: 3,
          id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          name: "5.180.xxx.xxx",
          type: "IP",
          parent:
            "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
          industry: "  \r",
        },
        {
          numId: 5,
          id: "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
          name: "32b4d5d937.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 6,
          id: "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
          name: "70d6d09e0e.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 7,
          id: "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
          name: "d3d0abc4c0.com",
          type: "Domain",
          industry: "  \r",
          nodeToICNumId: 3,
          childrenNum: 10,
          children: [
            {
              numId: 7,
              id: "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
              name: "d3d0abc4c0.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 17,
              id: "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
              name: "aa63f2ee01.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7143,
              id: "Domain_55127b7f181cb6af7dcfe358f5e14b9252484631de98c0cffaa4450d62ef2f4c",
              name: "55127b7f18.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7173,
              id: "Domain_376413d09f199cffcf3c292abcf913f82dad8d1bfe2bcf19bb94712e797646e4",
              name: "376413d09f.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7245,
              id: "Domain_3eb7289a70361365652d0b09772ea0ec62e80a23e27ab27aced672108087152e",
              name: "3eb7289a70.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7258,
              id: "Domain_467348e3c0938dde44f5684125883fd015335faaf5ec6119405f3595d0138ee0",
              name: "467348e3c0.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7284,
              id: "Domain_5c479e36702edd61f326a501c501395302f64ebaaa96e2121c6fc6c940df7807",
              name: "5c479e3670.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7314,
              id: "Domain_edd09edfb6ca60e86757b5c529cefc3b82bdaa42429b078ec131a341157e76bf",
              name: "edd09edfb6.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7371,
              id: "Domain_e08a06bdbe8b6a2f630418edc290b553ab81d00ca1456b866989e73e435ec505",
              name: "e08a06bdbe.com",
              type: "Domain",
              industry: "  \r",
            },
            {
              numId: 7409,
              id: "Domain_0744ccb1518874480b28e618e16310201b29b251d4542151276e8c3e397f7bb7",
              name: "0744ccb151.com",
              type: "Domain",
              industry: "  \r",
            },
          ],
        },
        {
          numId: 8,
          id: "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
          name: "e970e2e4ae.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 9,
          id: "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
          name: "2d3bbcec29.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 10,
          id: "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
          name: "41a5458d86.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 11,
          id: "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
          name: "e3a8e57b0b.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 12,
          id: "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
          name: "ee295d27ba.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 13,
          id: "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
          name: "7755ee12f2.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 14,
          id: "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
          name: "9bbf71ad49.com",
          type: "Domain",
          industry: "ABCEG\r",
        },
        {
          numId: 15,
          id: "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
          name: "a76a96cf47.com",
          type: "Domain",
          industry: "ABCE\r",
        },
        {
          numId: 19,
          id: "ASN_3bc5b0706c3df8182f7784cafa0bd864c4a6d432266863609f1f5c22c47fa04b",
          name: "AS_3bc5b0706c",
          type: "ASN",
          industry: "  \r",
        },
        {
          numId: 100,
          id: "Cert_a91593a45b6eceaae2a0478cc243543184d325720bc3f19f91982450b6af57e2",
          name: "a91593a45b",
          type: "Cert",
          industry: "  \r",
        },
        {
          numId: 101,
          id: "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          name: "9032204fc4",
          type: "Cert",
          industry: "  \r",
        },
        {
          numId: 103,
          id: "Domain_a0b7abae72aaee3e3e203317116855cfd9589967b058eb85ffc69ffcbb7d19b0",
          name: "a0b7abae72.com",
          type: "Domain",
          industry: "ABCE\r",
          nodeToICNumId: 101,
          childrenNum: 7,
          children: [
            {
              numId: 103,
              id: "Domain_a0b7abae72aaee3e3e203317116855cfd9589967b058eb85ffc69ffcbb7d19b0",
              name: "a0b7abae72.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 104,
              id: "Domain_e17c68fd70adf51d7c475dcac9685e9da54c62d630cd37ca423804e503b259ec",
              name: "e17c68fd70.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 105,
              id: "Domain_bb9efa84372c2d54197d92b0a8d82dde5bb5473b38c6006f6d759b1324a0802a",
              name: "bb9efa8437.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 106,
              id: "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
              name: "8581808a73.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 107,
              id: "Domain_9863ec44ba2738006432d3a833faf1f314a58b714684a320861a56ca238aaa76",
              name: "9863ec44ba.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 108,
              id: "Domain_5ce9966cf3dcbbebac6e6cd6b0dcc39e6a16daf41344ce094f17e669b089ec59",
              name: "5ce9966cf3.com",
              type: "Domain",
              industry: "ABCE\r",
            },
            {
              numId: 109,
              id: "Domain_a3c5aacfa6ba368db872b232d67378247cf1995ad48905a967d6df56d4915e20",
              name: "a3c5aacfa6.com",
              type: "Domain",
              industry: "ABCE\r",
            },
          ],
        },
        {
          numId: 7004,
          id: "IP_CIDR_6399042623e54e0439705fde4e655b85e0beef20bc18e9eea628bbe6278f71f8",
          name: "5.180.xxx.0/24",
          type: "IP_C",
          parent:
            "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
          industry: "  \r",
        },
        {
          numId: 7070,
          id: "Domain_908f9819039b595db66c5bf8c22fe1ffce9f1faf5803ead9a1b1b66f6f6b0b2e",
          name: "908f981903.com",
          type: "Domain",
          industry: "B\r",
          nodeToICNumId: 3,
          childrenNum: 11,
          children: [
            {
              numId: 7070,
              id: "Domain_908f9819039b595db66c5bf8c22fe1ffce9f1faf5803ead9a1b1b66f6f6b0b2e",
              name: "908f981903.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7104,
              id: "Domain_dcc8847aabee6d9f59f73f24cf12ee8cb7eda30f69b6a1a5e10ec9e2384c1f73",
              name: "dcc8847aab.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7118,
              id: "Domain_1c42119e2602048039e4c972f82610ebcc567451239eecebeaeb6d18b71bcd2c",
              name: "1c42119e26.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7131,
              id: "Domain_4556cf74c8a015eb187342865f9d7a9a8173c05d6a8f7bc41cb04dcd7ffeaca8",
              name: "4556cf74c8.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7157,
              id: "Domain_d0a35d260bbc2ec4d746d87a87a6e3ced90c92c67917fef4422931e56234aaa9",
              name: "d0a35d260b.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7198,
              id: "Domain_98d27f9363daa030fc00a5c710d043373e56546acbb42ee732b909f942a07385",
              name: "98d27f9363.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7212,
              id: "Domain_d7c19faeee074f9f3c1daaf7a72d2e2107a6058e9b16a18e463d59440f943071",
              name: "d7c19faeee.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7229,
              id: "Domain_c58c7191bbdecbc932da5652b6b4b267df72f96e206b8ca9a649a64f160dc590",
              name: "c58c7191bb.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7299,
              id: "Domain_5b04a54469bd0f19e6e197fe9369ca135850055b9d74682c1a7741db42d6bcf5",
              name: "5b04a54469.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7330,
              id: "Domain_15ca069c85db942a3e57cd413742e2be3df6cbe0c8ab348dc0a428f94cf2b8a4",
              name: "15ca069c85.com",
              type: "Domain",
              industry: "B\r",
            },
            {
              numId: 7390,
              id: "Domain_907c85959c86607942216550c3de8354867a819ded2381564baa79bcfc5c501c",
              name: "907c85959c.com",
              type: "Domain",
              industry: "B\r",
            },
          ],
        },
        {
          numId: 7185,
          id: "Domain_885df3d7be82ded3318c5a2bb2ecf7eb5ea44768d4157291165377bac59c0d2e",
          name: "885df3d7be.com",
          type: "Domain",
          industry: "BC\r",
          nodeToICNumId: 3,
          childrenNum: 3,
          children: [
            {
              numId: 7185,
              id: "Domain_885df3d7be82ded3318c5a2bb2ecf7eb5ea44768d4157291165377bac59c0d2e",
              name: "885df3d7be.com",
              type: "Domain",
              industry: "BC\r",
            },
            {
              numId: 7271,
              id: "Domain_ceeac61beea15cd09fdb0918a0d94f77e2b7f91d3ec6e04adb989a65ba84cb1c",
              name: "ceeac61bee.com",
              type: "Domain",
              industry: "BC\r",
            },
            {
              numId: 7351,
              id: "Domain_c67f6b5008e928fa7116bdeed7b2c5630320caa3a73a9e506492514906292a04",
              name: "c67f6b5008.com",
              type: "Domain",
              industry: "BC\r",
            },
          ],
        },
      ],
      links: [
        {
          relation: "r_dns_a",
          source:
            "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [1, 3],
          childrenNum: 17,
          children: [
            {
              relation: "r_dns_a",
              source:
                "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [1, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [2, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [16, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [18, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [20, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [21, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [22, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [23, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [24, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [25, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_8aebac6de3bb8f775e3a04a5dde443a37d525ef7b38f7ee02368cc1997202463",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7014, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7028, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7030, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_857d52beae28391fa727395d7fe97ed22db609f755df5b19346b2a1fcc686371",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7046, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_928f2139fe04b2bf2870653bee7b25d2f0fc3b6aec6dab114270f13dd6f1a661",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7057, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7076, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_81a6e67db0a1709f448fef17e8e6ccc63c5278ecefcdf57df06212b6efc0cd0c",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7092, 3],
            },
          ],
        },
        {
          relation: "r_asn",
          source:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          target:
            "ASN_3bc5b0706c3df8182f7784cafa0bd864c4a6d432266863609f1f5c22c47fa04b",
          linksNumId: [3, 19],
        },
        {
          relation: "r_cidr",
          source:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          target:
            "IP_CIDR_6399042623e54e0439705fde4e655b85e0beef20bc18e9eea628bbe6278f71f8",
          linksNumId: [3, 7004],
        },
        {
          relation: "r_cert",
          source:
            "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [5, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [5, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
          target:
            "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
          linksNumId: [5, 6],
        },
        {
          relation: "r_cert",
          source:
            "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [6, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [6, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
          target:
            "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
          linksNumId: [6, 5],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7, 3],
          childrenNum: 10,
          children: [
            {
              relation: "r_dns_a",
              source:
                "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [17, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_55127b7f181cb6af7dcfe358f5e14b9252484631de98c0cffaa4450d62ef2f4c",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7143, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_376413d09f199cffcf3c292abcf913f82dad8d1bfe2bcf19bb94712e797646e4",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7173, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_3eb7289a70361365652d0b09772ea0ec62e80a23e27ab27aced672108087152e",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7245, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_467348e3c0938dde44f5684125883fd015335faaf5ec6119405f3595d0138ee0",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7258, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_5c479e36702edd61f326a501c501395302f64ebaaa96e2121c6fc6c940df7807",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7284, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_edd09edfb6ca60e86757b5c529cefc3b82bdaa42429b078ec131a341157e76bf",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7314, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_e08a06bdbe8b6a2f630418edc290b553ab81d00ca1456b866989e73e435ec505",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7371, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_0744ccb1518874480b28e618e16310201b29b251d4542151276e8c3e397f7bb7",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7409, 3],
            },
          ],
        },
        {
          relation: "r_cert",
          source:
            "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [8, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [8, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
          target:
            "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
          linksNumId: [8, 9],
        },
        {
          relation: "r_cert",
          source:
            "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [9, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [9, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
          target:
            "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
          linksNumId: [9, 8],
        },
        {
          relation: "r_cert",
          source:
            "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [10, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [10, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
          target:
            "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
          linksNumId: [10, 11],
        },
        {
          relation: "r_cert",
          source:
            "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [11, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [11, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
          target:
            "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
          linksNumId: [11, 10],
        },
        {
          relation: "r_cert",
          source:
            "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [12, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [12, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
          target:
            "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
          linksNumId: [12, 13],
        },
        {
          relation: "r_cert",
          source:
            "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [13, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [13, 3],
        },
        {
          relation: "r_cert",
          source:
            "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [14, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [14, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
          target:
            "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
          linksNumId: [14, 15],
        },
        {
          relation: "r_cert",
          source:
            "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [15, 101],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [15, 3],
        },
        {
          relation: "r_subdomain",
          source:
            "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
          target:
            "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
          linksNumId: [15, 14],
        },
        {
          relation: "r_cert_chain",
          source:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          target:
            "Cert_a91593a45b6eceaae2a0478cc243543184d325720bc3f19f91982450b6af57e2",
          linksNumId: [101, 100],
        },
        {
          relation: "r_cert",
          source:
            "Domain_a0b7abae72aaee3e3e203317116855cfd9589967b058eb85ffc69ffcbb7d19b0",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [103, 101],
          childrenNum: 7,
          children: [
            {
              relation: "r_cert",
              source:
                "Domain_a0b7abae72aaee3e3e203317116855cfd9589967b058eb85ffc69ffcbb7d19b0",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [103, 101],
            },
            {
              relation: "r_cert",
              source:
                "Domain_e17c68fd70adf51d7c475dcac9685e9da54c62d630cd37ca423804e503b259ec",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [104, 101],
            },
            {
              relation: "r_cert",
              source:
                "Domain_bb9efa84372c2d54197d92b0a8d82dde5bb5473b38c6006f6d759b1324a0802a",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [105, 101],
            },
            {
              relation: "r_cert",
              source:
                "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [106, 101],
            },
            {
              relation: "r_cert",
              source:
                "Domain_9863ec44ba2738006432d3a833faf1f314a58b714684a320861a56ca238aaa76",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [107, 101],
            },
            {
              relation: "r_cert",
              source:
                "Domain_5ce9966cf3dcbbebac6e6cd6b0dcc39e6a16daf41344ce094f17e669b089ec59",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [108, 101],
            },
            {
              relation: "r_cert",
              source:
                "Domain_a3c5aacfa6ba368db872b232d67378247cf1995ad48905a967d6df56d4915e20",
              target:
                "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
              linksNumId: [109, 101],
            },
          ],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_908f9819039b595db66c5bf8c22fe1ffce9f1faf5803ead9a1b1b66f6f6b0b2e",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7070, 3],
          childrenNum: 11,
          children: [
            {
              relation: "r_dns_a",
              source:
                "Domain_908f9819039b595db66c5bf8c22fe1ffce9f1faf5803ead9a1b1b66f6f6b0b2e",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7070, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_dcc8847aabee6d9f59f73f24cf12ee8cb7eda30f69b6a1a5e10ec9e2384c1f73",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7104, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_1c42119e2602048039e4c972f82610ebcc567451239eecebeaeb6d18b71bcd2c",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7118, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_4556cf74c8a015eb187342865f9d7a9a8173c05d6a8f7bc41cb04dcd7ffeaca8",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7131, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_d0a35d260bbc2ec4d746d87a87a6e3ced90c92c67917fef4422931e56234aaa9",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7157, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_98d27f9363daa030fc00a5c710d043373e56546acbb42ee732b909f942a07385",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7198, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_d7c19faeee074f9f3c1daaf7a72d2e2107a6058e9b16a18e463d59440f943071",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7212, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_c58c7191bbdecbc932da5652b6b4b267df72f96e206b8ca9a649a64f160dc590",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7229, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_5b04a54469bd0f19e6e197fe9369ca135850055b9d74682c1a7741db42d6bcf5",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7299, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_15ca069c85db942a3e57cd413742e2be3df6cbe0c8ab348dc0a428f94cf2b8a4",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7330, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_907c85959c86607942216550c3de8354867a819ded2381564baa79bcfc5c501c",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7390, 3],
            },
          ],
        },
        {
          relation: "r_dns_a",
          source:
            "Domain_885df3d7be82ded3318c5a2bb2ecf7eb5ea44768d4157291165377bac59c0d2e",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7185, 3],
          childrenNum: 3,
          children: [
            {
              relation: "r_dns_a",
              source:
                "Domain_885df3d7be82ded3318c5a2bb2ecf7eb5ea44768d4157291165377bac59c0d2e",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7185, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_ceeac61beea15cd09fdb0918a0d94f77e2b7f91d3ec6e04adb989a65ba84cb1c",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7271, 3],
            },
            {
              relation: "r_dns_a",
              source:
                "Domain_c67f6b5008e928fa7116bdeed7b2c5630320caa3a73a9e506492514906292a04",
              target:
                "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
              linksNumId: [7351, 3],
            },
          ],
        },
      ],
    };
    setData(dt);
  }, [dataParam]);

  // 监听搜索事件
  useEffect(() => {
    if (searchNodebyId) {
      var j = cy.getElementById(searchNodebyId);
      cy.center(j); // 将被搜索元素居中
      cy.getElementById(searchNodebyId).style({
        // 高亮显示被选中节点
        "background-color": "#ffff00",
      });
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

  // 处理节点的搜索事件
  useEffect(() => {
    drawChart();
  }, [data]);

  // 监听是否选择当前数据为一个团伙
  useEffect(() => {
    if (resData.nodes.length !== 0 || resData.links.length !== 0) {
      PubSub.publish("combinedNodeTableDt", resData); // 分别向节点表和边表传递数据
      PubSub.publish("combinedLinkTableDt", resData);

      let tempNode = [];
      for (let n of resData.nodes) {
        if (["IP", "Cert"].includes(n.type)) {
          tempNode.push(n);
        }
      }
      PubSub.publish("industryStackDt", tempNode); // 将选中的数据中的IP和Cert传给stack组件
    }
  }, [resData]);

  // 监听布局是否变化
  useEffect(() => {
    if (layoutFlag) {
      layoutOption = layoutOptionDict[chartLayout];
      ecLayoutOption = ecLayoutOptionDict[chartLayout];
      layout.stop();
      layout = cy.layout(layoutOption);
      // api = cy.expandCollapse(ecLayoutOption);
      api.setOption('layoutBy', ecLayoutOption)
      api.collapseAll();
      // layout.run()
      setEdgeLength(5);
      setNodeDistance(5);
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
      // api.collapseAll();
    }
    setDistanceFlag(true);
  }, [nodeDistance, edgeLength]);

  // 撤销上一步操作
  useEffect(() => {
    if (undoOut) {
      ur.undo();
    }
    setUndoOut(false);
  }, [undoOut]);

  // 还原上一步撤销
  useEffect(() => {
    if (redoIn) {
      ur.redo();
    }
    setRedoIn(false);
  }, [redoIn]);
  // 还原所有操作
  useEffect(() => {
    if (rollback) {
      ur.undoAll();
    }
    setRollback(false);
  }, [rollback]);

  // 是否添加箭头
  useEffect(() => {
    if (arrowFlag) {
      let selection = cy.edges(":selected"); // 当前选中的元素
      selection.addClass("arrow");
    } else if (cy) {
      cy.edges().removeClass("arrow");
    }
  }, [arrowFlag]);

  useEffect(() => {
    if (doaminStatistic.length !== 0) {
      console.log(doaminStatistic); // 用于domain统计图的传出数据
    }
  }, [doaminStatistic]);

  // 从table中传入数据进行高亮
  PubSub.unsubscribe("tableToMainNodeDt");
  PubSub.subscribe("tableToMainNodeDt", (msg, nodeData) => {
    setFromtableNode(nodeData);
  });
  PubSub.unsubscribe("tableToMainLinkDt");
  PubSub.subscribe("tableToMainLinkDt", (msg, linkData) => {
    setFromTableLink(linkData);
  });
  useEffect(() => {
    if (cy) cy.nodes().removeClass("tablehighlightNode");
    if (fromtableNode.length !== 0) {
      cy.nodes().forEach((ele) => {
        if (fromtableNode.includes(parseInt(ele.json().data["numId"]))) {
          ele.addClass("tablehighlightNode");
        }
      });
    }
  }, [fromtableNode]);
  useEffect(() => {
    if (cy) cy.edges().removeClass("tablehighlightLink");
    if (fromTableLink.length !== 0) {
      cy.edges().forEach((ele) => {
        if (
          fromTableLink.includes(
            ele.json().data["source"] + "-" + ele.json().data["target"]
          )
        ) {
          ele.addClass("tablehighlightLink");
          console.log(ele);
          // ele.style("line-color", "#f5f440");
        }
      });
    }
  });

  // 从industry stack中传入数据进行高亮显示
  PubSub.unsubscribe("industryStackToMainDt");
  PubSub.subscribe("industryStackToMainDt", (msg, industryStackToMainDt) => {
    setFromIndustryStackNode(industryStackToMainDt);
  });
  useEffect(() => {
    if (cy) cy.nodes().removeClass("stackhighlightNode");
    if (fromIndustryStackNode !== "") {
      if (fromIndustryStackNode.split("-")[0] === "set") {
        // 高亮
        cy.$("#" + fromIndustryStackNode.split("-")[1]).addClass(
          "stackhighlightNode"
        );
      } else if (fromIndustryStackNode.split("-")[0] === "reset") {
        // 取消高亮
        cy.$("#" + fromIndustryStackNode.split("-")[1]).removeClass(
          "stackhighlightNode"
        );
      }
    }
  }, [fromIndustryStackNode]);

  function drawChart() {
    if (data.nodes.length === 0 && data.links.length === 0) return;
    const links = data.links.map((d) => ({ data: { ...d } }));
    const nodes = data.nodes.map((d) => ({ data: { ...d } }));

    // 初始化图
    Promise.all([
      fetch("./json/cy-style.json").then(function (res) {
        // 获取样式文件
        return res.json();
      }),
    ]).then(function (fetchData) {
      stylesJson = fetchData[0];
      let newStyleArr = {
        selector: "node",
        style: {
          width: function (ele) {
            return ele.degree() < 30 ? 30 : ele.degree();
          }, // 根据节点的度数设置
          height: function (ele) {
            return ele.degree() < 30 ? 30 : ele.degree();
          },
        },
      };
      stylesJson.push(newStyleArr);
      cy = window.cy = cytoscape({
        container: document.getElementById("main-chart"),
        elements: {
          nodes: nodes,
          edges: links,
        },
        style: stylesJson,
      });
      var defaults = {
        container: false, // html dom element
        viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
        thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
        thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
        dblClickDelay: 200, // milliseconds
        removeCustomContainer: false, // destroy the container specified by user on plugin destroy
        rerenderDelay: 100, // ms to throttle rerender updates to the panzoom for performance
      };
      cy.navigator(defaults);
      layoutOption = layoutOptionDict[chartLayout];
      layout = cy.layout(layoutOption);
      ecLayoutOption = ecLayoutOptionDict[chartLayout];
      api = cy.expandCollapse(ecLayoutOption);
      api.collapseAll();

      // layout.run();

      cy.boxSelectionEnabled(true); // 设置支持框选操作，如果同时启用平移，用户必须按住shift、control、alt或command中的一个来启动框选择

      urOption = {
        isDebug: true, // Debug mode for console messages
        actions: {}, // actions to be added
        undoableDrag: true, // Whether dragging nodes are undoable can be a function as well
        stackSizeLimit: undefined, // Size limit of undo stack, note that the size of redo stack cannot exceed size of undo stack
      };

      // 事件的撤销还原操作
      ur = cy.undoRedo(urOption);

      // 键盘控制事件
      document.addEventListener("keydown", function (e) {
        if (e.which === 46) {
          // 按删除键
          var selecteds = cy.$(":selected");
          if (selecteds.length > 0) ur.do("remove", selecteds);
        }
        if (e.ctrlKey && e.target.nodeName === "BODY")
          if (e.which === 90) ur.undo();
          else if (e.which === 89) ur.redo();
      });
      // ///////////////////////////////////////// 编写节点的事件///////////////////////////////////
      // 节点的点击事件
      cy.on("click", "node", function (e) {
        var node = e.target;
      });

      // 节点的mouseover事件
      cy.on("mouseover", "node", function (e) {
        var neigh = e.target;
        cy.elements()
          .difference(neigh.outgoers().union(neigh.incomers()))
          .not(neigh)
          .addClass("semitransp");
        neigh.addClass("highlight").outgoers().addClass("highlight");
      });
      cy.on("mouseout", "node", function (e) {
        var neigh = e.target;
        cy.elements().removeClass("semitransp");
        neigh
          .removeClass("highlight")
          .outgoers()
          .union(neigh.incomers())
          .removeClass("highlight");
      });

      var menuOptions = {
        evtType: "cxttap",
        menuItems: [
          {
            id: "select-self-neigh", // ID of menu item
            content: "选中节点", // Display content of menu item
            tooltipText: "选中当前节点和邻居节点", // Tooltip text for menu item
            selector: "node",
            onClickFunction: function (e) {
              // 选中当前节点及其邻居节点
              let n = e.target;
              let curNodeId = n.id();
              n.select();
              cy.getElementById(curNodeId).neighborhood().select();
            },
          },
          {
            id: "select-neigh", // ID of menu item
            content: "选中邻居节点", // Display content of menu item
            tooltipText: "选中邻居节点", // Tooltip text for menu item
            selector: "node",
            onClickFunction: function (e) {
              // 选中当前节点及其邻居节点
              let n = e.target;
              let curNodeId = n.id();
              cy.getElementById(curNodeId).neighborhood().select();
            },
          },
          {
            id: "select-analyze", // ID of menu item
            content: "统计分析", // Display content of menu item
            tooltipText: "统计分析", // Tooltip text for menu item
            selector: "node",
            onClickFunction: function (e) {
              let selection = cy.$(":selected");
              let t = selection.map((n) => n.json().data);
              let nodes = selection.nodes().map((ele) => ele.json().data);
              let links = selection.edges().map((ele) => ele.json().data);
              setResData({ nodes: [...nodes], links: [...links] });
              setDoaminStatistic([...t]); // 获取选择的所有数据
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

  // 移除节点以及其相邻的边
  function onDeleteNode(Id) {
    Id = "n2";
    let j = cy.$("#" + Id);
    cy.remove(j);
  }

  // 根据节点类型过滤掉一些点
  function onFilterNode(nodeType) {
    nodeType = "Domain";
    var collection = cy.elements("node[type = '" + nodeType + "']"); // 使用选择器对元素进行删除
    cy.remove(collection);
  }

  // 根据节点的id获取相应的元素
  function onSearchNode(Id) {
    Id = "n2";
    cy.getElementById(Id).style({ "background-color": "purple" }); // 更改被选中节点的属性
  }

  function onExportChart() {
    let jpg64 = cy.jpg();
  }

  function onCenter(Id) {
    Id = "n2";
    var j = cy.$(Id);
    cy.center(j);
  }

  function onGetSelected() {
    let selection = cy.elements(":selected");
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

  // 获取当前图中展示的数据
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
        </div>
      </div>
      <div id="navigator"></div>
      <div id="main-chart"></div>
    </div>
  );
}
