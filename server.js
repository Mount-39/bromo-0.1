// modules
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);
