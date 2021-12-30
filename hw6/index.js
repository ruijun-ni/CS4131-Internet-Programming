// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express modules
var express = require("express");

// create an express application
var app = express();
const url = require('url');

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// include the mysql module
var mysql = require("mysql");

// Bcrypt library for comparing password hashes
const bcrypt = require('bcrypt');
const dbCon = mysql.createConnection({
    host: "cse-mysql-classes-01.cse.umn.edu",
    user: "C4131F21U17", // replace with the database user provided to you
    password: "319", // replace with the database password provided to you
    database: "C4131F21U17", // replace with the database user provided to you
    port: 3306
});
// A possible library helps reading uploaded file.
var formidable = require('formidable');


// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment
app.use(session({
    secret: "csci4131secretkey",
    saveUninitialized: true,
    resave: false
}));

// server listens on port 9007 for incoming connections
app.listen(9713, () => console.log('Listening on port 9713!'));


// function to return the welcome page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/welcome.html');
});

app.get('/login', function(req, res) {
    if (!req.session.value) {
        res.sendFile(__dirname + '/client/login.html');
    } else {
        res.redirect('/allEvents');
    }
});

app.get('/welcome', function(req, res) {
    res.sendFile(__dirname + '/client/welcome.html');
});

app.get('/allEvents', function(req, res) {
    if(!req.session.value){
        // res.send('Need to log in first');
		res.redirect('/login');
    }else{
        res.sendFile(__dirname + '/client/allEvents.html');
    }
});

app.get('/addEvent', function(req, res) {
    if(!req.session.value){
        // res.send('Need to log in first');
		res.redirect('/login');
    }else{
        res.sendFile(__dirname + '/client/addEvent.html');
    }
    
});

app.get('/schedule', function(req, res) {
    if(!req.session.value){
        // res.send('Need to log in first');
		res.redirect('/login');
    }else{
        res.sendFile(__dirname + '/client/schedule.html');
    }
});

app.get('/logout', function(req, res) {
	if (!req.session.value) {
		res.send('Not logged in, can not logout');
		res.redirect('/login');
	}else{
		req.session.destroy();
		res.redirect('/login');
	}
});

app.post('/getSchedule', function(req,res) {
    dbCon.query('SELECT * FROM tbl_events order by CASE WHEN event_day = \'Sunday\' THEN 1 WHEN event_day = \'Monday\' THEN 2   WHEN event_day = \'Tuesday\' THEN 3    WHEN event_day = \'Wednesday\' THEN 4    WHEN event_day = \'Thursday\' THEN 5    WHEN event_day = \'Friday\' THEN 6   WHEN event_day = \'Saturday\' THEN 7 END ASC',function(err,rows){
        if(err) throw err
        res.json(rows);
    }); 
});

app.post('/getSelectedDateSchedule', function(req,res) {
    var loginInfo = req.body; 
    var day = loginInfo.day;
    dbCon.query('SELECT * FROM tbl_events WHERE event_day =\''+day+'\'order by event_start ASC',function(err,rows) {
        if(err) throw err
        res.json(rows);
    });
});

app.post('/addtodb', function(req,res) {
    var loginInfo = req.body; 
    var name = loginInfo.name;
    var day = loginInfo.day;
    var start = loginInfo.start;
    var end = loginInfo.end;
    var phone = loginInfo.phone;
    var location = loginInfo.location;
    var info = loginInfo.info;
    var url = loginInfo.url;
    const rowToBeInserted = {
        event_day: day,
        event_event: name, 
        event_start: start, 
        event_end:end,
        event_location:location,
        event_phone:phone,
        event_info:info,
        event_url:url
    };
    dbCon.query('INSERT tbl_events SET ?', rowToBeInserted, function(err, result) {
        if (err) {
            throw err;
        }else{
            res.json({status:'success'});
        }
    });

})
app.post('/loginvalidation', function(req, res) { 
    var loginInfo = req.body; 
    var login = loginInfo.login; 
    var pwd = loginInfo.password; 
    dbCon.query('SELECT acc_password FROM tbl_accounts WHERE acc_name =\''+login+'\';',
        function(err,rows){
            if(err)throw err;
            
            if (rows.length > 0 && bcrypt.compareSync(pwd, rows[0].acc_password)) {
                // req.session.user = login;
                
                if (!req.session.value) {
                    req.session.value=1;
                } else {
                    req.session.value += 1;
                    // var newval = req.session.value;
                    // res.send('Session value: ' + newval);
                }
                // console.log("find")
                res.json({status: 'success'});

            } else {
                res.json({status: 'fail'}); 
            }
        });    
    // dbCon.end();

});
// middle ware to serve static files
app.use('/client', express.static(__dirname + '/client'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
    // add details
    res.sendStatus(404);
});