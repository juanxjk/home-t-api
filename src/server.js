const express = require("express");
const cors = require("cors");

const app = require("./app");

const server = express();

server.use(cors());


server.listen(3333);
