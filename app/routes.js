var createRouter = require('express').Router;
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var secret = require('./config').secret;

module.exports.api = function (app) {

    var router = createRouter();

    app.usersOnline = [];

    function createToken(user) {
        return jwt.sign({
            username: user.username,
            email: user.email
        }, secret, {
            expiresIn: 10 * 60
        });
    }

    function addUser(user) {
        for (var i in app.usersOnline) {
            if (user.email == app.usersOnline[i].email) {
                return false;
            }
        }
        app.usersOnline.push({
            username: user.username,
            email: user.email
        });
    }

    function removeUser(user) {
        for (var i in app.usersOnline) {
            if (user.email == app.usersOnline[i].email) {
                app.usersOnline.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    router.post('/authorization', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.json({
                    success: false,
                    message: 'user error'
                })
            } else if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'pass error'
                })
            } else {
                var token = createToken(user);
                addUser(user);
                res.json({
                    success: true,
                    message: 'token is ready',
                    token: token,
                    user: {
                        username: user.username,
                        email: user.email
                    }
                });
            }
        });
    });
    router.post('/registration', function (req, res) {
        var user = User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        user.save(function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            } else {
                var token = createToken(user);
                addUser(user);
                res.json({
                    success: true,
                    message: 'user added, token is ready',
                    token: token,
                    user: {
                        username: user.username,
                        email: user.email
                    }
                });
            }
        })
    });

    function verifyToken(req, res, next) {
        var token = req.body.token || req.headers['x-access-token'];
        if (!token) {
            res.json({
                success: false,
                message: 'there is no token attached'
            });
        } else {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'token expired or you are cheater'
                    })
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    }

    router.get('/users', verifyToken, function (req, res) {
        if (req.decoded) {
            res.json({
                success: true,
                users: app.usersOnline
            });
        } else {
            res.json({
                success: false,
                message: 'there is no token attached'
            });
        }

    });
    router.get('/logout', verifyToken, function (req, res) {
        if (req.decoded) {
            var user = req.decoded;
            var success = removeUser(user);
            res.json({
                success: success
            });
        } else {
            res.json({
                success: false,
                message: 'Ooops!'
            });
        }
    });

    return router;

};