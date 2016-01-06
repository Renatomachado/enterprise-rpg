'use strict';

var fs = require('fs'),
    webdriver = require('selenium-webdriver');

var driver = function() {
    return new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
}();

module.exports = function() {

    var defaultTimeout = 20000;
    var screenshotPath = "screenshots";

    this.webdriver = webdriver;
    this.driver = driver;

    if(!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }

    this.waitFor = function(cssLocator, timeout) {
        var waitTimeout = timeout || defaultTimeout;
        return driver.wait(function() {
            return driver.isElementPresent({ css: cssLocator });
        }, waitTimeout);
    };

    return this;
};
