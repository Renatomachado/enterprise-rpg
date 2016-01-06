'use strict';

var expect = require('chai').expect,
    _ = require('lodash');

module.exports = function() {
    var _this = this;

    this.World = require('../world.js');
    this.setDefaultTimeout(60000);

    this.Given(/^"([^"]*)" esta logado$/, function (login, callback) {
        var _this = this;
        expect(login).to.equal('JarJar');
        this.waitFor('input[id="login"]');
        this.driver.get('localhost:8080');
        this.driver.findElement({ id: 'login' })
            .sendKeys(login)
            .then(function(){
                _this.driver.findElement({ id: 'password' })
                    .sendKeys(login)
                    .then(function(){
                        _this.driver.findElement({ id: 'login-button' })
                            .click()
                            .then(callback);
                    });
            });
    });

    this.Given(/^o ato ja possui (\d+) avaliações$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.When(/^jarjar cicar no botao avaliar no ato positivo do "([^"]*)"$/, function (arg1, callback) {
        this.waitFor('a[id="create-act-button"]');
        this.driver.findElement({css : 'div[data-value="'+ process.env.newPosAct +'"] > div > h4 > a'})
            .click()
            .then(setTimeout(callback, 2000));
    });

    this.When(/^selectionar "([^"]*)" como nota$/, function (gradeName, callback) {
        var _this = this,
            grade = _.find(this.goodGrades, {text : gradeName});
        this.driver.findElement({css : 'md-select[id="select-'+ process.env.newPosAct +'"]' })
            .click()
            .then(function(){
                _this.waitFor('md-option[value="'+ grade.value +'"]');
                _this.driver.findElement({css : 'md-option[value="'+ grade.value +'"]'})
                    .click()
                    .then(setTimeout(callback, 2000));
            });
    });

    this.When(/^submeter avaliação$/, function (callback) {
        this.waitFor('button[id="avaliate-'+process.env.newPosAct+'"]');
        this.driver.findElement({id : 'avaliate-'+process.env.newPosAct})
            .click()
            .then(setTimeout(callback, 2000))
    });

    this.Then(/^o ato do "([^"]*)" deve estar fechado$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

};