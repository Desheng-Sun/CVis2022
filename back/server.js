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
let ICIndustryP = path.join(__dirname, "data/nodeIndustryInfo2.json");
let ICIndustryJ = fs.readFileSync(ICIndustryP, "utf8");
const ICIndustry = JSON.parse(ICIndustryJ);

// 获取主视图所需要的数据
app.get("/getMainChartData", (req, res, next) => {
  let node = "tiaozhan1";
  let filedata = path.join(__dirname, "data/main-chart-data/" + node + ".json");
  fs.readFile(filedata, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let d = JSON.parse(data);
      res.send(d);
      res.end();
    }
  });
});

// 获取视图的初始数据：node信息
app.get("/initial", (req, res, next) => {
  res.send(nodeNumIdInfo);
  res.end();
});
// 获取视图的初始数据：node信息R
app.get("/getInitialSds", (req, res, next) => {
  res.send(nodeNumIdInfo);
  res.end();
});

// 获取冰柱图需要的数据
app.post("/getIcClueDataSds", jsonParser, (req, res, next) => {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", [
    path.join(__dirname, "dataProcess/5. figure1.py"),
    req.body.numId,
    req.body.type,
  ]);
  pythonProcess.on("exit", () => {
    let filedata = path.join(
      __dirname,
      "data/ic-clue-data/" + req.body.numId + ".json"
    );
    fs.readFile(filedata, "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let d = JSON.parse(data);
        res.send(d[0]);
        res.end();
      }
    });
  });
});

// IC连接图所需要的数据
app.post("/getSkeletonChartDataSds", jsonParser, (req, res, next) => {
  let filedata = path.join(__dirname, "data/nodesToNodesGraph1.json");
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let ICLinks = JSON.parse(data);
      let nodes = [];
      for (let n of req.body.Nodes) {
        nodes.push(parseInt(n));
      }
      let nodesInfo = [];
      let linksInfo = [];
      for (let i of nodes) {
        const nowNodeInfo = nodeNumIdInfo[i - 1];
        let nowICIndustry = [];
        for (let j of ICIndustry[i]) {
          nowICIndustry.push({
            industry: j[0],
            number: j[1],
          });
        }
        nodesInfo.push({
          numId: i,
          id: nowNodeInfo[1],
          name: nowNodeInfo[2],
          ICIndustry: nowICIndustry,
        });
        for (let j of ICLinks[i]) {
          if (req.body.Nodes.includes(j[1]) && j[1] > j[0]) {
            linksInfo.push({
              source: nodeNumIdInfo[j[0] - 1][1],
              target: nodeNumIdInfo[j[1] - 1][1],
            });
          }
        }
      }
      res.send({ nodes: nodesInfo, links: linksInfo });
      res.end();
    }
  });
});

// 主图所需要的数据
app.post("/getMainChartSds", jsonParser, (req, res, next) => {
  const links = req.body.links;
  const nodes = req.body.nodes;
  let nowJSource = 0;
  let nowData = [];
  let nodesNumId = new Set();
  let linksList = new Set();
  for (let i of links) {
    if (i["source"] != nowJSource) {
      let filedata = path.join(
        __dirname,
        "data/ICScreenLinks/" + i["source"] + ".json"
      );
      nowData = JSON.parse(fs.readFileSync(filedata, "utf-8"));
      nowJSource = i["source"];
    }
    for (let j of nowData) {
      if (j["end"][0] == i["target"]) {
        for (let k of j["nodes"]) {
          nodesNumId.add(k[0]);
        }
        for (let k of j["links"]) {
          linksList.add(k.toString());
        }
        break;
      }
    }
  }

  filedata = path.join(
    __dirname,
    "dataChinaVis Data Challenge 2022-mini challenge 1-Datase/nodeNneighbor.json"
  );
  nowData = JSON.parse(fs.readFileSync(filedata, "utf-8"));
  for (let i of nodes) {
    let nowNodeNodeInfo = {};
    let nowNodeLinksInfo = {};
    let nowNodeNeighbor = nowData[i["numId"]].filter((e) => {
      return !nodesNumId.has(e[0]);
    });
    for (let j of nowNodeNeighbor) {
      let nowNodeInfo = nodeNumIdInfo[j - 1];
      if (nowNodeInfo[2] == "Domain") {
        if (!nowNodeNodeInfo.hasOwnProperty(nowNodeInfo[4])) {
          nowNodeNodeInfo[nowNodeInfo[4]] = {
            numId: nowNodeInfo[0],
            id: nowNodeInfo[1],
            type: nowNodeInfo[2],
            industry: nowNodeInfo[4],
            num: 1,
            children: [],
          };
          nowNodeLinksInfo[nowNodeInfo[4]] = {
            r_relation: "r_dns_a",
            source: nowNodeInfo[0],
            target: j,
            children: [],
          };
        }
        nowNodeNodeInfo[nowNodeInfo[4]]["num"] += 1;
        nowNodeNodeInfo[nowNodeInfo[4]]["children"].push({
          numId: nowNodeInfo[0],
          id: nowNodeInfo[1],
          type: nowNodeInfo[2],
          name: nowNodeInfo[3],
          industry: nowNodeInfo[4],
        });
        nowNodeLinksInfo[nowNodeInfo[4]]["children"].push(j[1].toString);
      } else {
        nodesNumId.add(nowNodeInfo[0]);
        linksList.add(j[1].toString());
      }
    }
  }
});

app.post("/getBulletChartDataSds", jsonParser, (req, res, next) => {
  // 周艺璇画的图的相关数据
  let communityInfo = req.body.nodesLinksInfo; //传的参数，社区的节点和链接信息
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
  for (let i of communityInfo["links"]) {
    if (i[0] == "r_cert_chain") {
      r_cert_chain += 1;
      certAsSource.add(i[1]);
      certAsTarget.add(i[2]);
    } else if (i[0] == "r_cert") {
      r_cert += 1;
      domainAsSource.add(i[1]);
    } else if (i[0] == "r_whois_name") {
      r_whois_name += 1;
      domainAsSource.add(i[1]);
      whoisName.add(i[2]);
    } else if (i[0] == "r_whois_email") {
      r_whois_email += 1;
      domainAsSource.add(i[1]);
      whoisEmail.add(i[2]);
    } else if (i[0] == "r_whois_phone") {
      r_whois_phone += 1;
      domainAsSource.add(i[1]);
      whoisPhone.add(i[2]);
    } else if (i[0] == "r_cname") {
      r_cname += 1;
      domainAsSource.add(i[1]);
      domainAsCnameTarget.add(i[2]);
    } else if (i[0] == "r_request_jump") {
      r_request_jump += 1;
      domainAsSource.add(i[1]);
      domainAsJumpTarget.add(i[2]);
    } else if (i[0] == "r_subdomain") {
      r_subdomain += 1;
      domainAsSource.add(i[1]);
      domainAsSubTarget.add(i[2]);
    } else if (i[0] == "r_dns_a") {
      r_dns_a += 1;
      domainAsSource.add(i[1]);
      ip.add(i[2]);
    } else if (i[0] == "r_cidr") {
      r_cidr += 1;
      ip.add(i[1]);
      ipc.add(i[2]);
    } else if (i[0] == "r_asn") {
      r_asn += 1;
      ip.add(i[1]);
      asn.add(i[2]);
    }
  }
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
      maesures: [r_cert_chain],
      markes: [7],
    },
    {
      title: "cert",
      maesures: [r_cert],
      markes: [50],
    },
    {
      title: "WhoisName",
      maesures: [r_whois_name],
      markes: [5],
    },
    {
      title: "whoisPhone",
      maesures: [r_whois_phone],
      markes: [3],
    },
    {
      title: "whoisEmail",
      maesures: [r_whois_email],
      markes: [2],
    },
    {
      title: "cname",
      maesures: [r_cname],
      markes: [10],
    },
    {
      title: "requestJump",
      maesures: [r_request_jump],
      markes: [5],
    },
    {
      title: "subdomain",
      maesures: [r_subdomain],
      markes: [150],
    },

    {
      title: "dnsA",
      maesures: [r_dns_a],
      markes: [150],
    },
    {
      title: "cidr",
      maesures: [r_cidr],
      markes: [3],
    },
    {
      title: "asn",
      maesures: [r_asn],
      markes: [3],
    },
  ];
  const nodesList = [
    {
      title: "certT",
      maesures: [certAsTarget.size],
      markes: [3],
    },
    {
      title: "cetrS",
      maesures: [certAsSource.size],
      markes: [7],
    },
    {
      title: "whoisName",
      maesures: [whoisName.size],
      markes: [3],
    },
    {
      title: "whoisEmail",
      maesures: [whoisEmail.size],
      markes: [2],
    },
    {
      title: "whoisPhone",
      maesures: [whoisPhone.size],
      markes: [2],
    },
    {
      title: "domainCT",
      maesures: [domainAsCnameTarget.size],
      markes: [10],
    },
    {
      title: "domainJT",
      maesures: [domainAsJumpTarget.size],
      markes: [2],
    },
    {
      title: "domainST",
      maesures: [domainAsSubTarget.size],
      markes: [50],
    },
    {
      title: "domainS",
      maesures: [domainAsSource.size],
      markes: [30],
    },
    {
      title: "IP",
      maesures: [ip.size],
      markes: [7],
    },
    {
      title: "ipc",
      maesures: [ipc.size],
      markes: [2],
    },
    {
      title: "asn",
      maesures: [asn.size],
      markes: [3],
    },
  ];
  res.send([linksList, nodesList]);
  res.end();
});

app.post("/getInfoListSds", jsonParser, (req, res, next) => {
  let numnode = 0;
  let numlink = 0;
  let groupscope = "";
  let industrytype = new Set();
  let grouptype = "单一型";
  let communityInfo = req.body.nodesLinksInfo; //传的参数，社区的节点和链接信息
  numnode = communityInfo["nodes"].length;
  numlink = communityInfo["links"].length;

  if (numnode < 300) {
    groupscope = "小";
  } else if (numnode < 800) {
    groupscope = "中";
  } else {
    groupscope = "大";
  }
  for (let i of communityInfo["nodes"]) {
    industrytype.add(i[4]);
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

app.post("/getDifChartSds", jsonParser, (req, res, next) => {
  let filedata = path.join(__dirname, "data/nodesToNodesGraph1.json");
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let ICLinks = JSON.parse(data);
      let linksInfo = req.body.linksInfo;
      let diffData = [];
      for (let i of linksInfo["links"]) {
        let difDataNow = {};
        for (let j of linksInfo["nodes"]) {
          if (j["numId"] == i["source"] || j["numId"] == i["target"]) {
            difDataNow[j["numId"]] = {
              name: j["name"],
              numID: j["numId"],
              id: j["id"],
              value: {},
            };
            for (let k of j["ICIndustry"]) {
              difDataNow[j["numId"]]["value"][k["industry"]] = k["number"];
            }
            if (difDataNow.length == 2) {
              break;
            }
          }
        }
        for (let j of ICLinks[i["target"]]) {
          if (j[1] == i["source"]) {
            difDataNow[i["source"].toString() + i["target"]] = {
              numId: i["source"].toString() + i["target"],
              name:
                difDataNow[i["target"]]["name"] +
                " " +
                difDataNow[i["source"]]["name"],
              id:
                difDataNow[i["target"]]["id"] +
                " " +
                difDataNow[i["source"]]["id"],
              value: {},
            };
            for (let k of j[j.length - 1]) {
              if (k[0] != "  ") {
                difDataNow[i["source"].toString() + i["target"]]["value"][
                  k[0]
                ] = k[1];
                if (k[0] in difDataNow[i["source"]]["value"]) {
                  difDataNow[i["source"]]["value"][k[0]] -= k[1];
                }
                if (k[0] in difDataNow[i["target"]]["value"]) {
                  difDataNow[i["target"]]["value"][k[0]] -= k[1];
                }
              }
            }
            break;
          }
        }
        let difDataUseNow = [];
        for (let key in difDataNow) {
          j = difDataNow[key];
          let difDataOneNow = {
            name: j["names"],
            numId: j["numId"],
            id: j["id"],
            value: [],
          };
          for (let k in j["value"]) {
            difDataOneNow["value"].push({
              name: k,
              value: j["value"][k],
            });
          }
          difDataUseNow.push(difDataOneNow);
        }
        diffData.push(difDataUseNow);
      }
      res.send(diffData);
      res.end();
    }
  });
});

// 获取冰柱图所需要的数据
app.get("/getIcClueDataSds", (req, res) => {
  let filename = "3";
  let filedata = path.join(
    __dirname,
    "data/ic-clue-data/" + filename + ".json"
  );
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let jsonData = JSON.parse(data);
      res.send(jsonData);
      res.end();
    }
  });
});

// 读取BulletChart样例数据
app.get("/getBulletChartData", (req, res) => {
  let filepath = path.join(
    __dirname,
    "data/bullet-chart-data/example-simplify.json"
  );
  fs.readFile(filepath, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let jsonData = JSON.parse(data);
      res.send(jsonData);
      res.end();
    }
  });
});

app.post("/getFinalDataSds", jsonParser, (req, res, next) => {
  const links = req.body.nodesLinksInfo["links"];
  const nodes = req.body.nodesLinksInfo["nodes"];
  let num_all_node = 0;
  num_all_node = nodes.length;
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
  for (let i of node_type) {
    node_num.push(
      nodes.filter((e) => {
        return e[3] == i;
      }).length
    );
  }
  let node_all_link = 0;
  node_all_link = links.length;
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
  for (let i of link_type) {
    links_num.push(
      links.filter((e) => {
        return e[0] == i;
      }).length
    );
  }

  let groupscope = "";
  if (num_all_node < 300) {
    groupscope = "小";
  } else if (num_all_node < 800) {
    groupscope = "中";
  } else {
    groupscope = "大";
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
  const links = req.body.nodesLinksInfo["links"];
  const nodes = req.body.nodesLinksInfo["nodes"];
  let nodesInfo = {};
  for (let i of nodes) {
    nodesInfo[i[0]] = {
      numId: i[0],
      id: i[1],
      name: i[2],
      type: i[3],
      industry: i[4],
      isCore: true,
      LinksInfo: [],
    };
  }
  for (let i of links) {
    nodesInfo[i[1]]["LinksInfo"].push(i[0]);
    nodesInfo[i[2]]["LinksInfo"].push(i[0]);
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
  let sendData = [];
  for (let i in nodesInfo) {
    delete nodesInfo[i]["linksInfo"];
    sendData.push(nodesInfo[i]);
  }
  res.send(sendData);
  res.end();
});
