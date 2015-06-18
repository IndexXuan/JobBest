/*******************************************************
    > File Name: test_spec_webdriver.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年05月29日 星期五 16时36分43秒
 ******************************************************/

var sw = require('selenium-webdriver');
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.phantomjs())
  .build();

// then 
var chai = require('chai');
var chaiwebdriver = require('chai-webdriver');
chai.use(chaiwebdriver(driver));

// and you're good to go!
driver.get('http://github.com');
chai.expect('#site-container h1.heading').dom.to.not.contain.text("I'm a kitty!");

