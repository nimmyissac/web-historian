var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if (req.url.length === 1 ) {
      fs.readFile((archive.paths.siteAssets + '/' + 'index.html'), 'utf8', function (err, html) {
        if (err) {
          throw err;
        }       
        res.writeHead(200, req.headers);  
        res.end(html.toString()); 
      });
    } else {
      fs.readFile((archive.paths.archivedSites + req.url), 'utf8', function(err, html) {
        if (err) {
          res.writeHead(404); 
          res.end();
        }        
        res.writeHead(200, {'Content-Type': 'text/html'});  
        res.end(html); 
      });
    } 
      
  } else if (req.method === 'POST' && req.url.length === 1) {
    var message ='';
    req.on('data', (chunks) => {
      message += chunks;
    });

    res.writeHead(302, {'Content-Type': 'text/html'}); 
    req.on('end', function () {
      var url = message.substring(message.indexOf('=')+1)
      archive.addUrlToList(url, function() {
       res.end();
      });
    });
  
  } else {
    res.end(archive.paths.list);
  }
};

