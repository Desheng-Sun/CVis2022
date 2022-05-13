const express = require("express");
const app = express();
const path = require('path'); 
const fs = require('fs'); 
const Database = require('arangojs').Database
const username = 'root'
const password = '123456'
const port = 3008;

/**
 * 设置跨域请求
 */
 app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "nodejs");
  res.header("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Cache-Control", "public, max-age=120");
  next();
})

app.get('/helloworld', (req, res) => {
  console.log('Hello World.')
  res.send('Hello world!');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// 获取question 1 问题的初步绘制数据
app.get("/Qone", (req, res, next) => {
  file_path = './data/q-one-data/tiaozhan1.json'
  // file_path = './data/q-one-data/large.json'
  fs.readFile(file_path, 'utf8', function(err, data){
    if(err){
      console.log(err)
    }else{
      let d = JSON.parse(data)
      res.send(d)
      res.end()
    }
  })
})

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
})