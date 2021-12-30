const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://nee00011:X57sjut6BfQWW2K@cluster0.kfdxu.mongodb.net/schedule?ret" +
        "ryWrites=true&w=majority";

const fs = require('fs');
const url = require('url');
const qs = require('querystring');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var express = require("express");
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/schedule.html', function (req, res) {
    res.sendFile(__dirname + '/client/schedule.html');
});

app.get('/addEvent.html', function (req, res) {
    res.sendFile(__dirname + '/client/addEvent.html');
});

// connect to mongodb
MongoClient.connect(uri, function (err, database) {
    if (err) 
        throw err;
    const schedule = database
        .db("ScheduleDB")
        .collection("schedule");
    app.listen(9001, () => console.log("Listening on port 9001!"));

    app.post('/getSchedule', urlencodedParser, function (req, res) {
        // get only that day's events
        var day = req.body.day;
        // sorted by the start time
        const cursor = schedule.find({day: day}).sort({start: 1});
        cursor.toArray((err, item) => {
            res.send(item);
        });
    });

    app.post('/postEventEntry', urlencodedParser, function (req, res) {
        var postObj = req.body;
        var day = postObj.day.toLowerCase();
        var event = postObj.event;
        var start = postObj.start;
        var end = postObj.end;
        var phone = postObj.phone;
        var location = postObj.location;
        var info = postObj.info;
        var url = postObj.url;

        const newEvent = {
            name: event,
            start: start,
            end: end,
            phone: phone,
            location: location,
            info: info,
            url: url,
            day: day
        };

        schedule.insertOne(newEvent);
        res.redirect('/schedule.html');
    });

});
