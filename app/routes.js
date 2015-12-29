var createRouter = require('express').Router;
var User = require('./models/user');

module.exports.api = function () {

    var router = createRouter();

    router.post('authorize', function (req, res) {
        var user = req.body;
        User.findOne({  })


    });


    return router;

};