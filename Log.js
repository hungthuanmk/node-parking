const User = require('./User.js');
const DB = require('./Database.js');

module.exports = function (app) {
        app.post('/api/Log', User.requireAuthentication, (req, res) => {

        })
};