const express = require("express");
const app = express();
const port = 8080;

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