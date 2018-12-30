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
};