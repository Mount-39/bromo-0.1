(function () {
    var socket = io();

    $(document).ready(function () {


        // send the message
        $('button').on('click', function(){
            var message = $('#message');
            if(message){
                sendMessage(message.val());
            }
        });

        socket.on('enter', function($page){
            console.log($page());
        });

        // get the message
        socket.on('message', function (message) {
            addMessage(message, 'indox');
        });

        // some error on server
        socket.on('alarm', function (e) {
            alert(e);
        })
    });

    /**
     *
     * @param {string} message
     * @param {string} className
     */
    function addMessage(message, className){
        $('ul#chat').append($('<li>').addClass(className).text(message));
    }

    /**
     *
     * @param {string} message
     */
    function sendMessage(message){
        socket.emit('message', message);
        addMessage(message.val(), 'outbox');
        message.val('');
    }

})();