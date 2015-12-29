// EXPRESS 4
var express         = require('express');
var app             = express();
var http            = require('http').Server(app);
///////////////////////////////////////////

// USERS
var users = [];
///////////////////////////////////////////

// CONFIG
var config          = require('./config/config');
///////////////////////////////////////////

// EXPRESS MIDDLEWARE
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var expressSession  = require('express-session');
var mongoStore      = require('connect-mongo')(expressSession);
var parser          = require('body-parser');
var router          = express.Router();
///////////////////////////////////////////

// SETTING UP MONGO
var mongoose        = require('mongoose');
mongoose.connect(config.mongo.local);
///////////////////////////////////////////

// SETTING UP APP
var session = expressSession({
    secret: config.secret,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
});
app.use(parser());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session);
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app, router, users);
///////////////////////////////////////////

// SOCKET.IO
var io              = require('socket.io')(http);
var ioSession       = require('socket.io-express-session');
io.use(ioSession(session));
require('./app/socket')(io, users);
///////////////////////////////////////////

// START UP SERVER
var port = process.env.PORT || 8080;
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
///////////////////////////////////////////
