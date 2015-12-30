var createRouter = require('express').Router;
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var secret = require('./config').secret;

module.exports.api = function (app) {

    var router = createRouter();

    function createToken(user) {
        return jwt.sign({
            username: user.username,
            email: user.email
        } , secret, {
            expiresIn: 10 * 60
        });
    }

    router.post('authorization', function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {
            if(err) {
                throw err;
            }
            if(!user) {
                res.json({
                    success: false,
                    message: 'user error'
                })
            } else if (user.password != req.body.password){
                res.json({
                    success: false,
                    message: 'pass error'
                })
            } else {
                var token = createToken(user);
                res.json({
                    success: true,
                    message: 'token is ready',
                    token: token
                });
            }
        });
    });
    router.post('registration', function (req, res) {
        var user = User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        user.save(function (err) {
            if(err){
                throw err;
            } else {
                var token = createToken(user);
                res.json({
                    success: true,
                    message: 'user added, token is ready',
                    token: token
                });
            }
        })
    });

    router.post('/users', function (req, res) {

    });
    router.get('/users', function (req, res) {

    });

    return router;

};