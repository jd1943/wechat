var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render('index', { title: '网站建设中，qq:780228437' });
  });
};
