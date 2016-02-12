// Read the file from the web site

'use strict';

var theRequest = require('request');

function getUrl(aUrl, aIndex, aOffset, aCallback) {
    theRequest({
        url: aUrl,
        timeout: 100000,
        json: true
    }, function (error, response, body) {
           if (!error && response.statusCode === 200) {
               aCallback(error, aIndex, aOffset, body);
           }
           else {
               if(response==null) {
                   console.log('response is null');
               } else {
                   console.log('statusCode:'+response.statusCode);
               }
               console.log("getUrl - error:"+" : "+error);
               aCallback(error, aIndex, aOffset, null);
           }
})}

module.exports = {
    getJSON: function (aUrl, aIndex, aOffset, aCallback) {
        getUrl(aUrl, aIndex, aOffset, aCallback);    
    }
};