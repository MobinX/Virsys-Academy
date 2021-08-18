var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = async function(app) {
     
	app.use('/api/course',require('./courses'));
	app.use("/api/user",require("./user"))

}