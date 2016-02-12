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
      //  console.log('writing index:'+aIndex);
      //  console.log("file written");
    }
}

function jsonCallback(jerr, aIndex, aOffset, jbody) {
    // check for error and do something with the json
    if(jerr) console.log("Unable to read index:"+aIndex);
    else {
        if(jbody==null) {
   //         console.log('Attempting to write null:'+aIndex);
        } else {
            console.log('egovretriever.json writing index:'+aIndex+
                   ' length:'+jbody.length);
            var fseq = '';
            if(aOffset>0) {
                var strSeq = aOffset / 50000;
                fseq = '_'+strSeq;
                console.log('fseq='+fseq);
            }
            theWriter.writeJSON(oDirectory + aIndex + fseq +".json",
                            aIndex, jbody, writeFileCallback);
            if(jbody.length>=50000) {
                var bOffset = aOffset + 50000;
                var newUrl = buildTheUrl(aIndex, bOffset);
                console.log("over50000:"+aIndex+":"+bOffset+' : '+
                           newUrl);
                readURL(newUrl, aIndex, bOffset);
            }
        }   
    }
}

function readURL(aUrl, aIndex, aOffset) {
    theReader.getJSON(aUrl, aIndex, aOffset, jsonCallback); 
}
function buildTheUrl(aIndex, aOffset) {
    var theURL = configJSON["repository"].url;
    var url = theURL.replace("&dataidx",aIndex);
    url = url.replace("&dsoffset",aOffset);
    return url;
}

module.exports = {
    getURL: function (aUrl, aIndex, aOffset) {
  //      console.log(aUrl);
        readURL(aUrl, aIndex, aOffset);
    },
    buildURL: function (aIndex, aOffset) {
        return buildTheUrl(aIndex, aOffset);
    }
};