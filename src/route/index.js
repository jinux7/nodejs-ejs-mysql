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

//查询接口 "/query"
router.get('/query', function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.queryAll, function(err, result) {  
            res.render('components/query.ejs',{users: result});        
            // 释放连接  
            connection.release();  
        });
    })
});

//添加页面 "/add"
router.get('/add', function(req, res) {
    res.render('components/add.ejs',{userName: 'jinux'});
});
//添加页面的add post接口
router.post('/add', function(req, res) {
    let dbody = req.body;
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.insert, [dbody.name,dbody.age,dbody.sex,dbody.work], function(err, result) {  
            if(err){
                res.send('插入失败');
            }else {
                res.send('插入成功');                        
            }
            // 释放连接  
            connection.release();  
        });
    })
});

//添加页面 "/update"
router.get('/update', function(req, res) {
    res.render('components/update.ejs');
});
//添加页面的add post接口
router.post('/update', function(req, res) {
    let dbody = req.body;
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.update, [dbody.name,dbody.age,dbody.sex,dbody.work,dbody.id], function(err, result) {  
            if(err){
                res.send('更新失败');
                console.log(err);
            }else {
                res.send('更新成功');                        
            }
            // 释放连接  
            connection.release();  
        });
    })
});

//删除页面 "/delete"
router.get('/delete', function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.queryAll, function(err, result) {  
            res.render('components/delete.ejs',{users: result});
            // 释放连接  
            connection.release();  
        });
    })
});
//删除页面 delete post接口
router.post('/delete', function(req, res) {
    let dbody = req.body;    
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.delete,[dbody.id], function(err, result) {  
            if(err){
                res.send('删除操作失败');
            }else {
                res.send('删除操作成功');
            }
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