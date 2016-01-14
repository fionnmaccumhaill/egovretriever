'use strict';

// Parse the command line for input parameters
var theArgs = require('minimist')(process.argv.slice(2));
var theReader = require('./httpreader.js');
var theWriter = require('./filewriter.js');
var theConfig = require('./configure.js');
var configJSON = theConfig.getConfig();
var oDirectory = configJSON["repository"].outputdirectory + "/";
var indexFileName = configJSON["repository"].indexfile;
var theDataIndex = require(indexFileName);

function writeFileCallback(ferr, aIndex) {
    if(ferr) console.log("Problem writing file:"+aIndex);
    else {
      //  console.log("file written");
    }
}

function jsonCallback(jerr, aIndex, jbody) {
    // check for error and do something with the json
    if(jerr) console.log("Unable to read index:"+aIndex);
    else {
        theWriter.writeJSON(oDirectory + aIndex +".json",
                            aIndex, jbody, writeFileCallback);
    }
}

function readURL(aUrl, aIndex) {
    theReader.getJSON(aUrl, aIndex, jsonCallback); 
}

module.exports = {
    getURL: function (aUrl, aIndex) {
        readURL(aUrl, aIndex);
    }
};