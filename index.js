const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname+ '/public/index.html'));
});

server.listen(3000,()=>{
    console.log('server is running')
});
