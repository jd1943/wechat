/**
 * Created by jiang on 2016/10/9.
 */
var parseString = require("../common/utils").parseString

module.exports = function (xmlStr, res) {
    console.log(xmlStr);
    parseString(xmlStr, function (err, result) {
        var response = res;
        if (err) {
            return response
        } else {
            return response
        }
    });
};