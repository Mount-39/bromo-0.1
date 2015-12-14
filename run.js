// MODULES
var express = require('express'),
    router = express.Router(),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose'),
    User = require('./core/backend/models/user');

mongoose.connect('mongodb://localhost:27017/test');

// VARIABLES
// ==================================
var port = 8080,
    folder = __dirname + '/app/';

// SETTING UP ROUTES
// ==================================
// setting up router event on request
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
// index.html
router.get('/', function (req, res) {
    res.sendFile(folder + 'index.html');
});
// js/
router.use('/js', express.static(folder + '/js'));
// style/
router.use('/style', express.static(folder + '/style'));

// applying routes to app
app.use('/', router);

// configuring socket.io
io.on('connect', function (socket) {
    console.log('User connected to Bromo :)');

    socket.on('disconnect', function () {
        console.log('User disconnected from Bromo :(');
    });

    socket.on('sign up', function (user) {
        var newUser = User({
            email: user.email,
            password: user.password
        });
        newUser.save(function (err, done) {
            if(err){
                console.log('index.js: oh there is error, while saving user');
                console.log(err);
                socket.emit('alarm', 'fuck');
            }
        });

    });

    // client sending message
    socket.on('message', function (message) {
        // broadcast - send message to everyone but sender
        socket.broadcast.emit('message', message);
    });
});

// listening port
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
