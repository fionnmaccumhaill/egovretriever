'use strict';
var theConfig = require('./configure.js');
var configJSON = theConfig.getConfig();

var indexFileName = configJSON["repository"].indexfile;
var theDataIndex = require(indexFileName);
var oDirectory = configJSON["repository"].outputdirectory + "/";
var theRetriever = require('./egovretriever.js');

// Parse the command line for input parameters
var theArgs = require('minimist')(process.argv.slice(2));
var posArg = theArgs['_'][0];


function getMissingFiles() {
    var idxLength = theDataIndex.length;
    var errorArray = new Array();
    for (var i=0; i<idxLength; i++) {
        var theIndex = theDataIndex[i].dataId;
        try {
            var fname = oDirectory + theIndex +".json";
            var dataFile = require(fname);
        }
        catch(dferror) {
            errorArray.push(theIndex);
        }
    }
    return errorArray;
}

function runRetrieve() {
   // var theURL = configJSON["repository"].url;
    var idxLength = theDataIndex.length;
    console.log('In index.js indexLength:'+idxLength);
    for (var i=0; i<idxLength; i++) {
        var dindex = theDataIndex[i].dataId;
    //    var url = theURL.replace("&dataidx",dindex);
        var url = theRetriever.buildURL(dindex, 0);
        if(theDataIndex[i].dataType!='typeMap') {
            theRetriever.getURL(url, dindex, 0);
        }
    }
}

function runFix() {
    var altURL = configJSON["repository"].alturl;
    var missingFiles = getMissingFiles();
    var idxLength = missingFiles.length;
    for (var i=0; i<idxLength; i++) {
        var dindex = missingFiles[i];
        var url = altURL.replace("&dataidx",dindex)+".json";
        theRetriever.getURL(url, dindex);
    }
}

function runStats() {
    var idxLength = theDataIndex.length;
    console.log('Running stats');
    console.log('Files in dataidx:'+idxLength);
    var missingFiles = getMissingFiles();
    var missingLength = missingFiles.length;
    console.log('Number of files missing:'+missingLength);
}

switch (posArg)
{
    case 'retrieve': runRetrieve();
        break;
    case 'fix': runFix();
        break;
    case 'stats': runStats();
        break;
    default: console.log('bad arg');
}