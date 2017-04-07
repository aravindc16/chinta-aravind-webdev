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
        'deleteFavoriteRestaurant': deleteFavoriteRestaurant
    };

    var model = {};
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('userModel', UserSchema);

    return api;

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
            {$set: {'city':user.city, 'firstName':user.firstName, 'lastName': user.lastName}});
    }
    
    function deleteUser(userId) {
        return UserModel.remove({'_id':userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({'username':username});
    }
    
    function findUserByCredentials(username, password) {
        return UserModel.findOne({'username': username, 'password': password});
    }
    
    function findUserById(userId) {
        return UserModel.findOne({'_id':userId});
    }

    function setModel(_model) {
        model = _model;
    }
    
    function createUser(user) {
        return UserModel.create(user);
    }

}
