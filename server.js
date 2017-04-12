var express = require('express');
var app = express();

//For Security and User management.
// var cookieParser = require('cookie-parser');
// var session      = require('express-session');
// var passport = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.MONGODB_URI) {

    connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// app.use(session({
//     secret: 'this is the secret', //Store it in local env variables.
//     resave: true,
//     saveUninitialized: true
// }));
//
//
//
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());


// require ("./assignment/app.js")(app);
require ("./project/app.js")(app);


var port = process.env.PORT || 3000;

app.listen(port, function() {
});
