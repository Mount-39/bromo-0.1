/*
var sign = function sign(){*/

    var body = $('#page');

//body.addClass('blur');

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

$('<input/>').attr({
    type: 'submit',
    value: "Sign in"
}).appendTo(form);

$('<input/>').attr({
    type: 'submit',
    value: "Forgot Password?"
}).appendTo(form);

/*
    return body;

}

module.exports = sign;*/
