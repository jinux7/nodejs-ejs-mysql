var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// 该路由使用的中间件
/*router.use(function timeLog(req, res, next) {
console.log('Time: ', Date.now());
next();
});*/

router.get('/', function(req, res) {
    res.render('home.ejs',{userName: 'jinux'});
});

router.get('/showUsers', function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.queryAll, function(err, result) {  
            res.render('showUsers.ejs',{users: result});        
            // 释放连接  
            connection.release();  
        });
    })
});

router.post('/sqlone', function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getUserById, [req.body.id], function(err, result) {  
            res.send({data: result});        
            // 释放连接  
            connection.release();  
        });
    })
});

//404页面
router.get('*',function(req, res){
    res.render('404.ejs');
});
module.exports = router;