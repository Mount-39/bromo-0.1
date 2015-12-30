// EXPRESS 4
var express         = require('express');
var app             = express();
var http            = require('http').Server(app);

// EXPRESS MIDDLEWARE
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var expressSession  = require('express-session');
var mongoStore      = require('connect-mongo')(expressSession);
var parser          = require('body-parser');
var router          = express.Router();

// CONFIG
var config          = require('./app/config');

// SETTING UP MONGO
var mongoose        = require('mongoose');
mongoose.connect(config.mongo.url);
///////////////////////////////////////////

// SETTING UP APP
var session = expressSession({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
});
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session);
app.use(express.static(__dirname + '/public'));
app.use('/api', require('./app/routes').api(app));
///////////////////////////////////////////

// SOCKET.IO
var io              = require('socket.io')(http);
io.on('connect', require('./app/socket'));
///////////////////////////////////////////

// START UP SERVER
var port = process.env.PORT || 8080;
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
///////////////////////////////////////////
