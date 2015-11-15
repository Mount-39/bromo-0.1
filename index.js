// MODULES
// ==================================
var express = require('express'),
    router = express.Router();
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

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
router.get('/', function(req, res){
    res.sendFile(folder + 'index.html');
});
// bundle.min.js
router.get('/bundle.min.js', function(req, res){
    res.sendFile(folder + 'bundle.min.js');
});
// bundle.js
router.get('/bundle.js', function(req, res){
    res.sendFile(folder + 'bundle.js');
});
// bundle.min.css
router.get('/bundle.min.css', function(req, res){
    res.sendFile(folder + 'bundle.min.css');
});
// bundle.css
router.get('/bundle.css', function(req, res){
    res.sendFile(folder + 'bundle.css');
});
router.get('/background/bg1.jpg', function(req, res){
    res.sendFile(folder + 'background/bg1.jpg');
});

// applying routes to app
app.use('/', router);

// configuring socket.io
io.on('connect', function (socket) {
    console.log('User connected to Bromo :)');

    socket.on('disconnect', function () {
        console.log('User disconnected from Bromo :(');
    });

    socket.on('message', function (message) {
        io.emit('message', message);
    });
});

// listening port
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
