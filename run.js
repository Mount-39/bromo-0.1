// MODULES
var express = require('express'),
    router = express.Router(),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose');
    //User = require('./core/models/user');

// VARIABLES
// ==================================
var port = 8080,
    folder = __dirname + '/app/';

//mongoose.connect('mongodb://localhost:27017/bromo');

// SETTING UP ROUTES
// ==================================
// setting up router event on request
//router.use(function (req, res, next) {
//    console.log(req.method, req.url);
//    next();
//});
router.get('/', function (req, res) {
    res.sendFile(folder + 'index.html');
});
router.use('/js', express.static(folder + '/js'));
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
        //var newUser = User({
        //    email: user.email,
        //    password: user.password
        //});
        //newUser.save(function (err, done) {
        //    if(err){
        //        console.log('run.js - error while saving user');
        //        console.log(typeof err);
        //        socket.emit('alarm', err.toString());
        //    }
        //});

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
