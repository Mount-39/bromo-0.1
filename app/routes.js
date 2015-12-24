var User        = require('./models/user');

module.exports = function (app, router, mongoose) {

    // INDEX.HTML
    router.get('/', function (req, res) {
        res.sendFile(folder + 'index.html');
    });

    // APPLYING ROUTES
    app.use('/', router);

};