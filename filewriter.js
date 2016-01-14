'use strict';

var fs = require('fs');

function writeJsonFile(aFilename, aIndex,  aJsonObject, aCallback) {
    fs.writeFile(aFilename, JSON.stringify(aJsonObject, null, 4),  function(err) {
        if(err) {
            console.log('error');
        } else {
            aCallback(err, aIndex);
        }
    })
}

module.exports = {
    writeJSON: function (aFilename, aIndex, aJsonObject, aCallback) {
        writeJsonFile(aFilename, aIndex, aJsonObject, aCallback);    
    }
};