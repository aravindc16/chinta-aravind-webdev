/**
 * Created by aravindchinta on 3/23/17.
 */
module.exports = function (app, model) {

    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());
    app.use(session({
        secret: 'this is project secret',
        resave: true,
        saveUninitialized: true,
        cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
    }));


    app.use(passport.initialize());
    app.use(passport.session());
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : '277687679348560',
        clientSecret : 'd5a4aea417b3ab0a1b191cfedef2865c',
        callbackURL  : '/project/api/auth/facebook/callback'
    };

    app.post('/api/project/register', createUser);
    app.get('/api/project/user/:uid', findUserById);
    app.get('/api/project/user', findUserByCredentials);
    app.get('/api/project/username', findUserByUsername);
    app.delete('/api/project/user/:uid', deleteUser);
    app.put('/api/project/user/:uid', updateUser);
    app.put('/api/project/restaurant/favorite/:uid', addFavoriteRestaurant);
    app.put('/api/project/restaurant/favorite/delete/:uid', deleteFavoriteRestaurant);
    app.put('/api/project/follow/:uid', followUser);
    app.put('/api/project/unfollow/:uid',unFollowUser);
    //Passport
    app.post('/api/project/login', passport.authenticate('project'),  login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/registerUser', registerUser);
    app.post('/api/project/checkUserLogIn', loggedIn);
    app.get('/api/project/findCurrentLoggedInUser', findCurrentLoggedInUser);
    app.get ('/project/api/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/project/api/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/project/#/user', failureRedirect: '/project/#/login'
    }));


    passport.use('project', new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function findCurrentLoggedInUser(req, res) {
        console.log(req.isAuthenticated());
        res.send(req.user);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function registerUser(user) {
        var user = req.body;
        model.UserModel.createUser(user)
            .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );

    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function facebookStrategy(token, refreshToken, profile, done) {

        console.log(profile);

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

    function localStrategy(username, password, done) {

        model.UserModel.findUserByCredentials(username, password)
            .then(function(user) {
                    if(!user) {
                        return done(null, false);
                    } else {

                        return done(null, user)
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function unFollowUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;

        model.UserModel.unFollowUser(userId, user)
            .then(function (newUser) {
                if(newUser){
                    model.UserModel.removeFollowedByUser(userId, user)
                        .then(function (user) {

                        });
                }
                res.send(newUser);
            }, function (err) {
                res.sendStatus(500).send('Could not unfollow user');
            })
    }

    function followUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;

        model.UserModel.followUser(userId, user)
            .then(function (newUser) {

                if(newUser){
                    model.UserModel.addFollowedByUser(userId, user)
                        .then(function (user) {

                        });
                }
                res.send(newUser);
            }, function (err) {
                res.sendStatus(500).send('Could not follow user');
            });

    }

    function deleteFavoriteRestaurant(req, res) {
        var userId = req.params['uid'];
        var restaurant = req.body;

        model.UserModel.deleteFavoriteRestaurant(userId, restaurant)
            .then(function (response) {
                if(response){
                    res.send(response);
                }else{
                    res.sendStatus(500);
                }
            });
    }

    function addFavoriteRestaurant(req, res) {
        var restaurant = req.body;
        var userId = req.params['uid'];

        model.UserModel.addFavoriteRestaurant(userId, restaurant)
            .then(function (user) {
                console.log(user);
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(500);
                }
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['uid'];

        model.UserModel.updateUser(userId, user)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(500).send('Could not update the user.')
                }
            })
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];

        model.UserModel.deleteUser(userId)
            .then(function (user) {
                 res.sendStatus(200);

            }, function (err) {
                res.sendStatus(500).send('Could not delete. DB error.')
            })
    }
    
    function findUserByUsername(req, res) {
        var username = req.query.username;

        model.UserModel.findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            })
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model.UserModel.findUserByCredentials(username, password)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(404).send('No such credentials found');
                }

            })
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];

        model.UserModel.findUserById(userId)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(404).send('No such user found');
                }
            })
    }

    function createUser(req, res) {
        var user = req.body;
        model.UserModel.createUser(user)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(500).send('Could not create user.')
                }
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