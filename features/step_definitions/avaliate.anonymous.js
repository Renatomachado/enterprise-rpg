'use strict';

var expect = require('chai').expect,
    _ = require('lodash');
module.exports = function() {
    var _this = this;

    this.World = require('../world.js');
    this.setDefaultTimeout(60000);

    this.Before(function () {
        this.users = [
            {id : '566605de7047e6bd0a621a67', name : 'Camiseta', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
            {id : '566605b87047e6bd0a621a61', name : 'Renato', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
            {id : '566605c97047e6bd0a621a65', name : 'JarJar', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
            {id : '566605bf7047e6bd0a621a63', name : 'Leda', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
        ];

        this.goodGrades2 = [
            {value : 4, text : 'Épico'},
            {value : 3, text : 'Muito bom'},
            {value : 2, text : 'Bom'},
            {value : 1, text : 'Regular'}
        ];
    });

    this.Given(/^usuário "([^"]*)" esteja logado$/, function (login, callback) {
        var _this = this;
        expect(login).to.equal('Renato');
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
                            .then(setTimeout(callback, 2000));
                    });
            });
    });

    this.When(/^Renato clicar em avaliar do ato mais recente do "([^"]*)"$/, function (userName, callback) {
        var _this = this;
        this.waitFor('a[id="create-act-button"]');
        this.driver.findElement({css : 'div[data-value="'+ process.env.newPosAct +'"] > div > h4 > a'})
            .click()
            .then(setTimeout(callback, 2000));
    });

    this.When(/^escolhe nota "([^"]*)"$/, function (gradeName, callback) {
        var _this = this,
            grade = _.find(this.goodGrades2, {text : gradeName});
        this.driver.findElement({css : 'md-select[id="select-'+ process.env.newPosAct +'"]' })
            .click()
            .then(function(){
                _this.waitFor('md-option[value="'+ grade.value +'"]');
                _this.driver.findElement({css : 'md-option[value="'+ grade.value +'"]'})
                    .click()
                    .then(setTimeout(callback, 2000));
            });
    });

    this.When(/^clicar no checkbox anonimo$/, function (callback) {
        _this = this;
        this.driver.findElement({id : 'anonymous-'+ process.env.newPosAct })
            .click()
            .then(setTimeout(function(){
                _this.waitFor('button[id="avaliate-'+process.env.newPosAct+'"]');
                _this.driver.findElement({id : 'avaliate-'+process.env.newPosAct})
                    .click()
                    .then(setTimeout(callback, 2000))
            }, 2000));
    });

    this.Then(/^entao será computado aquela avaliação pro ato do camiseta$/, function (callback) {
        this.driver.get('localhost:8080');
        this.driver.findElement({ id: 'logout-button' })
            .click()
            .then(setTimeout(callback, 2000));
    });

    this.Then(/^o ato devera ser fechado pois tem avaliação de toda a equipe$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


};