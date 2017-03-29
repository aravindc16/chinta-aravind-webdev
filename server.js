var express = require('express');
var app = express();

//For Security and User management.
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: '1+1=2', //Store it in local env variables.
    resave: true,
    saveUninitialized: true
}));


var passport = require('passport');
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


require ("./assignment/app.js")(app);
require ("./project/app.js")(app);


var port = process.env.PORT || 3000;

app.listen(port, function() {
});
