module.exports = function (socket) {

    console.log('user connected');

    socket.on('disconnect', function (user) {
        console.log('user ' + user.username + ' disconnected');
    });

    socket.on('message', function (data) {
        socket.broadcast.emit('message', data);
    })

};