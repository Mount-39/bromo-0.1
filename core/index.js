(function () {
    var socket = io();

    $(document).ready(function () {
        $('form').submit(function(){
            var m = $('#m');
            socket.emit('chat message', m.val());
            m.val('');
            return false;
        });
    });
})();