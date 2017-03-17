/**
 * 根据扩展名判断文件是否是二进制文件
 * */
var util = require('./util');
module.exports = function (filename) {
    if (!filename) return false;
    return !!util.isPathText(filename);
};