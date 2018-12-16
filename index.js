const Database = require('./Database.js');
const Employee = require('./Employee.js');
const Report = require('./Report.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');

const expressPort = 3000;

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MIDDLEWARE
app.use((req, res, next) => {
    // let token = ;
    // console.log('TOKEN => ' +  req.cookies.key.token);
    if (req.cookies.key && req.cookies.key.token && req.cookies.key.token.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.cookies.key.token.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
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

app.get('/', (req, res) => {
    // res.render('pages/login.ejs');
    res.render('pages/login.ejs');
});

app.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    Employee.authentication(req.body.username, req.body.password, (employeeName) => {
        //res.clearCookie('key');
        res.cookie('key', employeeName, {expires: new Date(Date.now() + 1000*3600*12)});
        res.send(employeeName);
    });
});

app.get('/logout', (req, res) => {
   res.clearCookie('key');
   res.end();
});

app.get('/api/test', (req, res) => {
   Employee.loginRequired(req, res, () => {
       res.send('Hello World ' + req.user.name);
   })
});

app.listen(expressPort, (err) => {
    if (err) throw err;
    console.log("Listening on port " + expressPort);
});

Database.connect2Db('hcmiuiot.zapto.org', 3306, 'parking', 'parking');
Report.createDemo();