module.exports = function (io) {

    var users = [];

    io.on('connect', function (socket) {

        console.dir(socket, { depth: 1 });

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