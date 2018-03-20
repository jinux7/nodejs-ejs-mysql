const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const consolidate = require('consolidate');
const route = require('./src/route/index');
expressLess = require('express-less');
var app = express();
//设置静态文件夹//处理less
app.use('/static/css', expressLess(__dirname + '/src/asset/less'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('public'));
//设置模板
app.set('view engine','html');
app.set('views','./views');
app.engine('html',consolidate.ejs);
//加载路由
app.use('/',route);
//创建服务器
app.listen(8888,()=>{
    console.log('服务已经开启,端口是8888');
});

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});