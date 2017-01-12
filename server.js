var express = require('express');
var mongoose = require('mongoose');
var uri = process.env.MONGODB_URI;
var app = express();

var db = mongoose.createConnection(uri);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port      = process.env.PORT || 3000;
var uri = process.env.MONGODB_URI;

app.listen(port, function() {
	console.log("Test");
});
