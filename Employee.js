const db = require('./Database.js');

class Employee {
    static authentication(username, password, callback) {
       let sql = "SELECT cncparking.authentication('"+username+"', '"+password+"') AS name;";
       db.query(sql, (err, rows) => {
           console.log(rows[0].name);
           callback(rows[0].name);
       });
    }
}

module.exports = Employee;