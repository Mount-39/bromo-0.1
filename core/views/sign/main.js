var body = $('#page');

//body.addClass('blur');

var content = $('<div/>', {
    id: 'login-form'
}).appendTo(body);

var fieldset = $('<fieldset/>', {
}).appendTo(content);

var form = $('<form/>', {
}).appendTo(fieldset);

$('<input/>').attr({
        type: 	'email',
        required: "true",
        value: "login",
        method:"get",
        onBlur:"if(this.value=='')this.value='login'",
        onFocus:"if(this.value=='login')this.value=''",
    autocomplete: 	'off'
    }).appendTo(form);

$('<input/>').attr({
    type: 	'password',
    required: "true",
    value: "password",
    method:"get",
    onBlur:"if(this.value=='')this.value='password'",
    onFocus:"if(this.value=='password')this.value=''",
    autocomplete: 	'off'
}).appendTo(form);

$('<input/>').attr({
    type: 	'submit',
    value: "GO"
}).appendTo(form);
