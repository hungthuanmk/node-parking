const DB = require('./Database.js');
// const Employee = require('./Employee.js');
// const ImgProcessing = require('./ImgProcessing.js');
// const Tracking = require('./Tracking.js');
// const Report = require('./Report.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');

const expressPort = 3000;
var actualPort = process.env.PORT || expressPort;

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + "/views"));

// MIDDLEWARE///////////////
require('./Middeware')(app);
////////////////////////////

require('./Default')(app);
require('./User')(app);
require('./Tracking')(app);
require('./Log')(app);

app.listen(actualPort, (err) => {
    if (err) throw err;
    console.log("Listening on port " + actualPort);
});

// Database.connect2Db('hcmiuiot.zapto.org', 3306, 'parking', 'parking');
// Report.createDemo();

// DB.instance().raw("CALL authentication('hungthuanmk', 'hungthuanmk');").then((hello)=>console.dir(hello[0][0][0].fullName, {depth: null}));