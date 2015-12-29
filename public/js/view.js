// ./app/views/sign.js

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
                url: '/authorization',
                data: {
                    email: $('[type = email]').val(),
                    password: $('[type = password]').val()
                },
                success: function (data) {
                    $('[class = error]').remove();

                    if (data == true) {
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
                            url: '/registration',
                            data: {
                                email: $('[type = email]').val(),
                                password: $('[type = password]').val(),
                                username: $('[type = text]').val()
                            },
                            success: function (data) {
                                error.empty();

                                console.log(data.result);

                                if (data.result == true) {
                                    body.empty();
                                    chat();
                                }

                                if(data.error.indexOf("E11000") >= 0){
                                    $('<h5/>', {
                                        text: "This username is already exists!"
                                    }).appendTo(error);
                                }

                                else {
                                    $('<h5/>', {
                                        text: data.error
                                    }).appendTo(error);
                                }

                                console.log(data);
                                main();
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
// ./app/views/chat.js

var chat = function () {
    var body = $('#page');

//========================

    /**
     *
     * @param {string} message
     * @param {string} className
     */
    function addMessage(message, className) {
        $('div#chat ul').append($('li').addClass(className).text(message));
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
                click: function () { sendMessage($('#message')) }
            }).appendTo(form);

        contentEl.append(form);

        return this;
    }

    setAside(aside);
    setContent(content);

    socket.on('message', function (message) {
        addMessage(message, 'inbox');
    })
};