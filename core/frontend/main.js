(function () {
    var socket = io();
    $(document).ready(function () {
        $('button').on('click', function(){
            var message = $('#message');
            // emit it's like triggering some event
            socket.emit('message', message.val());
            addMessage(message.val(), 'outbox');
            message.val('');
            socket.emit('sign up', {
                email: 'bromo@bromo.com',
                password: 'password'
            });
            return false;
        });
        socket.on('message', function (message) {
            console.log('main.js: I get message!');
            addMessage(message, 'indox');
        });
        socket.on('alarm', function (e) {
            console.log('main.js: something is wrong!');
            console.log(e);
        })
    });
    function addMessage(message, className){
        $('#chat ul').append($('<li>').addClass(className).text(message));
    }
})();