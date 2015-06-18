/*******************************************************
    > File Name: test_spec_selenium-webdriver.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年05月29日 星期五 17时01分07秒
 ******************************************************/

var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
	.build();

driver.get('http://118.174.27.112/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
dirver.wait(until.titles('webdriver - Google Search'), 1000);
driver.quit();

