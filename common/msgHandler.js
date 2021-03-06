/**
 * Created by jiang on 2016/10/9.
 */
var parseString = require("../common/utils").parseString;

function json2XmlString(msg) {
    var output = "<xml>";
    for (var each in msg) {
        if (each == "CreateTime") {
            output += "<" + each + ">" + msg[each] + "</" + each + ">"
        } else {
            output += "<" + each + "><![CDATA[" + msg[each] + "]]></" + each + ">"
        }
    }
    output += "</xml>";
    return output
}

function handleTextMsg(msg, res) {
    var content = "";
    if(msg.MsgType=="text") {
        content = msg.Content
    }else{
        content = "不支持的数据类型"
    }
    console.log("handleTextMsg recive msg: " + msg);
    var time = Math.round(new Date().getTime() / 1000);
    var output_msg = json2XmlString(
        {
            "ToUserName": msg.FromUserName,
            "FromUserName": msg.ToUserName,
            "CreateTime": time,
            "MsgType": "text",
            "Content": content
        }
    );
    console.log(output_msg);
    res.type('xml');
    res.send(output_msg);
    res.end();
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
                handleTextMsg(result, res);
                break;
            default :
                console.log("undefined msg!");
                handleTextMsg(result,res);
            //case 'event':
            //    handleEventMsg(result, res);
            //    break;
            //case 'image':
            //    handleImageMsg(result, res);
            //    break;
            //case 'location':
            //    handleLocationMst(result, res);
            //    break;

        }
    });
};