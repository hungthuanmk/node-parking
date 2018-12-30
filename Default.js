const User = require('./User.js');
module.exports = function (app) {

    app.get('/', (req, res) => {
        res.clearCookie('token');
        res.render('pages/login.ejs');
    });

    app.get('/main', User.requireAuthentication, (req, res) => {
        res.render('pages/main.ejs', {userFName: req.user.name, loggedIn: req.user.loggedIn});
    });

};