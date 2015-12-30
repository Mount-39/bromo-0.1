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

                    if (data == true) {
                        var token = data.token;
                        window.localStorage.setItem('access_token', token);

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

                                console.log(data.result);

                                if (data.success == true) {
                                    var token = data.token;
                                    window.localStorage.setItem('access_token', token);
                                    window.localStorage.setItem('email', $('[type = email]').val());
                                    window.localStorage.setItem('username', $('[type = text]').val());

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