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