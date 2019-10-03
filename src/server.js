const express = require("express");
const cors = require("cors");

const app = require("./app");

const server = express();

server.use(cors());

server.listen(process.env.PORT || 3000);
