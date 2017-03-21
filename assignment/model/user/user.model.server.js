/**
 * Created by aravindchinta on 3/7/17.
 */
module.exports = function () {

    var api = {
        'createUser' : createUser,
        'findUserByCredentials': findUserByCredentials,
        'findUserById': findUserById,
        'findUserByUsername': findUserByUsername,
        'deleteUser': deleteUser,
        'updateUser': updateUser,
        'setModel': setModel
    };
    var model = {};
    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function setModel(_model) {
        model = _model;
    }

    function updateUser(userId, user){
        return UserModel.update({'_id':userId},
            {$set: {'firstName': user.firstName, 'lastName': user.lastName, 'email':user.email}});
    }
    
    function deleteUser(userId) {
        return UserModel.remove({'_id':userId});
    }
    
    function findUserByUsername(username) {
        return UserModel.findOne({'username':username});
    }
    
    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(username, password){

        return UserModel.findOne({'username': username, 'password':password});
    }

    function createUser(user){
        return UserModel.create(user);
    }
}