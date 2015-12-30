module.exports = function (io) {

    return function (socket) {

        console.log('user connected');

        //TODO
        socket.on('disconnect', function (user) {
            socket.emit('clear');
        });

        socket.on('message', function (data) {
            socket.broadcast.emit('message', data);
        })

    };

};