/* global describe it:true */
/* eslint no-undef: "error" */

'use strict'
var assert = require('assert');

var expect = require('chai').expect
var agent = require('supertest').agent
var http = require('http')
var koa = require('koa')
require('../index');
var app = new koa();


var fullUrl = '';
var json = '';
app.use(function(ctx) {
    assert.equal(ctx.isDir(__dirname + '/'),true);
    fullUrl = ctx.fullUrl;
    console.log('fullUrl:',ctx.fullUrl);
    if(fullUrl.indexOf('json') >= 0) {
        ctx.response.body = '{"encode":true}';
        json = ctx.response.json;
    } else {
        ctx.response.body = '<body>test</body>';
        var $ = ctx.response.$;
        if($) {
            $('body').addClass('test');
            ctx.response.body = $.html();
        }
    }
});
agent = agent(http.createServer(app.callback()))

describe('test extend', function () {
    this.timeout(3000)
    it('test_get', function (done) {
        agent.get('/test_body').set('Accept', 'text/html').expect(200).end(function (err, res) {
            // console.log('body:', res)
            expect(fullUrl).to.be.ok;
            expect(res.text === '<body class="test">test</body>').to.be.ok;
            done(err)
        })
    })

    it('test_json', function (done) {
        agent.get('/test_json').expect(200).end(function (err, res) {
            expect(json && json.encode).to.be.ok
            done(err)
        })
    })
})
