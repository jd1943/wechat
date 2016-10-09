var express = require('express');
var router = express.Router();
var sha1 = require('sha1')
var checkSignature = require("../common/utils.js").sign
/* GET home page. */

module.exports = function(app){
  app.get('/', function(req, res, next) {
		res.render('index', { title: '网站建设中，qq:780228437' });
    checkSignature(req,res,next)
  });
  app.get('/wechat',function(req,res,next){
    checkSignature(req,res,next)
  });

  app.post('/wechat',function(req,res,next){
    checkSignature(req,res,next)
    console.log(req)
    console.log(req.body)
  });
};
