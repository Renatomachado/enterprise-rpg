'use strict';

var expect = require('chai').expect;

module.exports = function() {
    var _this = this;

    this.World = require('../world.js');
    this.setDefaultTimeout(60000);

    this.When(/^camiseta fornecer o login "([^"]*)"$/, function (login, callback) {
        _this.login = login;
        expect(login).to.equal("Camiseta");
        this.driver.get('localhost:8080');
        this.driver.findElement({ id: 'login' })
            .sendKeys(login)
        .then(function(){
            callback();
        });
    });

    this.When(/^senha "([^"]*)"$/, function (senha, callback) {
        _this.senha = senha;
        expect(_this.login).to.equal("Camiseta");
        expect(senha).to.equal("joaoS2gabriel");
        this.driver.findElement({ id: 'password' })
            .sendKeys(senha)
        .then(function(){
            callback();
        });
    });

    this.When(/^submeter o login$/, function (callback) {
        this.driver.findElement({ id: 'login-button' })
            .click()
            .then(function(){
                callback();
            });
    });

    this.Then(/^camiseta deve conseguir ver a pag inicial$/, function (callback) {

        this.waitFor('button[id="logout-button"]');
        this.driver.findElement({ id: 'logout-button' })
            .click()
            .then(callback);
    });

};