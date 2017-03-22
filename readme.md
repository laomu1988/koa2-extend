# koa@next的一些扩展函数
 要求node版本>=6.0.0

## install
```
npm install koa2-extend
```

## usage
```
var koa = require('koa');
require('koa2-extend');  // 要在实例化app前引入koa2-extend
var app = new koa();

app.use(function(ctx) {
    console.log('fullUrl:',ctx.fullUrl);
    if(ctx.url.indexOf('json') >= 0) {
        ctx.response.body = '{"encode":true}';
        console.log(ctx.response.json.encode);
        // 将输出: true
    }
    else {
        ctx.response.body = '<body>test</body>';
        var $ = ctx.response.$;
        $('body').addClass('test');
        ctx.response.body = $.html();
        console.log(ctx.response.body);
        // 将输出: <body class="test">test</body>
    }
});


```

## api
* ctx.fullUrl            同request.fullUrl
* ctx.isBinary(filepath) 根据文件路劲判断是否是二进制文件
* ctx.sendFile(filepath) 发送文件
* ctx.isDir(path)        判断本地路径是否是文件夹
* request.fullUrl        包含protocol和host的完全链接
* response.$             使用cheerio包裹后的html对象, 使用时转码, 转换失败返回''
* response.json          使用JSON.parse转换body后的对象,   使用时转换, 转换失败返回''