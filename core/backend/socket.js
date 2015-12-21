var sockets = function (http) {

    var io = require('socket.io')(http);

    io.on('connect', function (socket) {

        console.log('user connected');

        socket.on('disconnect', function (asdasd) {
            console.log('user disconnected');
        });

        socket.on('message', function (message) {
            socket.broadcast.emit('message', message);
        });

    });
};

module.exports = function (http) {
    var http = http;
    return function () {
        sockets(http);
    }
};