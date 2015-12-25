module.exports = function (io, mongoose) {

    var users = [];

    io.on('connect', function (socket) {

        // SESSION
        var session = socket.handshake.session;
        var cleanSession = function () {
            session.hasUser = false;
            session.email = '';
            session.username = '';
            session.password = '';
        };
        var setSession = function (user) {
            session.hasUser = true;
            session.email = user.email;
            session.username = user.username;
            session.password = user.password;
        };
        if (session.hasUser) {
            // searching for user in our database
            mongoose.models['user'].findOne({
                email: session.email,
                username: session.username,
                password: session.password
            }, function (error, user) {
                // if session user is valid
                // then logging
                if (user) {
                    login(user);
                }
            });
        } else { // if session user doesn't exist - go to sign form
            sign();
        }
        ///////////////////////////////////////////

        // entering the sign view here
        var sign = function () {
            // cleaining the session
            // loading sign view
            cleanSession();
            socket.emit('sign');
            ///////////////////////////////////////////

            socket.on('registration', function (user) {
                var user = require('./models/user')({
                    email: session.email,
                    username: session.username,
                    password: session.password
                });
                user.save(function (error) {
                    if (error) {
                        socket.emit('registrationError', error);
                    } else {
                        setSession(user);
                        login(user);
                    }
                })
            });

            socket.on('login', function (user) {
                mongoose.models['user'].findOne({
                    email: session.email,
                    password: session.password
                }, function (error, user) {
                    if (user) {
                        setSession(user);
                        login(user);
                    } else if (error) {
                        socket.emit('loginError', error);
                    } else {
                        socket.emit('loginError', 'no such user');
                    }
                });
            })
        };

        // entering the chat view here
        var login = function (user) {
            users.push({
                name: user.username,
                email: user.email
            });
            socket.emit('login', user);
            io.emit('join', users);
            socket.on('message', function (message) {
                socket.broadcast.emit('message', message);
            })
        };

    });
};