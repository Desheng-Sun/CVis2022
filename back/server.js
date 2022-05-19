const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const Database = require("arangojs").Database;
const username = "root";
const password = "123456";
const port = 3008;

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

const nodeInfoJ = fs.readFileSync(path.join(__dirname, 'data/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv'),'utf8')
const nodeNumIdInfo = json.parse(nodeInfoJ)

let ICIndustryP = path.join(__dirname, 'data/nodeIndustryInfo2.json')
let ICIndustryJ = fs.readFileSync(ICIndustryP, 'utf8')
const ICIndustry = JSON.parse(ICIndustryJ)



// 获取视图的初始数据：node信息
app.get("/initial", (req, res, next) => {
    res.send(nodeNumIdInfo)
    res.end()
})

// 获取冰柱图需要的数据
app.get("ic-clue-data", (req, res, next) =>{
  const spawn = require('child_process').spawn;
  spawn('python',[path.join(__dirname, 'dataProcess/figure1.py'), req.query.numId, req.query.type])
  let filedata = path.join(__dirname, 'data/ic-clue-data/' + str(req.query.numId) + ".json")
  fs.readFile(filedata, 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let d = JSON.parse(data)
      res.send(d)
      res.end()
    }
  })
})

// IC连接图所需要的数据
app.get("skeleton-chart", (req, res, next) =>{
  let filedata = path.join(__dirname, 'data/nodesToNodesGraph1.json')
  fs.readFile(filedata, 'utf8', function (err, data) {


// 获取question 1 问题的初步绘制数据
app.get("/Qone", (req, res, next) => {
  file_path = "./data/q-one-data/tiaozhan1.json";
  // file_path = './data/q-one-data/large.json'
  fs.readFile(file_path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let d = JSON.parse(data);
      res.send(d);
      res.end();
    }
  });
});

// 获取question 1 问题的初步绘制数据
app.get("/db", (req, res, next) => {
  // const db = new Database()
  // db.useBasicAuth(username, password);
  // const myDb = db.database('CVis')
  // db.useDatabase('CVis')   // 引用CVis数据库，默认使用_system数据库
  // // 社区检测
  // const handle = pregel.start('labelpropagation', 'test_graph', {maxGSS: 100, resultField: "community"})
  // status = pregel.status(handle);
  // console.log(status)
  // fs.writeFile('./data/test.txt', status, function(err){
  //   if(err){
  //     console.log(err);
  //   }
  // })
  // res.send(status)
});

// 获取每个Ip/Cert的Industry信息
app.get("/ICIndustry", (req, res) => {
  let filedata = path.join(__dirname, "data/nodeIndustryInfo2.json");
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

// 获取每个Ip/Cert的链路信息
app.get("/ICLinks", (req, res) => {
  let filedata = path.join(__dirname, "data/nodesToNodesGraph1.json");
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let ICLinks = JSON.parse(data)
      nodesInfo = []
      linksInfo = []
      for (let i in req.query.Nodes){
        nowNodeInfo = nodeNumIdInfo[i - 1]
        for(let j in ICIndustry[str(i)]){
          nodesInfo.push({
            "numId": i,
            "id": nowNodeInfo[1],
            "ICIndustry": {
              "industry": j[0],
              "number": j[1]
            }
          })
        }
        for (let j in ICLinks[str(i)]){
          for(let k in j){
            if(nodes.includes(k[1]) && k[1] > k[0]){
              linksInfo.push({
                "source": k[1],
                "target": k[2]
              })
            }
          }
        }
      let jsonData = JSON.parse(data);
      res.send(jsonData);
      res.end();
    }
  });
});

app.get("/db", (req, res, next) => {
  // 图2的数据处理过程
  let nodes = []; // 参数为NumId，不要别的信息
  let ICIndustry = []; // 读取文件获取的数据
  let nodesInfo = [];
  let ICLinks = [];
  for (let i in nodes) {
    ICIndustryNow = [];
    for (let j in ICIndustry[str(i)]) {
      ICIndustryNow.push({
        industry: j[0],
        number: j[1],
      });
    }
    nodesInfo.push({
      numId: i,
      ICIndustry: ICIndustryNow,
    });
  }
  for (let i in ICLinks) {
    for (let j in i) {
      if (nodes.includes(j[1]) && j[1] > j[0]) {
        ICLinks.push({
          source: j[1],
          target: j[2],
        });
      }
      res.send({
        "nodes": nodesInfo,
        "links": linksInfo
      })
    }
  })
})
  }

  res.send({
    nodes: nodesInfo,
    links: ICLinks,
  });
  res.end();

app.get("/getBulletChartData", (req, res, next) => {
  // 图3的数据处理过程.
  for (let i in nodes) {
    nodesInfo.push({
      numId: i,
      ICIndustry: ICIndustry[str(i)],
    });
  }
  let filedata = path.join(__dirname, 'data/nodesToNodesGraph1.json"/');
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      let jsonData = JSON.parse(data);
      for (let i in jsonData[str(nodes[0])]) {
        if (i[1] == nodes[1]) {
          industryInMiddle = i[-1];
        }
      }
    }
  });

  // 周艺璇画的图的相关数据
  let communityInfo = {}; //传的参数，社区的节点和链接信息
  let r_cert_chain = 0;
  let r_cert = 0;
  let r_whois_name = 0;
  let r_whois_phone = 0;
  let r_whois_email = 0;
  let r_cname = 0;
  let r_request_jump = 0;
  let r_subdomain = 0;
  let none = 0;
  let r_dns_a = 0;
  let r_cidr = 0;
  let r_asn = 0;
  certAsTarget = {};
  certAsSource = {};
  whoisName = {};
  whoisEmail = {};
  whoisPhone = {};
  domainAsCnameTarget = {};
  domainAsJumpTarget = {};
  domainAsSubTarget = {};
  domainAsSource = {};
  ip = {};
  ipc = {};
  asn = {};
  for (let i in communityInfo["links"]) {
    if (i[0] == "r_cert_chain") {
      r_cert_chain += 1;
      certAsSource.push(i[1]);
      certAsTarget.push(i[2]);
    } else if (i[0] == "r_cert") {
      r_cert += 1;
      domainAsSource.push(i[1]);
    } else if (i[0] == "r_whois_name") {
      r_whois_name += 1;
      domainAsSource.push(i[1]);
      whoisName.push(i[2]);
    } else if (i[0] == "r_whois_email") {
      r_whois_email += 1;
      domainAsSource.push(i[1]);
      whoisEmail.push(i[2]);
    } else if (i[0] == "r_whois_phone") {
      r_whois_phone += 1;
      domainAsSource.push(i[1]);
      whoisPhone.push(i[2]);
    } else if (i[0] == "r_cname") {
      r_cname += 1;
      domainAsSource.push(i[1]);
      domainAsCnameTarget.push(i[2]);
    } else if (i[0] == "r_request_jump") {
      r_request_jump += 1;
      domainAsSource.push(i[1]);
      domainAsJumpTarget.push(i[2]);
    } else if (i[0] == "r_subdomain") {
      r_subdomain += 1;
      domainAsSource.push(i[1]);
      domainAsSubTarget.push(i[2]);
    } else if (i[0] == "r_dns_a") {
      r_dns_a += 1;
      domainAsSource.push(i[1]);
      ip.push(i[2]);
    } else if (i[0] == "r_cidr") {
      r_cidr += 1;
      ip.push(i[1]);
      ipc.push(i[2]);
    } else if (i[0] == "r_asn") {
      r_asn += 1;
      ip.push(i[1]);
      asn.push(i[2]);
    }
  }
  domainAsSource = domainAsSource.filter(
    (e) =>
      !domainAsCnameTarget.has(e) &&
      !domainAsJumpTarget.has(e) &&
      !domainAsSubTarget.has(e)
  );
  const linksList = [
    { name: "r_cert_chain", value: r_cert_chain },
    { name: "r_cert", value: r_cert },
    { name: "r_whois_name", value: r_whois_name },
    { name: "r_whois_phone", value: r_whois_phone },
    { name: "r_whois_email", value: r_whois_email },
    { name: "r_cname", value: r_cname },
    { name: "r_request_jump", value: r_request_jump },
    { name: "r_subdomain", value: r_subdomain },
    { name: "none", value: none },
    { name: "r_dns_a", value: r_dns_a },
    { name: "r_cidr", value: r_cidr },
    { name: "r_asn", value: r_asn },
  ];
  const nodesList = [
    { name: "certAsTarget", value: certAsTarget.size },
    { name: "certAsSource", value: certAsSource.size },
    { name: "whoisName", value: whoisName.size },
    { name: "whoisEmail", value: whoisEmail.size },
    { name: "whoisPhone", value: whoisPhone.size },
    { name: "domainAsCnameTarget", value: domainAsCnameTarget.size },
    { name: "domainAsJumpTarget", value: domainAsJumpTarget.size },
    { name: "domainAsSubTarget", value: domainAsSubTarget.size },
    { name: "domainAsSource", value: domainAsSource.size },
    { name: "ip", value: ip.size },
    { name: "ipc", value: ipc.size },
    { name: "asn", value: asn.size },
  ];      
  res.send([linksList, nodesList])
  res.end()

})

app.get("/infoList", (req, res, next) => {
  let numnode = 0
  let numlink = 0
  let groupscope = ""
  let industrytype = {}
  let grouptype = "单一型"
  numnode = req.query.nodes.length()
  numlink = req.query.links.length()
  if(numnode < 300){
    groupscope = "小"
  }
  else if(numnode < 800){
    groupscope = "中"
  }
  else{
    groupscope = "大"
  }
  for(let i in req.query.nodes){
    industrytype.add(i[-1])
  }
  if(industrytype.length > 1){
    grouptype = "复合型"
  }
  res.send({
    numnode : numnode,
    numlink : numlink,
    groupscope : groupscope,
    industrytype : industrytype,
    grouptype : grouptype
  })
})
  res.send([linksList, nodesList]);
  res.end();
});

// 获取冰柱图所需要的数据
app.get("/icClueData", (req, res) => {
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
