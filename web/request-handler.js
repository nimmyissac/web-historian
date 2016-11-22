var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
 if (req.url.length === 1  && req.method === 'GET') {
     fs.readFile((archive.paths.siteAssets+'/'+'index.html'),'utf8', function (err, html) {
       if (err) {
         console.log("Error");
        throw err;
       }       
       res.writeHeader(200, {'Content-Type': 'text/html'});  
      res.end(html); 
    });
  } 
   else if(req.method === 'GET' && req.url.length > 1) {
     var data = fs.readFile((archive.paths.archivedSites+req.url), 'utf8', function(err, html) {
        if (err) {
          res.writeHeader(404); 
          res.end();
        }       
        res.writeHeader(200, {'Content-Type': 'text/html'});  
        res.end(html); 
    });
     
   }
   else if(req.method === 'POST' ) {
    var fileTobeAppended ;
     if(req.url.match(/[a-z.]+/) !== null ){
       fileTobeAppended = req.url.match(/[a-z.]+/).join('');
     } else {
       fileTobeAppended ="";
     }
     fs.appendFile(archive.paths.list, fileTobeAppended, (err) => {
      if (err) {
        console.log("Error ", err);
        throw err;
      }
      console.log("appended ",fileTobeAppended);
    });
  }
   else{
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