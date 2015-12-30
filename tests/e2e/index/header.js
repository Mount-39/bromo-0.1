"use strict";

var config = require('./../config/config');

module.exports = {

    beforeEach: function(browser){
        browser.url(config.HOST)
            .waitForElementVisible('body', 1000)
    },

    afterEach: function(browser, done){
        done();
    },

    "I see Header Toolbar on index page" : function (browser) {
        browser
            .assert.elementPresent("header-toolbar")
            .end();
    },

    "I see bread crumbs when i use sidebar-navigation's links" : function (browser) {
        browser.click("#sidebar > ul > li:nth-child(1) > div > a > i")
            .pause(1000)
            .click('#sidebar > ul > li:nth-child(1) > ul > li:nth-child(1) > a > i')
            .pause(1000)
            .assert.elementPresent('#header > bread-crumbs > ul > li:nth-child(2) > a')
            .end();
    },

    "I can use bread crumbs to go throw pages" : function (browser) {
        browser.click("#sidebar > ul > li:nth-child(1) > div > a > i")
            .pause(1000)
            .click('#sidebar > ul > li:nth-child(1) > ul > li:nth-child(1) > a > i')
            .pause(1000)
            .click('#header > bread-crumbs > ul > li:nth-child(2) > a')
            .pause(1000)
            .assert.urlEquals(config.HOST+"/buying-office/factories")
            .end();
    }

};