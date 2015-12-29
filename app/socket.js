module.exports = function (io) {

    io.on('connect', function (socket) {

        // WHEN DISCONNECT
        socket.on('disconnect', function (asdasd) {
            console.log('user disconnected');
        });
        ///////////////////////////////////////////

        // SEND MESSAGE TO OTHER SOCKETS
        socket.on('message', function (message) {
            socket.broadcast.emit('message', message);
        });
        ///////////////////////////////////////////

    });
};