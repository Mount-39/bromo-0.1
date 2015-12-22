module.exports = function (io) {
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