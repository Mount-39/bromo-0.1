var port = 8080,
    express = require('express');

express().use(express.static(__dirname + '/public'))
         .listen(port);

console.log('Server is running on port: ' + port);