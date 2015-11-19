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

    socket.on('message', function (message) {
        socket.broadcast.emit('message', message);
        console.log('I sent message!')
    });
});

// listening port
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
