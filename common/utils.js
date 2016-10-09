var utils = {};
var sha1 = require('sha1');
var xml2js = require('xml2js');

utils.sign = function(req,res,next){
	var q = req.query;
	//console.log(q)
	var signature = q.signature; //微信加密签名
  	var nonce = q.nonce; //随机数
  	var timestamp = q.timestamp; //时间戳
  	var echostr = q.echostr; //随机字符串
	var token="jiangdatoken";
	/*
    	1）将token、timestamp、nonce三个参数进行字典序排序
        2）将三个参数字符串拼接成一个字符串进行sha1加密
        3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    */
	var str = [token, timestamp, nonce].sort().join('');
	var sha = sha1(str);
	if (sha==signature){
		res.send(echostr+'');
    console.log("wechat check sucess!")
  }else{
    res.send('err');
    console.log("wechat check failed!")
	}
};

utils.parseString = function(xmlStr,callback){
  xml2js.parseString(xmlStr, { explicitArray : false, ignoreAttrs : true }, callback);
};

module.exports = utils;
