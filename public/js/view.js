$(function() {

    var sign = function () {
        var body = $('#page');

        var content = $('<div/>', {
            id: 'login-form'
        }).appendTo(body);

        var fieldset = $('<fieldset/>', {}).appendTo(content);

        var form = $('<form/>', {}).appendTo(fieldset);

        $('<h1/>', {
            text: 'Bromo'
        }).appendTo(form);

        $('<p/>', {
            text: 'Chat with your friends become more easier than ever.'
        }).appendTo(form);


        $('<input/>').attr({
            type: 'email',
            required: "true",
            placeholder: "Email",
            autocomplete: 'off'
        }).appendTo(form);

        $('<input/>').attr({
            type: 'password',
            required: "true",
            placeholder: "Password",
            autocomplete: 'off'
        }).appendTo(form);

        var sign = $('<input/>').attr({
            value: 'Sign In',
            type: 'submit'
        }).appendTo(form);

        form.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: '/api/authorization',
                data: {
                    email: $('[type = email]').val(),
                    password: $('[type = password]').val()
                },
                success: function (data) {
                    $('[class = error]').remove();

                    if (data.success == true) {
                        var token = data.token;
                        window.localStorage.setItem('access_token', token);
                        window.localStorage.setItem('email', data.user.email);
                        window.localStorage.setItem('username', data.user.username);

                        body.empty();
                        chat();
                    }

                    else {
                        sign.before($('<div/>', {
                            class: 'error',
                            text: "Email or Password is incorrect!"
                        }));
                    }
                }
            })
        });


//=====================================

        var register = $('<div/>', {id: "register"}).appendTo(content);

        $('<h5/>', {
            text: "Don't have an Account?"
        }).appendTo(register);


        $('<button/>', {
            class: "btn",
            click: function () {

                form.remove();
                register.remove();
                //forgot.remove();
                //sign.remove();

                var registration = $('<form/>', {}).appendTo(fieldset);
                var error = $('<div/>', {id: "register"}).appendTo(content);

                $('<input/>').attr({
                    type: 'email',
                    required: "true",
                    placeholder: "Email",
                    autocomplete: 'off'
                }).appendTo(registration);

                $('<input/>').attr({
                    type: 'password',
                    required: "true",
                    placeholder: "Password",
                    autocomplete: 'off'
                }).appendTo(registration);

                $('<button/>', {
                    class: "reg", click: function () {
                        $.ajax({
                            type: "POST",
                            url: '/api/registration',
                            data: {
                                email: $('[type = email]').val(),
                                password: $('[type = password]').val(),
                                username: $('[type = text]').val()
                            },
                            success: function (data) {
                                error.empty();

                                if (data.success == true) {
                                    var token = data.token;
                                    window.localStorage.setItem('access_token', token);
                                    window.localStorage.setItem('email', data.user.email);
                                    window.localStorage.setItem('username', data.user.username);

                                    body.empty();
                                    chat();
                                }

                                else {
                                    $('<h5/>', {
                                        text: data.message
                                    }).appendTo(error);
                                }

                            }
                        });
                    }
                }).text("Create").appendTo(registration);

                $('[type = email]').before(
                    $('<input/>', {
                        type: 'text',
                        required: "true",
                        method: "get",
                        placeholder: "Name",
                        autocomplete: 'off'
                    })
                );

                $('[type = text]').addClass("reg");
                $('[type = email]').addClass("reg");
                $('[type = password]').addClass("reg");

                registration.submit(function (e) {
                    e.preventDefault();
                });

            }
        }).text('Create Account Now').appendTo(register);

    };

    sign();

});
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
                    if(!message) return;
                    socket.emit('message', {message: message, username: username});
                    sendMessage(message, 'outbox');
                    $('[id = message]').val("");
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
        var tell = data.username + ": " + data.message
        sendMessage(tell, 'inbox');
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