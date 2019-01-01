const jwt = require('jsonwebtoken');
const DB = require('./Database.js');

const TOKEN_MAX_AGE = 1000*3600*12; // 12 = 12 hours

module.exports = function (app) {

    app.get('/api/User/logout', (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    });
    app.post('/api/User/login', (req, res) => {
        authentication(req.body.username, req.body.password, (result) => {
            if (result) {
                res.cookie('token', result, {expires: new Date(Date.now() + TOKEN_MAX_AGE)});
                res.redirect('/main');
            } else {
                res.render('pages/login.ejs', {error: 401});
            }
        });
    });
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    function authentication(username, password, callback) {
        DB.instance().raw("CALL authentication('"+username+"', '"+password+"');").then((data) => {
            //FIRST ROW data[0][0][0]
            if (data[0][0][0]) { /// exist
                callback('JWT ' + jwt.sign({username: data[0][0][0].username, name: data[0][0][0].fullName, loggedIn: Date()}, 'RESTFULAPIs'));
            } else
                callback(undefined);
        });

        // if (username === 'parking' && password === 'parking') {
        //     callback('JWT ' + jwt.sign({name: 'Nguyen Phan Parking', loggedIn: Date()}, 'RESTFULAPIs'));
        // } else
        //     callback(undefined);
    }
};

module.exports.requireAuthentication = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({error: 'Unauthorized user!'});
    }
};