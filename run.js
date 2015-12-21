// SETTING UP THE SERVER
var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var cookieParser = require('cookie-parser');
var session = require('express-session');
var parser = require('body-parser');
///////////////////////////////////////////

// SETTING UP SOCKET.IO
var io = require('socket.io')(http);
///////////////////////////////////////////

// SETTING UP MONGO
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://mount39:mount39@ds049651.mongolab.com:49651/bromo');
///////////////////////////////////////////

// SETTING UP PORT AND STATIC FOLDER
var port = process.env.PORT || 8080,
    folder = __dirname + '/app/';
///////////////////////////////////////////

// SETTING UP COOKIES & SESSION
app.use(parser());
app.use(cookieParser());
app.use(session({
    secret: 'r2d2',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
///////////////////////////////////////////

// CONFIGURING ROUTES
router.use(function (req, res, next) {
    //console.log(req.method, req.url);
    next();
});
router.get('/', function (req, res) {
    res.sendFile(folder + 'index.html');
});
router.use('/js', express.static(folder + '/js'));
router.use('/style', express.static(folder + '/style'));
router.post('/registration', function (req, res) {
    var data = req.body;
    var user = new User({
        email: data.email,
        password: data.password,
        username: data.username
    });
    try {
        user.save()
    }
});
router.post('/authorization', function (req, res) {
    console.log(req.body);
    res.send('success authorization post');
});

app.use('/', router);
///////////////////////////////////////////

// CONFIGURING SOCKET.IO
io.on('connect', function (socket) {

    socket.on('disconnect', function (asdasd) {
        console.log('user disconnected');
    });

    socket.on('message', function (message) {
        socket.broadcast.emit('message', message);
    });

});
///////////////////////////////////////////

// START UP SERVER
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
