(function () {
    var socket = io();
    $(document).ready(function () {
        $('button').on('click', function(){
            var message = $('#message');
            // emit it's like triggering some event
            socket.emit('message', message.val());
            addMessage(message.val(), 'outbox');
            message.val('');
            return false;
        });
        socket.on('message', function (message) {
            console.log('I get message!');
            addMessage(message, 'indox');
        });
    });
    function addMessage(message, className){
        $('#chat ul').append($('<li>').addClass(className).text(message));
    }
})();