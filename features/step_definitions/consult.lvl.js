'use strict';

var expect = require('chai').expect;

module.exports = function() {
    var _this = this;

    this.World = require('../world.js');
    this.setDefaultTimeout(60000);

    this.Given(/^dado que "([^"]*)" tinha level "([^"]*)"$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^camiseta listar os membros da equipe$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^"([^"]*)" clicar em no link do seu nome$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^será exibido os dados do "([^"]*)" no level "([^"]*)"$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};