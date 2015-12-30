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

    "I see sign in form on index page" : function (browser) {
        browser
            .assert.elementPresent("#login-form > fieldset")
            .end();
    },

    "I can go to register form by click button Register Now" : function (browser) {
        browser.click("#register > button")
            .pause(1000)
            .assert.elementPresent('#login-form > fieldset > form > input:nth-child(1)')
            .end();
    }

};