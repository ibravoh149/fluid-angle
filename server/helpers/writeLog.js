import path from 'path';

const fs = require('fs');


let errorFile= path.resolve('server/helpers', 'errorlog.txt');

function writeLog(error, filename){
    let stream = fs.createWriteStream(errorFile,{'flags': 'a+'});
                stream.once('open', function(fd) {
                stream.write(error + ' in ' + filename+' '+new Date() + "\n");
                // stream.write(error + ' in '+path.dirname(__filename)+'/'+__filename+' '+new Date() + "\n");
                stream.end();
                });
}

module.exports = writeLog;