(function () {
    var socket = io();

    $(document).ready(function () {
        $('form').submit(function(){
            var m = $('#m');
            // emit it's like triggering some event
            socket.emit('message', m.val());

            m.val('');
            return false;
        });
        socket.on('message', function (message) {
            $('#messages').append($('<li>').text(message));
        });
    });
})();