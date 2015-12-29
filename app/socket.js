module.exports = function (io) {

    var users = [];

    io.on('connect', function (socket) {

        socket.on('connect', function () {

            var session = socket.handshake.session;

            users.push({
                username: session.username,
                email : session.email
            });

            console.log(users);

        });

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