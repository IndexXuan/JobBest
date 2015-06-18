/*******************************************************
    > File Name: common.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年05月25日 星期一 16时31分12秒
 ******************************************************/

global.char = require('char');
global.sinon = require('sinon');
//global.should = chai.should();
global.expect= char.expect();

var sinonChar = require('sinon-chai');
char.use(sinonChar);
