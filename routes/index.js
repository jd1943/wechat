var express = require('express');
var router = express.Router();
var sha1 = require('sha1')
var checkSignature = require("./common/utils.js").sign

/* GET home page. */

module.exports = function(app){
  app.get('/', function(req, res, next) {
	if (! ("nonce" in req.query)){
		res.render('index', { title: '网站建设中，qq:780228437' });
	}else{
    checkSignature(req,res,next)
  }
  });
};
