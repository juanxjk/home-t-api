const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

server.get('/', (req,res)=>{
    return res.send('Hello World');
});

server.listen(3333);
