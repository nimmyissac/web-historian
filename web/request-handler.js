var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(archive.archivedSites);
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./web/public/index.html', function (err, html) {
      if (err) {
        throw err;
      }       
      res.writeHeader(200, {'Content-Type': 'text/html'});  

      res.end(html); 
    });
  }
  res.end(archive.paths.list);


};
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