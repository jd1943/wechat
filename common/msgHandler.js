/**
 * Created by jiang on 2016/10/9.
 */
var parseString = require("../common/utils").parseString

function json2XmlString(msg) {
    var output = "<xml>";
    for (var each in msg.keys) {
        if (each == "CreateTime") {
            output += "<" + each + ">" + msg.each + "</" + each + ">"
        } else {
            output += "<" + each + "><![CDATA[" + msg.each + "]]></" + each + ">"
        }
    }
    output += "</xml>";
    return output
}

function handleTextMsg(err,msg, res) {
    console.log("handleTextMsg recive msg: "+ msg);
    var time = Math.round(new Date().getTime() / 1000);
    var output_msg = json2XmlString(
        {
            "ToUserName": msg.FromUserName,
            "FromUserName": msg.ToUserName,
            "CreateTime": time,
            "MsgType": "text",
            "Content": msg.Content
        }
    );
    console.log(output_msg);
    if (err) {
        console.log("text parse failed!");
        res.type('xml');
        res.send(output_msg)
    } else {
        console.log(msg);
        res.type('xml');
        res.send(output_msg)
    }
}

function handleEventMsg(msg, res) {

}

function handleImageMsg(msg, res) {

}

function handleLocationMst(msg, res) {

}

module.exports = function (xmlStr, res) {
    console.log(xmlStr);
    parseString(xmlStr, function (err, msg) {
        var result = msg.xml;
        console.log(result.Content);
        switch (result.MsgType) {
            case 'text':
                console.log("text type msg");
                handleTextMsg(err,result, res);
                break;
            case 'event':
                handleEventMsg(result, res);
                break;
            case 'image':
                handleImageMsg(result, res);
                break;
            case 'location':
                handleLocationMst(result, res);
                break
        }
    });
};