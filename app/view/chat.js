var chat = function () {

    var socket = io();
    socket.user = {username: username, email: email};
    var Users = [];

    var username = window.localStorage.getItem('username');
    var email = window.localStorage.getItem('email');

    var body = $('#page');

//========================

    var aside = $('<aside/>', {
        id: 'sidebar'
    }).appendTo(body);

    var content = $('<div/>', {
        id: 'view'
    }).appendTo(body);


//========ASIDE===========

    function setAside(asideEl) {

        var header = $('<header/>', {
            class: 'menu'
        });

        $('<h1/>', {
            text: 'Bromo'
        }).appendTo(header);

        asideEl.append(header);

        $('<div/>', {
            id: 'people'
        }).appendTo(asideEl);

        return this;

    }

//========Content=========

    function setContent(contentEl) {

        $('<header/>', {
            class: 'title',
            text: 'Main chat'
        }).appendTo(contentEl);

        var chat = $('<div/>', {
            id: 'chat'
        });

        $('<ul/>', {}).appendTo(chat);

        contentEl.append(chat);

        var form = $('<div/>', {
            id: 'form'
        });

        $('<input/>').attr({
            id: 'message',
            type: 'text',
            autocomplete: 'off'
        }).appendTo(form);

        $('<button/>',
            {
                text: 'Send',
                click: function () {
                    var message = $('[id = message]').val();
                    socket.emit('message', {message: message, username: username});
                    sendMessage(message, 'outbox');
                    $('[id = message]').empty();
                }
            }).appendTo(form);

        contentEl.append(form);

        return this;
    }

    $.ajax({
        type: "GET",
        url: "/api/users",
        headers: {
            "x-access-token": window.localStorage.getItem('access_token')
        },
        success: function (data) {
            console.log(data);
            if (data.success == true) {

                setAside(aside);            //Run the chat
                setContent(content);

                Users = data.users;

                       //??????????????????????
            }

            else {
                content.append($('<div/>', {
                    class: 'error',
                    text: "Login first, stranger!"
                }));

                body.empty();
                sign();
            }
        }
    });

    function sendMessage(message, sendType) {
        $('[id = chat]').append(
            $('<li/>', {
                text: message,
                class: sendType
            })
        );
    }

    socket.on('message', function (data) {

        sendMessage(data.username + ": " + data.message, 'inbox');
        //li class=inbox | outbox
    });

    //TODO
    $.unload(function (e) {
        socket.close();
    });
    //TODO
    socket.on('clear', function () {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('username');
        window.location.reload()
    });

};