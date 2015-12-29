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