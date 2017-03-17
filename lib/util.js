var path = require('path');
var types = require('./types');
var exp = {
    clearPath(filename) {
        if(!filename) return '';
        var len = filename.indexOf('?');
        if (len > 0) filename = filename.substr(0, len);
        len = filename.indexOf('#');
        if (len > 0) filename = filename.substr(0, len);
    },
    // 扩展名,不含点
    ext(filename) {
        filename = exp.clearPath(filename);
        return path.extname(filename).substr(1);
    },
    type(filename) {
        return types[exp.ext(filename)] || 'unknown';
    },
    isTypeText(type) {
        type += '';
        return type && (type.indexOf('text') >= 0 || type.indexOf('javascript') >= 0 || type.indexOf('xml') >= 0);
    },
    isPathText(filename) {
        return exp.isTypeText(exp.type(filename));
    }
};

module.exports = exp;