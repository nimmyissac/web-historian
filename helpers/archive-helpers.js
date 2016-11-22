var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var querystring = require('querystring');




/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(url) {
   

};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    var urlArray = data.split('\n');
    console.log("url Array "+urlArray);
    var urlPresent = false;
    _.each(urlArray, function(element) {
      if ( element === url ) {
        urlPresent = true;
      }  
    });
    callback(urlPresent);
  });

};

// fs.appendFile('message.txt', 'data to append', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('The "data to append" was appended to file!');
// });

exports.addUrlToList = function(url, callback) {
  var keys = Object.keys(querystring.parse( url ));
  url = keys[0];
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) {
      throw err;
    }
    callback(); // this is just to make the test pass
  });
};


exports.isUrlArchived = function(url, callback, done) {
  // console.log("Callback is ");
  // console.log("directory is ");
  // console.log(exports.paths.archivedSites);
  //console.log(keys[0]);
  // fs.readdir(exports.paths.archivedSites,'utf8', (err, files) => {
  //   // console.log("Entering readdir ");
    
  //   var keys = Object.keys(querystring.parse( url ));
  //   url = keys[0];
  //   var isArchived = false;
  //   files.forEach(file => {
  //     // console.log("File is "+file);
  //     //url = url.match(/[a-z.]+/).join('');
  //     if (file === url) {
  //       isArchived = true;
  //       // console.log("isArchived"+isArchived);
  //     }
  //   });
  //   // console.log("calling callback with "+isArchived);
  //   callback(isArchived);
  // });
 
  
};


exports.downloadUrls = function() {
};
