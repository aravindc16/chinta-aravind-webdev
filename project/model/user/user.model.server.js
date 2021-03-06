/**
 * Created by aravindchinta on 4/6/17.
 */

module.exports = function () {

    var api = {
        'setModel': setModel,
        'createUser': createUser,
        'findUserById': findUserById,
        'findUserByCredentials': findUserByCredentials,
        'findUserByUsername': findUserByUsername,
        'deleteUser': deleteUser,
        'updateUser': updateUser,
        'addFavoriteRestaurant': addFavoriteRestaurant,
        'deleteFavoriteRestaurant': deleteFavoriteRestaurant,
        'followUser': followUser,
        'addFollowedByUser': addFollowedByUser,
        'unFollowUser': unFollowUser,
        'removeFollowedByUser': removeFollowedByUser,
        'findUserByFacebookId': findUserByFacebookId,
        "findAllUsers": findAllUsers,
        "removeUser": removeUser,
        "removeFavorite": removeFavorite,
        "createUserByAdmin": createUserByAdmin
    };

    var model = {};
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('userModel', UserSchema);

    return api;

    function createUserByAdmin(user) {
        return UserModel.create(user);
    }

    function removeFavorite(userId, fav) {
        return UserModel.update({'_id': userId}, {$pull :{'favourites': {'id':fav.id}}});
    }

    function removeUser(userId) {
        return UserModel.remove({'_id':userId});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function findUserByFacebookId(fbid) {
        return UserModel.findOne({'facebook.id': fbid});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function removeFollowedByUser(userId, user) {
        return UserModel.findOne({'_id':user._id})
            .then(function (user) {
                user.followedBy.pull(userId);
                return user.save();
            })
    }

    function unFollowUser(userId, newUser) {
        return UserModel.findOne({'_id':userId})
            .then(function (user) {
                user.follows.pull(newUser._id);
                return user.save();
            })
    }

    function addFollowedByUser(userId, user) {
        return UserModel.findOne({'_id':user._id})
            .then(function (user) {
                user.followedBy.push(userId);
                return user.save();
            })
    }

    function followUser(userId, newUser) {

        return UserModel.findOne({'_id': userId})
            .then(function (user) {
                user.follows.push(newUser._id);
                return user.save();
            });
    }

    function deleteFavoriteRestaurant(userId, restaurant) {

        return UserModel.update({'_id': userId}, {$pull :{'favourites': {'id':restaurant.id}}});
    }

    function addFavoriteRestaurant(userId, restaurant) {

        var fav = {
            'id': restaurant.id,
            'restaurantName': restaurant.name
        };

        return UserModel.findOne({'_id':userId})
            .then(function (user) {
                user.favourites.push(fav);
                return user.save();
            });
    }

    function updateUser(userId, user) {
        return UserModel.update({'_id': userId},
            {$set: {'city':user.city, 'firstName':user.firstName, 'lastName': user.lastName, 'email':user.email}});
    }
    
    function deleteUser(userId) {
        return UserModel.remove({'_id':userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({'username':username});
    }
    
    function findUserByCredentials(username,password) {
        return UserModel.findOne({'username': username, 'password': password})
            .then(function (user) {
                return user;
            });
    }
    
    function findUserById(userId) {

        return UserModel.findById(userId);
    }

    function setModel(_model) {
        model = _model;
    }
    
    function createUser(user) {
        if(!user.city){
            user.city = "Boston"
        }
        return UserModel.create(user);
    }

}

