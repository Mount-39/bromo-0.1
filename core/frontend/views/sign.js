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
        method: "get",
        placeholder: "Email",
        autocomplete: 'off'
    }).appendTo(form);

    $('<input/>').attr({
        type: 'password',
        required: "true",
        method: "get",
        placeholder: "Password",
        autocomplete: 'off'
    }).appendTo(form);

    var sign = $('<input/>').attr({
        type: 'submit',
        value: "Sign In"
    }).appendTo(form);

    var forgot = $('<button/>', {id: "btn",}).text('Forgot Password?').appendTo(form);

//=====================================

    var register = $('<div/>', {id: "register"}).appendTo(content);

    $('<h5/>', {
        text: "Don't have an Account?"
    }).appendTo(register);


    $('<button/>', {
        class: "btn",
        click: function () {
            register.hide();
            forgot.hide();
            sign.attr({value: "Create", class: "reg"});

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

        }
    }).text('Create Account Now').appendTo(register);

};