// EXPRESS 4
var express         = require('express');
var app             = express();
var http            = require('http').Server(app);
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
var mongoConfig     = require('./config/database');
var mongoose        = require('mongoose');
mongoose.connect(mongoConfig.url);
///////////////////////////////////////////

// SETTING UP APP
var session         = expressSession({
    secret: 'r2d2',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
});
app.use(parser());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session);
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app, router, mongoose);
///////////////////////////////////////////

// SOCKET.IO
var io              = require('socket.io')(http);
var ioSession       = require('socket.io-express-session');
io.use(ioSession(session));
require('./app/socket')(io, mongoose);
///////////////////////////////////////////

// START UP SERVER
var port = process.env.PORT || 8080;
http.listen(port, function () {
    console.log('Bromo is running on port ' + port);
});
///////////////////////////////////////////