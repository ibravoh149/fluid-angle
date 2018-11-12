require('babel-core/register');
require('babel-polyfill');
import app from '../app';
import dotenv from 'dotenv';
import socket from 'socket.io';

const http = require('http');

dotenv.config();

const port = process.env.PORT || 3000;

app.set('port', port);




const server = http.createServer(app);

server.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("server started on port :" + port);
    }
});