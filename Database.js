// const mysql = require('mysql');

class Database {
    static instance() {
        // console.log('hello');
        if (! this.knex) {
            this.knex = require('knex')({
                client: 'mysql',
                connection: {
                    host: 'hcmiuiot.zapto.org',
                    user: 'parking',
                    password: 'parking',
                    database: 'nodeparking'
                }
            });
        }
        if (! this.knex)  {
            throw 'Error connect to DB';
        } else
            return this.knex;
    }

    // get instance() {
    //      console.log('hello');
    //     // return ( () => {
    //     //     if (!this.knex)
    //             this.connect2Db2();
    //     //     if (!this.knex)
    //     //         throw 'Can not connect to DB';
    //     //     else
    //             return this.knex;
    //    // });
    // }

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