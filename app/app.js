// ./app/clientCore.js

var signIn = require("./views/sign");

var socket = io();
console.log('Socket is on fire', socket);

var main = function () {
    var socket = io();

    $(document).ready(function () {

        var btnClick = function () {
            var message = $('#message');
            if (message) {
                sendMessage(message.val());
            }
        };

        $('button').on('click', btnClick);

        // get the message
        socket.on('message', function (message) {
            addMessage(message, 'inbox');
        });

        // some error on server
        socket.on('alarm', function (e) {
            alert(e);
        })
    });

    socket.on('sign', function () {

        signIn(socket);

    });


    socket.on('loginError', function (error) {

    });

    socket.on('registrationError', function (error) {

    });



    /**
     *
     * @param {string} message
     * @param {string} className
     */
    function addMessage(message, className) {
        $('ul#chat').append($('<li>').addClass(className).text(message));
    }

    /**
     *
     * @param {string} message
     */
    function sendMessage(message) {
        socket.emit('message', message);
        addMessage(message.val(), 'outbox');
        message.val('');
    }

};

var setSocket = function () {

};