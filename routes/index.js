var express = require('express');
var router = express.Router();
var checkSignature = require("../common/utils.js").sign;
var msgHandler = require("../common/msgHandler.js");
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
    var formData="";
    req.on("data",function(data){
        formData+=data;
    });
    req.on("end",function(){
      msgHandler(formData,res)
    });
  });


};
