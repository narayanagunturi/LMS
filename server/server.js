const express = require('express');
const cors = require('cors');
const upload = require('./upload');
const grades = require('./grades')


const server = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
server.use(cors(corsOptions));


server.post('/upload', upload);/* go to upload.js and function upload is called*/
server.get('/grades/:id', grades)
server.listen(8000, () => {
    console.log('Server started!');
});