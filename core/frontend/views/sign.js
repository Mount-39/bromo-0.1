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

    form.submit( function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/authorization',
            data: {
                email: $('[type = email]').val(),
                password: $('[type = password]').val()
            },
            success: function(data) {
                console.log(data);
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
                        success: function(data) {
                            console.log(data);
                        }
                    });
                }}).text("Create").appendTo(registration);

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

            registration.submit( function (e) {
                e.preventDefault();
            });

        }
    }).text('Create Account Now').appendTo(register);

};