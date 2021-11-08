const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

const port = 9001;
http.createServer(function(req, res) {
  var q = url.parse(req.url, true);
  if (q.pathname === '/') {
    indexPage(req, res);
  }
  else if (q.pathname === '/index.html') {
    indexPage(req, res);
  }
  else if (q.pathname === '/schedule.html') {
    schedulePage(req, res);
  }
  else if (q.pathname === '/addEvent.html') {
    addEventPage(req, res);
  }
  else if (req.url === "/getSchedule") {
    getSchedule(req, res); 
  }
  else if (req.url === "/postEventEntry") {
    var reqBody = "";
    // server starts receiving the form data
    req.on("data", function(data) {
      reqBody += data;
    }); // server has received all the form data
    req.on("end", function() {
      addEventEntry(req, res, reqBody);
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end("404 Not Found");
  }
}).listen(port);


function indexPage(req, res) {
  fs.readFile('client/index.html', (err, html) => {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function schedulePage(req, res) {
  fs.readFile('client/schedule.html', (err, html) => {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function addEventPage(req, res) {
  fs.readFile('client/addEvent.html', (err, html) => {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}


function getSchedule(req, res) {
  fs.readFile("schedule.json", function(err, content) {
    if (err) {
      throw err;
    }
    var scheduleObj = JSON.parse(content);
    res.statusCode = 200;
    res.setHeader("Content-Type", "Application/json");
    res.write(JSON.stringify(scheduleObj));
    res.end();
  });
}

function addEventEntry(req, res, reqBody) {
  
  // Parse reBody using qs.parse
  var postObj = qs.parse(reqBody);
  var day = postObj.day.toLowerCase();
  var event = postObj.event;
  var start = postObj.start;
  var end = postObj.end;
  var phone = postObj.phone;
  var location = postObj.location;
  var info = postObj.info;
  var url = postObj.url;

  // Stick the values in a "event object" that is the same as 
  // the objects stored in each day of schedule.json

  var jsonObj = {}; 
  jsonObj["name"] = event;
  jsonObj["start"] = start;
  jsonObj["end"] = end;
  jsonObj["phone"] = phone;
  jsonObj["location"] = location;
  jsonObj["info"] = info;
  jsonObj["url"] = url;


  fs.readFile("schedule.json", function(err, fileJsonString) {
    if (err) {
      throw err;
    }

    var parsedJson = JSON.parse(fileJsonString); // Objectify the string

    // Append jsonObj onto end of array in fileJson 
    parsedJson[day].push(jsonObj);

    // Sort events by time
    var len = parsedJson[day].length;
    for (i = 0; i < len; i++) {
      for (j = i + 1; j < len; j++) {
        var time1 = parsedJson[day][i].start;
        var time2 = parsedJson[day][j].start;
        if (time1 > time2) {
          var tmp = parsedJson[day][i];
          parsedJson[day][i] = parsedJson[day][j];
          parsedJson[day][j] = tmp;
        }
      }
    }

    // Stringify fileJson into fileJsonString
    result = JSON.stringify(parsedJson);
    
    // Write file JsonString back out file scheudle.json
    fs.writeFile("schedule.json", result, function(err, result) {
      if (err) {
        throw err;
      }
    });

    // Redirect
    res.writeHead(302, { Location: "/schedule.html" });
    res.end();
  });
}