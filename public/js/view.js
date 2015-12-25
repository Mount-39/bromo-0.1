// ./app/views/sign.js

// TODO покрыть каждый компонент вокруг комментами
// TODO ибо пиздец запутаться легко
var createSignView = function (socket) {

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

        var data = {
            email: $('[type = email]').val(),
            password: $('[type = password]').val()
        };

        socket.emit('login', data);
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

                    var data = {
                        email: $('[type = email]').val(),
                        password: $('[type = password]').val(),
                        username: $('[type = text]').val()
                    };

                    socket.emit('registration', data);

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
// ./app/views/chat.js

// TODO покрыть каждый компонент вокруг комментами
// TODO ибо пиздец запутаться легко
var createChatView = function () {

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
                text: 'Send'
                //     click: function () { alert('AHAHAHAH'); }
            }).appendTo(form);

        contentEl.append(form);

        return this;
    }

    setAside(aside);
    setContent(content);
};