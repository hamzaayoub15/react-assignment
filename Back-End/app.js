const express = require("express");
const bodyParser = require("body-parser");
const route = require("./App/Routes/Routes");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(route);

module.exports = app;
