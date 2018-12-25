const db = require('./Database.js');
const jwt = require('jsonwebtoken');

class Employee {
    static authentication(username, password, callback, callback2) {
        if (username == 'parking' && password == 'parking') {
            callback({token: 'JWT ' + jwt.sign({name: 'Nguyen Phan Parking', loggedIn: Date()}, 'RESTFULAPIs')});
        } else
            callback2();

       // let sql = "SELECT cncparking.authentication('"+username+"', '"+password+"') AS name;";
       // db.query(sql, (err, rows) => {
       //     let fName = rows[0].name;
       //     if (fName) {
       //         // callback(rows[0].name);
       //         callback({token: 'JWT ' + jwt.sign({name: rows[0].name}, 'RESTFULAPIs')});
       //     } //else
       //         //callback("LOGIN FAILED");
       // });
    }

    static loginRequired(req, res, next1, next2) {
        if (req.user) {
            next1();
        } else {
            if (next2)
                next2();
            else {
                return res.status(401).json({message: 'Unauthorized user!'});
            }
            //return res.status(401).json({message: 'Unauthorized user!'});
        }
    }
}

module.exports = Employee;