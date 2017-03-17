module.exports = function (request) {
    if(!request) return '';
    if (request.url.indexOf('http') == 0) {
        return request.url;
    }
    return request.protocol + '://' + request.header.host + request.url;
};