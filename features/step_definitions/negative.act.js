'use strict';

var expect = require('chai').expect,
    _ = require('lodash');

module.exports = function() {
    var that = this;

    this.World = require('../world.js');
    this.setDefaultTimeout(60000);

    this.Before(function(){
        this.badusers = [
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

        this.types = [
            {value : 1, name : 'Valor'},
            {value : -1, name :'Vergonha'}
        ];
    });

    this.Given(/^"([^"]*)" está logado$/, function (login, callback) {
        var _this = this;
        this.waitFor('input[id="login"]');
        expect(login).to.equal('Camiseta');
        this.driver.get('localhost:8080');
        this.driver.findElement({ id: 'login' })
            .sendKeys(login)
            .then(function(){
                _this.driver.findElement({ id: 'password' })
                    .sendKeys('joaoS2gabriel')
                    .then(function(){
                        _this.driver.findElement({ id: 'login-button' })
                            .click()
                            .then(callback);
                    });
            });
    });

    this.When(/^Camiseta clicará no botão Criar ato$/, function (callback) {
        var _this = this;
        this.waitFor('a[id="create-act-button"]');
        this.driver.findElements({css : 'md-card[class="bg-danger"'}).then(function(cards){
            _this.cardsCount = cards.length;
        });
        this.driver.findElement({id : 'create-act-button'})
            .click()
            .then(callback);
    });

    this.When(/^camiseta  preencher o formulario com usuario "([^"]*)"$/, function (userName, callback) {
        var userSearch = _.find(this.badusers, {name : userName}),
            _this = this;
        expect(userSearch.id).to.equal('566605bf7047e6bd0a621a63');
        _this.waitFor('md-select[id="user-select"');
        this.driver.findElement({id : 'user-select'})
            .click()
            .then(setTimeout(function(){
                _this.waitFor('md-option[value="'+ userSearch.id +'"]');
                _this.driver.findElement({css : 'md-option[value="'+ userSearch.id +'"]'})
                    .click()
                    .then(setTimeout(callback, 1000));
            }, 500));
    });

    this.When(/^"([^"]*)" como tipo$/, function (typeName, callback) {
        var type = _.find(this.types, {name : typeName}),
            _this = this;
        expect(type.value).to.equal(-1);
        _this.waitFor('md-select[id="type-select"');
        this.driver.findElement({id : 'type-select'})
            .click()
            .then(function(){
                _this.waitFor('md-option[value="'+ type.value +'"]', 30 * 1000);
                _this.driver.findElement({css : 'md-option[value="'+ type.value +'"]'})
                    .click()
                    .then(setTimeout(callback, 1000));
            });
    });

    //this.When(/^"([^"]*)" como nota$/, function (gradeName, callback) {
    //    var grade = _.find(this.badGrades, {text : gradeName}),
    //        _this = this;
    //    expect(grade.value).to.equal(4);
    //    _this.waitFor('md-select[id="grade-select"');
    //    this.driver.findElement({id : 'grade-select'})
    //        .click()
    //        .then(function(){
    //            _this.waitFor('md-option[value="'+ grade.value +'"]');
    //            _this.driver.findElement({css : 'md-option[value="'+ grade.value +'"]'})
    //                .click()
    //                .then(setTimeout(callback, 1000));
    //        });
    //});

    this.When(/^"([^"]*)" como descrição$/, function (comment, callback) {
        this.driver.findElement({id: 'comment-area'})
            .sendKeys(comment)
            .then(callback);
    });


    this.Then(/^um novo ato de vergonha deve estar listado na pagina inicial$/, function (callback) {
        var _this = this;
        this.driver.findElement({id : 'save-act-btn'})
            .click()
            .then(function() {
                _this.waitFor('md-card');
                _this.driver.findElements({css : 'md-card[class="bg-danger"'})
                    .then(function(cards){
                        expect(cards.length).to.equal(_this.cardsCount + 1);
                        _this.driver.findElement({css : 'md-card[class="bg-danger"] > md-card-actions > uib-accordion > div > div'})
                            .getAttribute('data-value')
                            .then(function (value) {
                                process.env.newNegAct = value;
                                _this.driver.get('localhost:8080');
                                _this.driver.findElement({ id: 'logout-button' })
                                    .click()
                                    .then(callback);
                            });
                    });
            });
    });
};