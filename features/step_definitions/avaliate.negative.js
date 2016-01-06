'use strict';

var expect = require('chai').expect,
    _ = require('lodash');
module.exports = function() {
    var _this = this;

    this.World = require('../world.js');
    this.setDefaultTimeout(60000);

    this.Before(function(){
        this.users = [
            {id : '566605de7047e6bd0a621a67', name : 'Camiseta', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
            {id : '566605b87047e6bd0a621a61', name : 'Renato', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
            {id : '566605c97047e6bd0a621a65', name : 'JarJar', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
            {id : '566605bf7047e6bd0a621a63', name : 'Leda', img : 'http://lorempixel.com/40/40/people', lvl : 20, class: 'aprendiz'},
        ];

        this.badGrades = [
            {value : 4, text : 'Fez merda'},
            {value : 3, text : 'Muito ruim'},
            {value : 2, text : 'Ruim'},
            {value : 1, text : 'Regular'}
        ];
    });
    
    this.Given(/^"([^"]*)" esteja logado$/, function (login, callback) {
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

    this.When(/^"([^"]*)" clicar em "([^"]*)" do ato mais recente do "([^"]*)"$/, function (arg1, arg2, arg3, callback) {
        this.waitFor('a[id="create-act-button"]');
        this.driver.findElement({css : 'div[data-value="'+ process.env.newNegAct +'"] > div > h4 > a'})
            .click()
            .then(setTimeout(callback, 2000));
    });

    this.When(/^selecionar a opção negativa "([^"]*)"$/, function (gradeName, callback) {
        var _this = this,
            grade = _.find(this.badGrades, {text : gradeName});
        this.driver.findElement({css : 'md-select[id="select-'+ process.env.newNegAct +'"]' })
            .click()
            .then(function(){
                _this.waitFor('md-option[value="'+ grade.value +'"]');
                _this.driver.findElement({css : 'md-option[value="'+ grade.value +'"]'})
                    .click()
                    .then(setTimeout(callback, 2000));
            });
    });

    this.When(/^clicar no botão "([^"]*)"$/, function (arg1, callback) {
        var _this = this;
        this.waitFor('button[id="avaliate-'+process.env.newNegAct+'"]');
        this.driver.findElement({id : 'avaliate-'+process.env.newNegAct})
            .click()
            .then(setTimeout(callback, 2000))
    });

    this.Then(/^computará aquela avaliação pro ato do JarJar$/, function (callback) {
        //this.driver.get('localhost:8080');
        this.driver.findElement({ id: 'logout-button' })
            .click()
            .then(setTimeout(callback, 2000));
    });
};
