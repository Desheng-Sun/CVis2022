const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const Database = require("arangojs").Database;
const username = "root";
const password = "123456";
const port = 3008;

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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

let nodeInfoJ = fs.readFileSync(path.join(__dirname, 'data/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv'), 'utf8')
nodeInfoJ = nodeInfoJ.split("\n")
let nodeNumIdInfo = []
for (let i of nodeInfoJ) {
  nodeNumIdInfo.push(i.split(","))
}
nodeNumIdInfo = nodeNumIdInfo.splice(1)
let ICIndustryP = path.join(__dirname, 'data/nodeIndustryInfo2.json')
let ICIndustryJ = fs.readFileSync(ICIndustryP, 'utf8')
const ICIndustry = JSON.parse(ICIndustryJ)

// const nodeInfoJ = fs.readFileSync(path.join(__dirname, 'data/ChinaVis Data Challenge 2022-mini challenge 1-Dataset/NodeNumIdNow.csv'), 'utf8')
// const nodeNumIdInfo = json.parse(nodeInfoJ)

// let ICIndustryP = path.join(__dirname, 'data/nodeIndustryInfo2.json')
// let ICIndustryJ = fs.readFileSync(ICIndustryP, 'utf8')
// const ICIndustry = JSON.parse(ICIndustryJ)



// 获取视图的初始数据：node信息R
app.get("/initialSds", (req, res, next) => {
  res.send(nodeNumIdInfo)
  res.end()
})


// 获取冰柱图需要的数据
app.post("/ic-clue-dataSds", jsonParser, (req, res, next) => {
  const spawn = require('child_process').spawn
  const pythonProcess = spawn('python', [path.join(__dirname, 'dataProcess/5. figure1.py'), req.body.numId, req.body.type])
  pythonProcess.on('exit', () => {
    let filedata = path.join(__dirname, 'data/ic-clue-data/' + req.body.numId + ".json")
    fs.readFile(filedata, 'utf-8', function (err, data) {
      if (err) {
        console.log(err)
      } else {
        let d = JSON.parse(data)
        res.send(d)
        res.end()
      }
    })
  });
})


// IC连接图所需要的数据
app.post("/skeleton-chartSds", jsonParser, (req, res, next) => {
  let filedata = path.join(__dirname, "data/nodesToNodesGraph1.json");
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let ICLinks = JSON.parse(data)
      let nodesInfo = []
      let linksInfo = []
      for (let i of req.body.Nodes) {
        const nowNodeInfo = nodeNumIdInfo[i - 1]
        nowICIndustry = []
        for (let j of ICIndustry[i]) {
          nowICIndustry.push({
            "industry": j[0],
            "number": j[1]
          })
        }
        nodesInfo.push({
          "numId": i,
          "id": nowNodeInfo[1],
          "name": nowNodeInfo[2],
          "ICIndustry": nowICIndustry
        })
        for (let j of ICLinks[i]) {
          if (req.body.Nodes.includes(j[1]) && j[1] > j[0]) {
            linksInfo.push({
              "source": j[0],
              "target": j[1]
            })
          }
        }
      }
      res.send({ "nodes": nodesInfo, "links": linksInfo });
      res.end();
    }
  });
})



// 主图所需要的数据
app.post("/mainChartSds", jsonParser, (req, res, next) => {
  let filedata = path.join(__dirname, "data/nodesToNodesGraph1.json");
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.log(err)
    } else {

    }
  });
})


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
  let none = 0;
  let r_dns_a = 0;
  let r_cidr = 0;
  let r_asn = 0;
  certAsTarget = new Set();
  certAsSource = new Set();
  whoisName = new Set();
  whoisEmail = new Set();
  whoisPhone = new Set();
  domainAsCnameTarget = new Set();
  domainAsJumpTarget = new Set();
  domainAsSubTarget = new Set();
  domainAsSource = new Set();
  ip = new Set();
  ipc = new Set();
  asn = new Set();
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
  domainAsSource = Array.from(domainAsSource)
  domainAsSource = domainAsSource.filter(
    (e) => {
      !domainAsCnameTarget.has(e) &&
        !domainAsJumpTarget.has(e) &&
        !domainAsSubTarget.has(e)
    }
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

app.post("/infoList", jsonParser, (req, res, next) => {
  let numnode = 0
  let numlink = 0
  let groupscope = ""
  let industrytype = new Set()
  let grouptype = "单一型"
  let communityInfo = req.body.nodesLinksInfo; //传的参数，社区的节点和链接信息
  numnode = communityInfo["nodes"].length
  numlink = communityInfo["links"].length

  if (numnode < 300) {
    groupscope = "小"
  }
  else if (numnode < 800) {
    groupscope = "中"
  }
  else {
    groupscope = "大"
  }
  for (let i of communityInfo["nodes"]) {
    industrytype.add(i[4])
  }
  if (industrytype.size > 1) {
    grouptype = "复合型"
  }

  sendData = {
    numnode: numnode,
    numlink: numlink,
    groupscope: groupscope,
    industrytype: Array.from(industrytype),
    grouptype: grouptype
  }
  console.log(sendData)
  res.send(sendData)

  res.end();
})


app.post("/difChart", jsonParser, (req, res, next) => {
  let filedata = path.join(__dirname, "data/nodesToNodesGraph1.json");
  fs.readFile(filedata, "utf-8", function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let ICLinks = JSON.parse(data)
      let linksInfo = req.body.linksInfo
      let diffData = []
      for (let i of linksInfo["links"]) {
        let difDataNow = {}
        for (let j of linksInfo["nodes"]) {
          if (j["numId"] == i["source"] || j["numId"] == i["target"]) {
            difDataNow[j["numId"]] = ({
              "name": j["name"],
              "numID": j["numId"],
              "id": j["id"],
              "value": {}
            })
            for (let k of j["ICIndustry"]) {
              difDataNow[j["numId"]]["value"][k["industry"]] = k["number"]
            }
            if (difDataNow.length == 2) {
              break
            }
          }
        }
        for (let j of ICLinks[i["target"]]) {
          if (j[1] == i["source"]) {
            difDataNow[i["source"].toString() + i["target"]] = {
              "numId": i["source"].toString() + i["target"],
              "name": difDataNow[i["target"]]["name"] + " " + difDataNow[i["source"]]["name"],
              "id": difDataNow[i["target"]]["id"] + " " + difDataNow[i["source"]]["id"],
              "value": {}
            }
            for (let k of j[j.length - 1]) {
              if (k[0] != "  ") {
                difDataNow[i["source"].toString() + i["target"]]["value"][k[0]] = k[1]
                if (k[0] in difDataNow[i["source"]]["value"]) {
                  difDataNow[i["source"]]["value"][k[0]] -= k[1]
                }
                if (k[0] in difDataNow[i["target"]]["value"]) {
                  difDataNow[i["target"]]["value"][k[0]] -= k[1]
                }
              }
            }
            break
          }
        }
        let difDataUseNow = []
        for (let key in difDataNow) {
          j = difDataNow[key]
          let difDataOneNow = {
            "name": j["names"],
            "numId": j["numId"],
            "id": j["id"],
            "value": []
          }
          for (let k in j["value"]) {
            difDataOneNow["value"].push({
              "name": k,
              "value": j["value"][k]
            })
          }
          difDataUseNow.push(difDataOneNow)
        }
        diffData.push(difDataUseNow)
      }
      res.send(diffData)
      res.end();
    }
  });
})
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
