var User        = require('./models/user');
var mongoose    = require('mongoose');

module.exports = function (app, router) {

    // INDEX.HTML
    router.get('/', function (req, res) {
        res.sendFile(folder + 'index.html');
    });

    // TODO instead of post requests use Socket.on & Socket.emit
    // POST REQUESTS
    router.post('/registration', function (req, res) {
        var data = req.body;
        var user = new User({
            email: data.email,
            password: data.password,
            username: data.username
        });
        user.save(function (error) {
            if (error) {
                console.log(error);
                res.send({
                    result: false,
                    error: error.message
                });
            } else {
                req.session.username = user.username;
                req.session.email = user.email;
                res.send({
                    result: true,
                    username: user.username
                });
            }
        })
    });
    router.post('/authorization', function (req, res) {
        var data = req.body;
        mongoose.models['user'].findOne({email: data.email, password: data.password}, function (err, user) {
            if (user) {
                res.send(true);
            } else {
                res.send(false);
            }
        });
    });

    // APPLYING ROUTES
    app.use('/', router);

};