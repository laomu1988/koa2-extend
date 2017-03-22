/**
 * koa@next的扩展
 * */
var context = require('koa/lib/context');
var request = require('koa/lib/request');
var response = require('koa/lib/response');
var cheerio = require('cheerio');
var fullUrl = require('./lib/fullUrl');
var Url = require('url');

context.sendFile = require('./lib/sendFile');
context.isBinary = require('./lib/isBinary');
context.isDir = require('./lib/isDir');

Object.defineProperties(context, {
    fullUrl: {
        get() {
            return this.request.fullUrl;
        },
        set(url) {
            this.request.fullUrl = url;
        }
    }
});

Object.defineProperties(request, {
    fullUrl: {
        get() {
            return fullUrl(this);
        },
        set() {
            if(!url) return '';
            var parse = Url.parse(url + '');
            if(parse.protocol) this.protocol = parse.protocol.substr(0, parse.protocol.length - 1);
            if(parse.host) this.set('host', parse.host);
            if(parse.path) this.url = parse.path;
        }
    }
});

Object.defineProperties(response, {
    $: {
        get() {
            if (!this.body) return '';
            if (this.type === 'bin') return '';
            try {
                return cheerio.load(this.body);
            } catch (e) {
                this.ctx.onerror(e);
                return '';
            }
        }
    },
    json: {
        get() {
            if (!this.body) return '';
            if (this.type === 'bin') return '';
            try {
                return JSON.parse(this.body + '');
            } catch (e) {
                this.ctx.onerror(e);
                return '';
            }
        }
    }
});

module.exports = {};