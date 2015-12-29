// ./app/clientCore.js

var socket = io();

var main = function () {

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