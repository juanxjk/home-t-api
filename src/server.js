const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

const route = require("./routes");
server.use(route);

server.listen(3333);
