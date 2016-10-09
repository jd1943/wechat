/**
 * Created by jiang on 2016/10/9.
 */
var parseString = require("../common/utils").parseString

function json2XmlString(msg) {
    var output = "<xml>";
    for (each in msg) {
        if (each == "CreateTime") {
            output += "<" + each + ">" + msg.each + "</" + each + ">"
        } else {
            output += "<" + each + "><![CDATA[" + msg.each + "]]></" + each + ">"
        }
    }
    output += "</xml>";
    return output
}

function handleTextMsg(msg, res) {
    var time = Math.round(new Date().getTime() / 1000);
    var output_msg = json2XmlString(
        {
            "ToUserName": msg.fromUser,
            "FromUserName": msg.ToUserName,
            "CreateTime": time,
            "MsgType": "text",
            "Content": msg.Content
        }
    );
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
    parseString(xmlStr, function (err, result) {
        switch (result.msgType) {
            case 'text':
                handleTextMsg(result, res);
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