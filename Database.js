const mysql = require('mysql');

class Database {
    static connect2Db(host, port, username, password) {
        this.con = mysql.createConnection({
            host: host,
            port: port,
            database: 'cncparking',
            user: username,
            password: password
        });

        this.con.connect((err) => {
            if (err) throw err;
            console.log("[DB] Connected to " + host);
        })
    }

    static query(sql, callback) {
        this.con.query(sql, (err, rows) => {
           callback(err, rows);
        });
    }
}

module.exports = Database;