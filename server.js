var express = require('express');
var mongodb = require('mongodb');
var mongoClient = mongodb.mongoClient;

var uri = process.env.MONGODB_URI;
var app = express();

mongoClient.connect(uri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port      = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Test");
});
