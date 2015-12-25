// ./app/app.js

var socket = io();

socket.on('sign', function () {
    // TODO on.loginError in signView
    // TODO on.registrationError in signView
    // TODO emit.login in signView
    // TODO emit.registration in signView
    createSignView(socket);
});

socket.on('login', function (user) {
    // TODO on.join in chatView
    // TODO on.message in chatView
    // TODO emit.message in chatView
    createChatView(socket, user);
});

// при такой схеме не получится пока сделать logout нормальной
// это только если вьюшки связывать, но хоть что-то пока будет норм

// теперь app.js реально просто точка входа в приложение