var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render('index', { title: '本域名出售，qq:780228437,email:jiangda1@foxmail.com' });
  });
};
