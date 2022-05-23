const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const Database = require("arangojs").Database;
const username = "root";
const password = "123456";
const port = 3008;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

/**
 * 设置跨域请求
 */

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "nodejs");
  res.header("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Cache-Control", "public, max-age=120");
  next();
});

app.get("/helloworld", (req, res) => {
  console.log("Hello World.");
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 获取节点的相关信息
let nodeInfoJ = fs.readFileSync(
  path.join(
    __dirname,
    "data/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv"
  ),
  "utf8"
);
nodeInfoJ = nodeInfoJ.split("\n");
let nodeNumIdInfo = [];
for (let i of nodeInfoJ) {
  nodeNumIdInfo.push(i.split(","));
}
nodeNumIdInfo = nodeNumIdInfo.splice(1);

// 获取IC节点的黑灰产信息
let ICIndustryP = path.join(__dirname, "data/ICIndustryInfo.json");
let ICIndustryJ = fs.readFileSync(ICIndustryP, "utf8");
const ICIndustry = JSON.parse(ICIndustryJ);

// 获取IC的links信息
const ICLinksInfoJ = fs.readFileSync(nowPath + "ICLinksInfo.json", "utf-8");
const ICLinksInfo = JSON.parse(ICLinksInfoJ);

// 获取单独IC的相关信息
const ICAloneInfoJ = fs.readFileSync(nowPath + "nodesAloneInfo.json", "utf-8");
const ICAloneInfo = JSON.parse(ICAloneInfoJ);

// 获取筛选的IC节点的信息
const ICScreenJ = fs.readFileSync(nowPath + "ICScreen.json", "utf-8");
const ICScreen = JSON.parse(ICScreenJ);

// 获取每个节点所在的ICLinks的信息
let nodeICLinksJ = fs.readFileSync(nowPath + "nodesInICLinks.json", "utf8");
let nodeICLinks = JSON.parse(nodeICLinksJ);

// 获取每个IC节点直接相连的节点的信息
let ICNeighborJ = fs.readFileSync(nowPath + "ICNeighbor.json", "utf8");
let ICNeighbor = JSON.parse(ICNeighborJ);

function getIPCertLinksInSkip2(
  nowPath,
  nowNodeNumId,
  ICLinksInfo,
  nodeNumIdInfo
) {
  // 数据信息存储变量
  let WhoisName = 0;
  let WhoisEmail = 0;
  let WhoisPhone = 0;
  let pureDomain = 0;
  let dirtyDomain = 0;
  let skipNum = 0;
  let allNodes1 = [];
  // 获取当前IC节点连接的所有IC节点的NumId
  for (let j of ICLinksInfo[nowNodeNumId]) {
    allNodes1.push(j[1]);
  }

  let allLinks = {};
  // 获取当前节点的相关信息
  let nowNodesInfo = nodeNumIdInfo[parseInt(nowNodeNumId) - 1];
  //第0层数据
  allLinks = {
    id: nowNodesInfo[1],
    nodesNum: 0,
    WhoisName: 0,
    WhoisEmail: 0,
    WhoisPhone: 0,
    pureDomain: 0,
    dirtyDomain: 0,
    numId: nowNodesInfo[0],
    name: nowNodesInfo[2],
    children: [],
  };
  //针对第0层数据的链路添加第一层数据
  for (let j of ICLinksInfo[nowNodeNumId]) {
    nowNodesInfo = nodeNumIdInfo[parseInt(j[1]) - 1];
    allLinks["children"].push({
      id: nowNodesInfo[1],
      nodesNum: j[2] - 2,
      WhoisName: j[5],
      WhoisEmail: j[6],
      WhoisPhone: j[7],
      pureDomain: j[3] - j[4],
      dirtyDomain: j[4],
      numId: nowNodesInfo[0],
      name: nowNodesInfo[2],
      children: [],
    });
    // 数据信息更新
    WhoisName = Math.max(WhoisName, j[5]);
    WhoisEmail = Math.max(WhoisEmail, j[6]);
    WhoisPhone = Math.max(WhoisPhone, j[7]);
    pureDomain = Math.max(pureDomain, j[3] - j[4]);
    dirtyDomain = Math.max(dirtyDomain, j[4]);
    skipNum = Math.max(skipNum, 1);
    //第二层数据
    for (let k of ICLinksInfo[j[1]]) {
      //如果第二层数据和第0层数据相等，则跳过：A-B-A
      if (k[1] == parseInt(nowNodeNumId)) {
        continue;
      }
      nowNodesInfo = nodeNumIdInfo[parseInt(k[1]) - 1];
      isInFirst = false;
      // 如果连接的节点出现在第一层，则表示三个节点互相连接
      if (allNodes1.indexOf(parseInt(k[1])) > 0) {
        isInFirst = true;
      }
      // 添加第二层相关数据
      allLinks["children"][allLinks["children"].length - 1]["children"].push({
        id: nowNodesInfo[1],
        nodesNum: k[2] - 2,
        WhoisName: k[5],
        WhoisEmail: k[6],
        WhoisPhone: k[7],
        pureDomain: k[3] - k[4],
        dirtyDomain: k[4],
        numId: nowNodesInfo[0],
        name: nowNodesInfo[2],
        isInFirst: isInFirst,
        children: [],
      });
      WhoisName = Math.max(WhoisName, k[5]);
      WhoisEmail = Math.max(WhoisEmail, k[6]);
      WhoisPhone = Math.max(WhoisPhone, k[7]);
      pureDomain = Math.max(pureDomain, k[3] - k[4]);
      dirtyDomain = Math.max(dirtyDomain, k[4]);
      skipNum = Math.max(skipNum, 2);
    }
  }
  allLinks["WhoisNameNum"] = WhoisName;
  allLinks["WhoisPhoneNum"] = WhoisPhone;
  allLinks["WhoisEmailNum"] = WhoisEmail;
  allLinks["pureDomainNum"] = pureDomain;
  allLinks["dirtyDomainNum"] = dirtyDomain;
  allLinks["skipNum"] = skipNum;
  fs.writeFile(
    nowPath + "ic-clue-data/" + nowNodeNumId + ".json",
    JSON.stringify(allLinks),
    "utf8"
  );
  return allLinks;
}

function getNodesInICLinks(
  nowPath,
  nowNodeNumId,
  ICLinksInfo,
  nodeNumIdInfo,
  ICAloneInfo
) {
  let allLinks = [];
  let listLinks = [];
  let listNode = [];
  // 获取当前节点所在的所有IC链路和单独的IC节点
  for (let i of nodeICLinks[nowNodeNumId]) {
    if (i instanceof Array) {
      listLinks.push(i);
    } else {
      listNode.push(i);
    }
  }
  //将IC链路进行拼接，获取每个IC节点出现的次数
  let nowICNode = [];
  for (let i of listLinks) {
    nowICNode = nowICNode.concat(i);
  }
  listLinks = listLinks.map((e) => JSON.stringify(e));
  // 获取所有出现的IC节点
  let nowICNodeSet = Array.from(new Set(nowICNode));
  let nowICNodeCount = [];
  for (let i of nowICNodeSet) {
    nowICNodeCount.push([i, nowICNode.filter((e) => e == i).length]);
  }
  // 对每个IC节点进行排序，以最高的开始进行循环
  nowICNodeCount = nowICNodeCount.sort((a, b) => {
    return b[1] - a[1];
  });

  // 所有的IC节点都已经循环过，且查阅过其相关联路
  while (nowICNodeSet.length > 0) {
    // 循环所有的IC节点，如果nowICNodeSet 没有该节点，表明该节点的链路已经存储
    for (let i of nowICNodeCount) {
      if (nowICNodeSet.indexOf(i[0]) < 0) {
        continue;
      }
      //删除相对应的节点
      nowICNodeSet = nowICNodeSet.filter((e) => e != i[0]);
      // 数据信息存储
      let WhoisName = 0;
      let WhoisEmail = 0;
      let WhoisPhone = 0;
      let pureDomain = 0;
      let dirtyDomain = 0;
      let skipNum = 0;
      // 获取当前IC节点直接关联的所有IC节点
      let allNodes1 = [];
      for (let j of ICLinksInfo[i[0]]) {
        allNodes1.push(j[1]);
      }
      let nowNodesInfo = nodeNumIdInfo[parseInt(i[0]) - 1];
      let nowLinks = {
        id: nowNodesInfo[1],
        nodesNum: 0,
        WhoisName: 0,
        WhoisPhone: 0,
        WhoisEmail: 0,
        pureDomain: 0,
        dirtyDomain: 0,
        numId: nowNodesInfo[0],
        name: nowNodesInfo[2],
        children: [],
      };
      //针对第0层数据的链路添加第一层数据
      for (let j of ICLinksInfo[i[0]]) {
        // 获取当前ICLinks的信息，并判断是否在listLinks，如果在则存储相关信息，并删除该边
        let nowICLink = [Math.min(j[0], j[1]), Math.max(j[0], j[1])];
        if (listLinks.indexOf(JSON.stringify(nowICLink)) < 0) {
          continue;
        }
        listLinks = listLinks.filter((e) => e != JSON.stringify(nowICLink));
        //存储相关链路，添加该节点的第二层数据，则表明第一层的节点信息已经存储过
        nowICNodeSet = nowICNodeSet.filter((e) => e != j[1]);
        nowNodesInfo = nodeNumIdInfo[parseInt(j[1]) - 1];
        nowLinks["children"].push({
          id: nowNodesInfo[1],
          nodesNum: j[2] - 2,
          WhoisName: j[5],
          WhoisEmail: j[6],
          WhoisPhone: j[7],
          pureDomain: j[3] - j[4],
          dirtyDomain: j[4],
          numId: nowNodesInfo[0],
          name: nowNodesInfo[2],
          children: [],
        });
        WhoisName = Math.max(WhoisName, j[5]);
        WhoisPhone = Math.max(WhoisPhone, j[6]);
        WhoisEmail = Math.max(WhoisEmail, j[7]);
        pureDomain = Math.max(pureDomain, j[3] - j[4]);
        dirtyDomain = Math.max(dirtyDomain, j[4]);
        skipNum = Math.max(skipNum, 1);
        // 对该节点进行进一步的循环
        for (let k of ICLinksInfo[j[1]]) {
          //如果节点和最初节点一直，则不进行保存：A-B-A
          if (k[1] == parseInt(i[0])) {
            continue;
          }

          // 获取当前ICLinks的信息，并判断是否在listLinks，如果在则存储相关信息，并删除该边
          nowICLink = [Math.min(k[0], k[1]), Math.max(k[0], k[1])];
          if (listLinks.indexOf(JSON.stringify(nowICLink)) < 0) {
            continue;
          }
          listLinks = listLinks.filter((e) => e != JSON.stringify(nowICLink));
          nowNodesInfo = nodeNumIdInfo[parseInt(k[1]) - 1];
          //当前节点在第一层出现过，则表示三个节点相互连接
          let isInFirst = false;
          if (allNodes1.indexOf(parseInt(k[1])) > 0) {
            isInFirst = true;
          }
          //存储相关信息
          nowLinks["children"][nowLinks["children"].length - 1][
            "children"
          ].push({
            id: nowNodesInfo[1],
            nodesNum: k[2] - 2,
            WhoisName: k[5],
            WhoisEmail: k[6],
            WhoisPhone: k[7],
            pureDomain: k[3] - k[4],
            dirtyDomain: k[4],
            numId: nowNodesInfo[0],
            name: nowNodesInfo[2],
            isInFirst: isInFirst,
            children: [],
          });
          WhoisName = Math.max(WhoisName, k[5]);
          WhoisPhone = Math.max(WhoisPhone, k[6]);
          WhoisEmail = Math.max(WhoisEmail, k[7]);
          pureDomain = Math.max(pureDomain, k[3] - k[4]);
          dirtyDomain = Math.max(dirtyDomain, k[4]);
          skipNum = Math.max(skipNum, 2);
        }
      }
      nowLinks["WhoisNameNum"] = WhoisName;
      nowLinks["WhoisPhoneNum"] = WhoisPhone;
      nowLinks["WhoisEmailNum"] = WhoisEmail;
      nowLinks["pureDomainNum"] = pureDomain;
      nowLinks["dirtyDomainNum"] = dirtyDomain;
      nowLinks["skipNum"] = skipNum;
      if (nowLinks["children"].length == 0) {
        continue;
      }
      allLinks.push(nowLinks);
    }
  }
  // 对于节点的单独信息，获取该单独IC路径的相关信息
  for (let i of listNode) {
    nowNodesInfo = nodeNumIdInfo[parseInt(i) - 1];
    nowNodeLinkInfo = ICAloneInfo[i];
    nowLinks = {
      id: nowNodesInfo[1],
      nodesNum: nowNodeLinkInfo[0],
      WhoisName: nowNodeLinkInfo[3],
      WhoisEmail: nowNodeLinkInfo[4],
      WhoisPhone: nowNodeLinkInfo[5],
      pureDomain: nowNodeLinkInfo[1],
      dirtyDomain: nowNodeLinkInfo[2],
      numId: nowNodesInfo[0],
      name: nowNodesInfo[2],
      children: [],
      WhoisNameNum: nowNodeLinkInfo[3],
      WhoisEmailNum: nowNodeLinkInfo[4],
      WhoisPhoneNum: nowNodeLinkInfo[5],
      pureDomainNum: nowNodeLinkInfo[1],
      dirtyDomainNum: nowNodeLinkInfo[2],
      skipNum: 0,
    };
    allLinks.push(nowLinks);
  }

  fs.writeFile(
    nowPath + "ic-clue-data/" + nowNodeNumId + ".json",
    JSON.stringify(allLinks),
    "utf8"
  );
  return allLinks;
}

// 获取主视图所需要的数据
// app.get("/getMainChartData", (req, res, next) => {
//   let node = "tiaozhan1";
//   let filedata = path.join(__dirname, "data/main-chart-data/" + node + ".json");
//   fs.readFile(filedata, "utf8", function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       let d = JSON.parse(data);

//       res.send(d);
//       res.end();
//     }
//   });
// });

// // 获取视图的初始数据：node信息
// app.get("/initial", (req, res, next) => {
//   res.send(nodeNumIdInfo);
//   res.end();
// });

// 获取视图的初始数据：node信息R
app.get("/getInitialSds", (req, res, next) => {
  let useNodeIdInfo = [];
  for (let i of nodeNumIdInfo) {
    useNodeIdInfo.push({
      numId: i[0],
      id: i[1],
      name: i[2],
      type: i[3],
      industry: i[4],
    });
  }
  res.send(useNodeIdInfo);
  res.end();
});

// // 获取冰柱图需要的数据
// app.post("/getIcClueDataSds", jsonParser, (req, res, next) => {
//   const spawn = require("child_process").spawn;
//   const pythonProcess = spawn("python", [
//     path.join(__dirname, "dataProcess/5. figure1.py"),
//     req.body.numId,
//     req.body.type,
//   ]);

//   pythonProcess.on("exit", () => {
//     let filedata = path.join(
//       __dirname,
//       "data/ic-clue-data/370.json"
//     );
//     fs.readFile(filedata, "utf-8", function (err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         let d = JSON.parse(data);
//         res.send(d);
//         res.end();
//       }
//     });
//   });
// });

// IC连接图所需要的数据
app.post("/getSkeletonChartDataSds", jsonParser, (req, res, next) => {
  let nodes = [];
  // 将传输的IC节点的NumID改为Int型
  for (let n of req.body.Nodes) {
    nodes.push(parseInt(n));
  }
  let nodesInfo = [];
  let linksInfo = [];
  for (let i of nodes) {
    const nowNodeInfo = nodeNumIdInfo[i - 1];
    let nowICIndustry = [];
    // 获取当前IC节点的黑灰产业信息
    for (let j of ICIndustry[i]) {
      nowICIndustry.push({
        industry: j[0],
        number: j[1],
      });
    }
    // 获取当前节点的所有信息
    nodesInfo.push({
      numId: i,
      id: nowNodeInfo[1],
      name: nowNodeInfo[2],
      type: nowNodeInfo[3],
      ICIndustry: nowICIndustry,
    });

    // 判断当前IC节点是否在IC链路中
    if (ICScreen[0].indexOf(i) > 0) {
      // 获取当前节点所在的链路信息
      for (let j of ICLinksInfo[i]) {
        if (nodes.indexOf(j[1]) > 0 && j[1] > j[0]) {
          linksInfo.push({
            source: nodeNumIdInfo[j[0] - 1][1],
            target: nodeNumIdInfo[j[1] - 1][1],
            linksNumId: [j[0], j[1]],
          });
        }
      }
    }
  }
  const sendData = {
    nodes: nodesInfo,
    links: linksInfo,
  };
  res.send(sendData);
  res.end();
});

// 主图所需要的数据
app.post("/getMainChartSds", jsonParser, (req, res, next) => {
  const links = req.body.linksInfo["links"];
  const nodes = req.body.linksInfo["nodes"];
  let nowJSource = 0;
  let nowData = [];
  let nodesNumId = new Set();
  let linksList = new Set();
  for (let i of links) {
    if (i["source"] != nowJSource) {
      let filedata = path.join(
        __dirname,
        "data/ICScreenLinks/" + i["linksNumId"][0] + ".json"
      );
      nowData = JSON.parse(fs.readFileSync(filedata, "utf-8"));
      nowJSource = i["source"];
    }
    for (let j of nowData) {
      if (j["end"][0] == i["linksNumId"][1]) {
        for (let k of j["nodes"]) {
          nodesNumId.add(k[0]);
        }

        //只存储链路的类型、Source和Target
        for (let k of j["links"]) {
          linksList.add([k[0], k[1], k[2]].toString());
        }
        break;
      }
    }
  }

  let nowNodes = [];
  let nowLinks = [];

  //针对每一个IC节点进行循环
  for (let i of nodes) {
    // 如果当前节点在IC链路中
    if (ICScreen[0].indexOf(i) > 0) {
      let nowNodeNodeInfo = {};
      let nowNodeLinksInfo = {};
      // 获取当前IC节点直接关联的所有节点，并删除已经在链路中的相关节点
      let nowNodeNeighbor = ICNeighbor[i["numId"]].filter((e) => {
        return !nodesNumId.has(e[0]);
      });
      // 针对这些进店进行分类
      for (let j of nowNodeNeighbor) {
        let nowNodeInfo = nodeNumIdInfo[j[0] - 1];
        // 当前节点为Domain类型，则根据其industry类型进行分类
        if (nowNodeInfo[3] == "Domain") {
          // 获取该种industry类型的Domain节点的数据
          if (!nowNodeNodeInfo.hasOwnProperty(nowNodeInfo[4])) {
            nowNodeNodeInfo[nowNodeInfo[4]] = {
              numId: parseInt(nowNodeInfo[0]),
              id: nowNodeInfo[1],
              name: nowNodeInfo[2],
              type: nowNodeInfo[3],
              industry: nowNodeInfo[4],
              nodeToICNumId: i["numId"],
              childrenNum: 0,
              children: [],
            };
            nowNodeLinksInfo[nowNodeInfo[4]] = {
              relation: j[1][0],
              source: nodeNumIdInfo[parseInt(j[1][1]) - 1][1],
              target: nodeNumIdInfo[parseInt(j[1][2]) - 1][1],
              linksNumId: [parseInt(j[1][1]), parseInt(j[1][2])],
              childrenNum: 0,
              children: [],
            };
          }
          // 将节点信息存储到对应的数据中
          nowNodeNodeInfo[nowNodeInfo[4]]["children"].push({
            numId: parseInt(nowNodeInfo[0]),
            id: nowNodeInfo[1],
            name: nowNodeInfo[2],
            type: nowNodeInfo[3],
            industry: nowNodeInfo[4],
          });
          nowNodeNodeInfo[nowNodeInfo[4]]["childrenNum"] += 1;

          nowNodeLinksInfo[nowNodeInfo[4]]["children"].push({
            relation: j[1][0],
            source: nodeNumIdInfo[parseInt(j[1][1]) - 1][1],
            target: nodeNumIdInfo[parseInt(j[1][2]) - 1][1],
            linksNumId: [parseInt(j[1][1]), parseInt(j[1][2])],
          });
          nowNodeLinksInfo[nowNodeInfo[4]]["childrenNum"] += 1;
        }
        // 如果不是Domain类型，则直接存储该节点和对应的链路
        else {
          nodesNumId.add(j[0]);
          linksList.add([j[1][0], j[1][1], j[1][2]].toString());
        }
      }

      for (let j in nowNodeNodeInfo) {
        nowNodes.push(nowNodeNodeInfo[j]);
      }
      for (let j in nowNodeLinksInfo) {
        nowLinks.push(nowNodeLinksInfo[j]);
      }
    }
  }

  //针对每一个IC节点进行循环
  for (let i of nodes) {
    //如果当前节点不在IC链路中，即当前节点单独的IC节点
    if (ICScreen[0].indexOf(i) < 0) {
      filedata = path.join(
        __dirname,
        "data/ICAloneLinks/" + i["numId"] + ".json"
      );
      nowData = JSON.parse(fs.readFileSync(filedata, "utf-8"));
      for (j of nowData["nodes"]) {
        nodesNumId.add(j[0]);
      }
      for (j of nowData["links"]) {
        linksList.add([j[0], j[1], j[2]].toString());
      }
    }
  }

  //针对所有的节点进行存储
  for (let i of nodesNumId) {
    let nowNodeInfo = nodeNumIdInfo[i - 1];
    nowNodes.push({
      numId: parseInt(nowNodeInfo[0]),
      id: nowNodeInfo[1],
      name: nowNodeInfo[2],
      type: nowNodeInfo[3],
      industry: nowNodeInfo[4],
    });
  }
  //针对所有的链路进行存储
  for (let i of linksList) {
    i = i.split(",");
    nowLinks.push({
      relation: i[0],
      source: nodeNumIdInfo[parseInt(i[1]) - 1][1],
      target: nodeNumIdInfo[parseInt(i[2]) - 1][1],
      linksNumId: [parseInt(i[1]), parseInt(i[2])],
    });
  }
  let sendData = {
    nodes: nowNodes,
    links: nowLinks,
  };
  res.send(sendData);
  res.end();
});

app.post("/getBulletChartDataSds", jsonParser, (req, res, next) => {
  // 周艺璇画的图的相关数据
  // 获取node和links信息
  const initialLinks = req.body.nodesLinksInfo["links"];
  const initialNodes = req.body.nodesLinksInfo["nodes"];
  let links = [];
  let nodes = [];
  for (let i of initialLinks) {
    //如果links有children，表明该links为融合连接，获取其内部信息
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        links.push(j);
      }
    } else {
      links.push(i);
    }
  }
  for (let i of initialNodes) {
    //如果nodes有children，表明该nodes为融合连接，获取其内部信息
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        nodes.push(j);
      }
    } else {
      nodes.push(i);
    }
  }

  //定义存储数据的参数
  let r_cert_chain = 0;
  let r_cert = 0;
  let r_whois_name = 0;
  let r_whois_phone = 0;
  let r_whois_email = 0;
  let r_cname = 0;
  let r_request_jump = 0;
  let r_subdomain = 0;
  let r_dns_a = 0;
  let r_cidr = 0;
  let r_asn = 0;
  let certAsTarget = new Set();
  let certAsSource = new Set();
  let whoisName = new Set();
  let whoisEmail = new Set();
  let whoisPhone = new Set();
  let domainAsCnameTarget = new Set();
  let domainAsJumpTarget = new Set();
  let domainAsSubTarget = new Set();
  let domainAsSource = new Set();
  let ip = new Set();
  let ipc = new Set();
  let asn = new Set();
  for (let i of links) {
    //如果为r_cert_chain，则将source作为certAsSource，target作为certAsTarget
    if (i["relation"] == "r_cert_chain") {
      r_cert_chain += 1;
      certAsSource.add(i[1]);
      certAsTarget.add(i[2]);
    }
    //如果为r_cert，则将source作为domainAsSource
    else if (i["relation"] == "r_cert") {
      r_cert += 1;
      domainAsSource.add(i[1]);
    }
    //如果为r_whois_name，则将source作为domainAsSource，target作为whoisName
    else if (i["relation"] == "r_whois_name") {
      r_whois_name += 1;
      domainAsSource.add(i[1]);
      whoisName.add(i[2]);
    }
    //如果为r_whois_email，则将source作为domainAsSource，target作为whoisEmail
    else if (i["relation"] == "r_whois_email") {
      r_whois_email += 1;
      domainAsSource.add(i[1]);
      whoisEmail.add(i[2]);
    }
    //如果为r_whois_phone，则将source作为domainAsSource，target作为whoisPhone
    else if (i["relation"] == "r_whois_phone") {
      r_whois_phone += 1;
      domainAsSource.add(i[1]);
      whoisPhone.add(i[2]);
    }
    //如果为r_cname，则将source作为domainAsSource，target作为domainAsCnameTarget
    else if (i["relation"] == "r_cname") {
      r_cname += 1;
      domainAsSource.add(i[1]);
      domainAsCnameTarget.add(i[2]);
    }
    //如果为r_request_jump，则将source作为domainAsSource，target作为domainAsJumpTarget
    else if (i["relation"] == "r_request_jump") {
      r_request_jump += 1;
      domainAsSource.add(i[1]);
      domainAsJumpTarget.add(i[2]);
    }
    //如果为r_subdomain，则将source作为domainAsSource，target作为domainAsSubTarget
    else if (i["relation"] == "r_subdomain") {
      r_subdomain += 1;
      domainAsSource.add(i[1]);
      domainAsSubTarget.add(i[2]);
    }
    //如果为r_dns_a，则将source作为domainAsSource，target作为ip
    else if (i["relation"] == "r_dns_a") {
      r_dns_a += 1;
      domainAsSource.add(i[1]);
      ip.add(i[2]);
    }
    //如果为r_cidr，则将source作为domainAsSource，target作为ipc
    else if (i["relation"] == "r_cidr") {
      r_cidr += 1;
      ip.add(i[1]);
      ipc.add(i[2]);
    }
    //如果为r_asn，则将source作为domainAsSource，target作为asn
    else if (i["relation"] == "r_asn") {
      r_asn += 1;
      ip.add(i[1]);
      asn.add(i[2]);
    }
  }
  // 将domainAsSource该为list，并删除所有的domainaAsXxTarget中出现的numId
  domainAsSource = Array.from(domainAsSource);
  domainAsSource = domainAsSource.filter((e) => {
    return (
      !domainAsCnameTarget.has(e) &&
      !domainAsJumpTarget.has(e) &&
      !domainAsSubTarget.has(e)
    );
  });

  const linksList = [
    {
      title: "certChain",
      measures: [r_cert_chain],
      markers: [7],
    },
    {
      title: "cert",
      measures: [r_cert],
      markers: [50],
    },
    {
      title: "WhoisName",
      measures: [r_whois_name],
      markers: [5],
    },
    {
      title: "whoisPhone",
      measures: [r_whois_phone],
      markers: [3],
    },
    {
      title: "whoisEmail",
      measures: [r_whois_email],
      markers: [2],
    },
    {
      title: "cname",
      measures: [r_cname],
      markers: [10],
    },
    {
      title: "requestJump",
      measures: [r_request_jump],
      markers: [5],
    },
    {
      title: "subdomain",
      measures: [r_subdomain],
      markers: [150],
    },

    {
      title: "dnsA",
      measures: [r_dns_a],
      markers: [150],
    },
    {
      title: "cidr",
      measures: [r_cidr],
      markers: [3],
    },
    {
      title: "asn",
      measures: [r_asn],
      markers: [3],
    },
  ];
  const nodesList = [
    {
      title: "certT",
      measures: [certAsTarget.size],
      markers: [3],
    },
    {
      title: "certS",
      measures: [certAsSource.size],
      markers: [7],
    },
    {
      title: "whoisName",
      measures: [whoisName.size],
      markers: [3],
    },
    {
      title: "whoisEmail",
      measures: [whoisEmail.size],
      markers: [2],
    },
    {
      title: "whoisPhone",
      measures: [whoisPhone.size],
      markers: [2],
    },
    {
      title: "domainCT",
      measures: [domainAsCnameTarget.size],
      markers: [10],
    },
    {
      title: "domainJT",
      measures: [domainAsJumpTarget.size],
      markers: [2],
    },
    {
      title: "domainST",
      measures: [domainAsSubTarget.size],
      markers: [50],
    },
    {
      title: "domainS",
      measures: [domainAsSource.length],
      markers: [30],
    },
    {
      title: "IP",
      measures: [ip.size],
      markers: [7],
    },
    {
      title: "ipc",
      measures: [ipc.size],
      markers: [2],
    },
    {
      title: "asn",
      measures: [asn.size],
      markers: [3],
    },
  ];
  nodeNum = 0;
  for (let i of nodesList) {
    nodeNum += i["measures"][0];
  }
  console.log(nodes.length);
  console.log(nodeNum);
  const sendData = [linksList, nodesList];
  res.send(sendData);
  res.end();
});

app.post("/getInfoListSds", jsonParser, (req, res, next) => {
  let numnode = 0;
  let numlink = 0;
  let groupscope = "";
  let industrytype = new Set();
  let grouptype = "单一型";
  // 获取node和links信息
  const initialLinks = req.body.nodesLinksInfo["links"];
  const initialNodes = req.body.nodesLinksInfo["nodes"];
  let links = [];
  let nodes = [];
  for (let i of initialLinks) {
    //如果links有children，表明该links为融合连接，获取其内部信息
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        links.push(j);
      }
    } else {
      links.push(i);
    }
  }
  for (let i of initialNodes) {
    //如果nodes有children，表明该nodes为融合连接，获取其内部信息
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        nodes.push(j);
      }
    } else {
      nodes.push(i);
    }
  }
  // 获取节点和链路的长度
  numnode = nodes.length;
  numlink = links.length;

  if (numnode < 300) {
    groupscope = "小";
  } else if (numnode < 800) {
    groupscope = "中";
  } else if (numnode < 3000) {
    groupscope = "大";
  } else {
    groupscope = "超大";
  }
  // 获取industry数据，并删除空产业
  for (let i of nodes) {
    industrytype.add(i["industry"].replace("\r", ""));
  }

  if (industrytype.has("  ")) {
    industrytype.delete("  ");
  }
  if (industrytype.size > 1) {
    grouptype = "复合型";
  }

  sendData = {
    numnode: numnode,
    numlink: numlink,
    groupscope: groupscope,
    industrytype: Array.from(industrytype),
    grouptype: grouptype,
  };
  res.send(sendData);
  res.end();
});

// 获取差异图的数据
// app.post("/getDifChartSds", jsonParser, (req, res, next) => {
//   let ICLinks = JSON.parse(data);
//   let linksInfo = req.body.linksInfo;
//   let diffData = [];
//   for (let i of linksInfo["links"]) {
//     let difDataNow = {};
//     for (let j of linksInfo["nodes"]) {
//       if (j["id"] == i["source"] || j["id"] == i["target"]) {
//         difDataNow[j["numId"]] = {
//           name: j["name"],
//           numId: j["numId"],
//           id: j["id"],
//           value: {},
//         };
//         for (let k of j["ICIndustry"]) {
//           difDataNow[j["numId"]]["value"][k["industry"]] = k["number"];
//         }
//         if (difDataNow.length == 2) {
//           break;
//         }
//       }
//     }
//     for (let j of ICLinks[i["linksNumId"][0]]) {
//       if (j[1] == i["linksNumId"][1]) {
//         difDataNow[i["source"] + " " + i["target"]] = {
//           name:
//             difDataNow[i["linksNumId"][0]]["name"] +
//             " " +
//             difDataNow[i["linksNumId"][1]]["name"],
//           numId: i["linksNumId"][0].toString() + "," + i["linksNumId"][1],
//           id: i["source"] + " " + i["target"],
//           value: {},
//         };
//         for (let k of j[j.length - 1]) {
//           if (k[0] != "  ") {
//             difDataNow[i["source"] + " " + i["target"]]["value"][k[0]] =
//               k[1];
//             if (
//               difDataNow[i["linksNumId"][0]]["value"].hasOwnProperty(k[0])
//             ) {
//               difDataNow[i["linksNumId"][0]]["value"][k[0]] -= k[1];
//               difDataNow[i["linksNumId"][0]]["value"][k[0]] = Math.max(
//                 difDataNow[i["linksNumId"][0]]["value"][k[0]],
//                 0
//               );
//             }
//             if (
//               difDataNow[i["linksNumId"][1]]["value"].hasOwnProperty(k[0])
//             ) {
//               difDataNow[i["linksNumId"][1]]["value"][k[0]] -= k[1];
//               difDataNow[i["linksNumId"][1]]["value"][k[0]] = Math.max(
//                 difDataNow[i["linksNumId"][1]]["value"][k[0]],
//                 0
//               );
//             }
//           }
//         }
//         break;
//       }
//     }
//     let difDataUseNow = [];
//     for (let key in difDataNow) {
//       j = difDataNow[key];
//       let difDataOneNow = {
//         name: j["name"],
//         numId: j["numId"],
//         id: j["id"],
//         value: [],
//       };
//       for (let k in j["value"]) {
//         difDataOneNow["value"].push({
//           name: k,
//           value: j["value"][k],
//         });
//       }
//       difDataUseNow.push(difDataOneNow);
//     }
//     diffData.push(difDataUseNow);
//   }
//   res.send(diffData);
//   res.end();
// });

// // 读取BulletChart样例数据
// app.get("/getBulletChartData", (req, res) => {
//   let filepath = path.join(
//     __dirname,
//     "data/bullet-chart-data/example-simplify.json"
//   );
//   fs.readFile(filepath, "utf-8", function (err, data) {
//     if (err) {
//       console.error(err);
//     } else {
//       let jsonData = JSON.parse(data);
//       res.send(jsonData);
//       res.end();
//     }
//   });
// });

app.post("/getFinalDataSds", jsonParser, (req, res, next) => {
  // 获取node和links信息
  const initialLinks = req.body.nodesLinksInfo["links"];
  const initialNodes = req.body.nodesLinksInfo["nodes"];
  let links = [];
  let nodes = [];
  for (let i of initialLinks) {
    //如果links有children，表明该links为融合连接，获取其内部信息
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        links.push(j);
      }
    } else {
      links.push(i);
    }
  }
  for (let i of initialNodes) {
    //如果nodes有children，表明该nodes为融合连接，获取其内部信息
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        nodes.push(j);
      }
    } else {
      nodes.push(i);
    }
  }

  let num_all_node = 0;
  num_all_node = nodes.length;
  // 节点的类型，8个
  let node_type = [
    "Domain",
    "IP",
    "Cert",
    "Whois_Name",
    "Whois_Phone",
    "Whois_Email",
    "IP_C",
    "ASN",
  ];
  let node_num = [];
  // 获取每个类型的节点的数量
  for (let i of node_type) {
    node_num.push(
      nodes.filter((e) => {
        return e[3] == i;
      }).length
    );
  }
  let node_all_link = 0;
  node_all_link = links.length;
  //链路的类型
  let link_type = [
    "r_request_jump",
    "r_subdomain",
    "r_cname",
    "r_dns_a",
    "r_cidr",
    "r_cert",
    "r_cert_chain",
    "r_whois_name",
    "r_whois_phone",
    "r_whois_email",
    "r_asn",
  ];
  let links_num = [];
  //获取每个类型的链路的数据
  for (let i of link_type) {
    links_num.push(
      links.filter((e) => {
        return e[0] == i;
      }).length
    );
  }

  let groupscope = "";
  if (numnode < 300) {
    groupscope = "小";
  } else if (numnode < 800) {
    groupscope = "中";
  } else if (numnode < 3000) {
    groupscope = "大";
  } else {
    groupscope = "超大";
  }

  let industrytype = new Set();
  let group_type = "单一型";
  let industryTypeAll = {
    A: "涉黄",
    B: "涉赌",
    C: "诈骗",
    D: "涉毒",
    E: "涉枪",
    F: "黑客",
    G: "非法交易平台",
    H: "非法支付平台",
    I: "其他",
  };
  let industry_type = [];
  // 获取涉及的黑灰产的类型
  for (let i of nodes) {
    let a = i[4].split("");
    for (let j of a) {
      industrytype.add(j);
    }
  }
  if (industrytype.has(" ")) {
    industrytype.delete(" ");
  }

  if (industrytype.size > 1) {
    group_type = "复合型";
  }
  // 获取其涉及的黑灰产的内容
  for (let i of industrytype) {
    industry_type.push(industryTypeAll[i]);
  }
  let sendData = {
    groupscope: groupscope,
    clue: nodes[0][1],
    num_all_node: num_all_node,
    node_type: node_type,
    node_num: node_num,
    node_all_link: node_all_link,
    link_type: link_type,
    links_num: links_num,
    industry_type: industry_type,
    num_industry: industry_type.length,
    group_type: group_type,
  };
  res.send(sendData);
  res.end();
});

app.post("/getDetialListSds", jsonParser, (req, res, next) => {
  const initialLinks = req.body.nodesLinksInfo["links"];
  const initialNodes = req.body.nodesLinksInfo["nodes"];
  let links = [];
  let nodes = [];
  for (let i of initialLinks) {
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        links.push(j);
      }
    } else {
      links.push(i);
    }
  }
  for (let i of initialNodes) {
    if (i.hasOwnProperty("children")) {
      for (let j of i["children"]) {
        nodes.push(j);
      }
    } else {
      nodes.push(i);
    }
  }
  let nodesInfo = {};
  for (let i of nodes) {
    nodesInfo[i["numId"]] = {
      numId: i["numId"],
      id: i["id"],
      name: i["name"],
      type: i["type"],
      industry: i["industry"],
      isCore: true,
      LinksInfo: [],
    };
  }
  for (let i of links) {
    nodesInfo[i["linksNumId"][0]]["LinksInfo"].push(i["relation"]);
    nodesInfo[i["linksNumId"][1]]["LinksInfo"].push(i["relation"]);
  }
  const LinksSet = [
    "r_cert",
    "r_subdomain",
    "r_request_jump",
    "r_dns_a",
    "r_whois_name",
    "r_whois_email",
    "r_whois_phone",
    "r_cert_chain",
    "r_cname",
    "r_asn",
    "r_cidr",
  ];
  for (let i in nodesInfo) {
    for (let j of LinksSet) {
      nodesInfo[i][j] = nodesInfo[i]["LinksInfo"].filter((e) => {
        return e == j;
      }).length;
    }
  }
  let nowNodes = [];
  for (let i in nodesInfo) {
    delete nodesInfo[i]["LinksInfo"];
    nowNodes.push(nodesInfo[i]);
  }
  let nowLinks = [];
  for (let i of links) {
    nowLinks.push({
      relation: i["relation"],
      source: i["source"],
      target: i["target"],
      linksNumId: i["linksNumId"],
      isCore: true,
    });
  }
  let sendData = {
    nodes: nowNodes,
    links: nowLinks,
  };
  res.send(sendData);
  res.end();
});

// 获取冰柱图的数据
app.post("/getIcClueData2Sds", jsonParser, (req, res, next) => {
  let filedata = path.join(
    __dirname,
    "data/ic-clue-data/" + req.body.numId + ".json"
  );
  let nowPath = path.join(__dirname, "data/");
  let sendData;
  if (!fs.existsSync(filedata)) {
    if (req.body.type == "IP" || req.body.type == "Cert") {
      sendData = getIPCertLinksInSkip2(
        nowPath,
        req.body.numId,
        ICLinksInfo,
        nodeNumIdInfo
      );
    } else {
      sendData = getNodesInICLinks(
        nowPath,
        req.body.numId,
        ICLinksInfo,
        nodeNumIdInfo,
        ICAloneInfo
      );
    }
    res.send(sendData);
    res.end;
  } else {
    fs.readFile(filedata, "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let d = JSON.parse(data);
        res.send(d);
        res.end();
      }
    });
  }
});

app.post("/getClueDenseDataSds", jsonParser, (req, res, next) => {
  let filepath = path.join(__dirname, "data/ICDomainInfo.json");
  fs.readFile(filepath, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let d = JSON.parse(data);
      res.send(d[0]);
      res.end();
    }
  });
});
