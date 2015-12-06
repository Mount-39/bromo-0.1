// MODULES
// setting up server etc.
var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser');
    cookieParser = require('cookie-parser'),
    app = express(),
    router = express.Router(),
    http = require('http').Server(app);

// mongoDB
var mongoose = require('mongoose'),
    mongoStore = require('connect-mongo')(session);

// socket
var io = require('socket.io')(http);

// VARIABLES
// ==================================
var port = process.env.PORT || 8080,
    folder = __dirname + '/app/';

// CONNECT TO MONGO
mongoose.connect('mongodb://mount39:mount39@ds049651.mongolab.com:49651/bromo');

// SETTING SESSION
app.use(cookieParser());
app.use(session({
    secret: 'mount39',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// SETTING UP ROUTES
// ==================================
// setting up router event on request
router.use(function (req, res, next) {
    //console.log(req.method, req.url);
    next();
});
router.get('/', function (req, res) {
    res.sendFile(folder + 'index.html');
});
router.get('/favicon.icon', function (req, res) {
    res.sendFile(folder + './style/img/favicon.ico');
});
router.use('/js', express.static(folder + '/js'));
router.use('/style', express.static(folder + '/style'));

// applying routes to app
app.use('/', router);

// configuring socket.io
io.on('connect', function (socket) {

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    // sending message
    socket.on('message', function (message) {
        socket.broadcast.emit('message', message);
    });

});

// listening port
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
