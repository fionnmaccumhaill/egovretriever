// Read the file from the web site

'use strict';

var theRequest = require('request');

function getUrl(aUrl, aIndex, aCallback) {
    theRequest({
        url: aUrl,
        json: true
    }, function (error, response, body) {
           if (!error && response.statusCode === 200) {
               aCallback(error, aIndex, body);
           }
})}

module.exports = {
    getJSON: function (aUrl, aIndex, aCallback) {
        getUrl(aUrl, aIndex, aCallback);    
    }
};