const Database = require('./Database.js');
const Employee = require('./Employee.js');
const Report = require('./Report.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const expressPort = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // res.render('pages/login.ejs');
    res.render('pages/login.ejs');
});

app.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    Employee.authentication(req.body.username, req.body.password, (employeeName) => {
        res.send(employeeName);
    });
});

app.listen(expressPort, (err) => {
    if (err) throw err;
    console.log("Listening on port " + expressPort);
});

Database.connect2Db('hcmiuiot.zapto.org', 3306, 'parking', 'parking');
Report.createDemo();