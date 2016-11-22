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
      
  } else if (req.method === 'POST' ) {
    archive.addUrlToList(req.url);
    res.writeHead(302);
    res.end();
  } else {
    res.end(archive.paths.list);
  }
};


// archive.paths.archivedSites+request.url
//console.log(url.parse(req.url)); returns the domain address
 // fs.readFile(request.url,'utf8', function (err, html) {
 //      if (err) {
 //        // load loading.html
 //      }       
 //      console.log((html));
 //      // res.writeHeader(200, {'Content-Type': 'text/html'});  
 //      // res.write(html);  
 //      // res.end(); 
 //    });