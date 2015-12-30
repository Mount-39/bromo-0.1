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

    "I see Header Directive on index page" : function (browser) {
        browser
            .assert.elementPresent("header-toolbar")
            .end();
    },


};