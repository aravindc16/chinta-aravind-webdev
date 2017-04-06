/**
 * Created by aravindchinta on 2/21/17.
 */
module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {
        clientID     : '277687679348560',
        clientSecret : 'd5a4aea417b3ab0a1b191cfedef2865c',
        callbackURL  : '/assignment/api/auth/facebook/callback'
    };

    var googleConfig = {
        clientID     : '310800080297-h3hkkglgshd7jeocajp4p1irbjm18jhg.apps.googleusercontent.com',
        clientSecret : 'mC7kYjLHY1DJaklqcxp8yvHl',
        callbackURL  : 'http://localhost:3000/assignment/auth/google/callback'
    };

    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_APP_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // }

    // added the words login and register to differentiate between the two call
    app.get('/api/user/login/', findUserByCredentials);
    app.get('/api/user/register/', findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.post('/api/user', createUser);
    app.delete('/api/user/:userId', deleteUser);
    //Secure login
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/loggedin', loggedIn);
    app.post('/api/logout', logout);
    app.post('/api/register', registerUser);
    app.get ('/assignment/api/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/assignment/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/assignment/auth/google/callback', passport.authenticate('google', {successRedirect: '/assignment/#/login', failureRedirect: '/assignment/#/login'
        }));
    app.get('/assignment/api/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/assignment/#/user', failureRedirect: '/assignment/#/login'
        }));
    app.get('/api/user', findCurrentUser);
    //Passport

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.deserializeUser(deserializeUser);
    passport.serializeUser(serializeUser);

    function findCurrentUser(req, res){
        res.json(req.user);
    }

    function registerUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model.UserModel.createUser(user)
            .then(function (user) {
                if(user){
                    req.login(user, function (err) {
                        if(err){
                            res.sendStatus(400).send(err);
                        } else {
                            res.send(user);
                        }
                    });
                }
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function googleStrategy(token, refreshToken, profile, done) {

        console.log(profile);
        model.UserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.UserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {

        model.UserModel.findUserByUsername(username)
            .then(function (user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                if(error){
                    return done(err);
                }
            })
    }

    function facebookStrategy(token, refreshToken, profile, done) {

        model.UserModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                }
                else {
                    var userDetails = {};
                    userDetails.username = profile.displayName.replace(/ /g, '');
                    userDetails.firstName = profile.displayName.split(' ')[0];
                    userDetails.lastName = profile.displayName.split(' ')[1];
                    userDetails.facebook = {id: profile.id, token: token};
                    return model.UserModel.createUser(userDetails);
                }
            }, function (err) {
                return done(err);
            })
            .then(function (user) {
                if (user) {
                    return done(null, user);
                }
            }, function (err) {
                return  done(err);
            });

    }

    function deleteUser(req, res){
        var userId = req.params.userId;

        model.UserModel.deleteUser(userId)
            .then(function (user) {         //Call if this function is successful.
                res.sendStatus(200);
            }, function () {
                res.sendStatus(400);
            });
    }

    function createUser(req, res){
        var user = req.body;

        //Using the model being sent from the app.js to create a new user when he registers.
        model.UserModel.createUser(user)
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(500).send('Could not create user' + error);
            });

    }

    function updateUser(req,res){
        var userId = req.params.userId;
        var user = req.body;

        model.UserModel.updateUser(userId, user)
            .then(function (user) {
                res.send(user);
            },function (err) {
                res.sendStatus(500);
            });
    }
    function findUserById(req, res){
        var userId = req.params.userId;
        //DB query
        model.UserModel.findUserById(userId)
            .then(function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(404);
                });
    }

    function findUserByUsername(req, res){
        var username = req.query.username;

        model.UserModel.findUserByUsername(username)
            .then(function (user) {
                    if(user == undefined){
                        res.sendStatus(404);
                    }else {
                        res.send(user);
                    }
                },
                function (err) {
                    res.sendStatus(505);
                })

    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;

        model.UserModel.findUserByCredentials(username,password)
            .then(function (user) {
                if(user == undefined){
                    res.sendStatus(500);
                }else {
                    res.send(user);
                }
            }, function (error) {
                res.sendStatus(404).send('No user found');
            })
    }

    //Passport functions

    //Serialize maintains encrypted cookie session for a particular user.
    function serializeUser(user, done) {
        done(null, user);
    }

    //Deserialize: Get the currently logged in user by decrypting the encrypted cookie.
    function deserializeUser(user, done) {
        model.UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
}