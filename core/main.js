(function () {
    var socket = io();

    $(document).ready(function () {
        console.log('sas');
        $('button').on('click', function(){
            var message = $('#message');
            socket.emit('message', message.val())
            message.val('');
            return false;
        });
        socket.on('message', function (message) {
            $('#chat ul').append($('<li>').addClass('inbox').text(message));
        });
    });
})();