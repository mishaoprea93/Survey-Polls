var users = require('./../controllers/user');
var path = require('path');

module.exports = function(app) {
    app.post('/login', function(req, res) {
            users.login(req, res)
        }),

        app.get('/logout', function(req, res) {
            req.session.destroy();
            console.log(req.session);
            res.redirect('/');
        }),

        app.get('/checkSession', function(req, res) {
            if (!req.session.user) {
                return res.json({ user: null });
            } else {
                return res.json({ user: req.session.user });
            }
        }),

        app.post('/addpoll', function(req, res) {
            users.addpoll(req, res);
        }),

        app.get('/findpolls', function(req, res) {
            users.findpolls(req, res);
        }),

        app.post('/deletepoll', function(req, res) {
            users.deletepoll(req, res);
        }),

        app.post('/options', function(req, res) {
            users.options(req, res)
        }),

        app.post('/vote', function(req, res) {
            users.vote(req, res)
        })




    app.all('**', (req, res, next) => {
        res.sendFile(path.resolve('./client/dist/index.html'))
    });


}