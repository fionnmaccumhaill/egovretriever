'use strict';

var theConfig = require('./config/egovretriever.json');

// console.log("config:" + theConfig["repository"].indexfile);

exports.getConfig = function() {
    return theConfig;
}