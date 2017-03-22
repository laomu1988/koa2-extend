
var fs = require('fs');

function isDir(path) {
    var stat =fs.statSync(path);
    return stat.isDirectory()
}

module.exports = isDir;