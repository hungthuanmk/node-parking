const jsonwebtoken = require('jsonwebtoken');
module.exports = function (app) {
    app.use((req, res, next) => {
        // let token = ;
        // console.log('TOKEN => ' +  req.cookies.key.token);
        if (req.cookies.token && req.cookies.token.split(' ')[0] === 'JWT') {
            jsonwebtoken.verify(req.cookies.token.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                if (err)
                    req.user = undefined;
                req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    });

    app.use((req, res, next) => {
        if (req.user)
            var username = req.user.username;
        else
            var username = 'GUEST';
        var remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('|-> '+ remoteIp + ' ' + username + ' ['+ new Date() + ']' + ' ' +req.method + ' ' + req.url);
        next();
    });
};