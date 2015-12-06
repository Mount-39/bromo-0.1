$ = require('/home/drukas/Projects/Bromo/bower_components/jquery/dist/jquery.js');

var sign = function sign() {

    var body = $('#page');

    var content = $('<div/>', {
        id: 'login-form'
    }).appendTo(body);

    var fieldset = $('<fieldset/>', {}).appendTo(content);

    var form = $('<form/>', {}).appendTo(fieldset);

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

    $('<input/>').attr({
        type: 'submit',
        value: "GO"
    }).appendTo(form);

    return body.innerHtml;

};

module.exports = sign;