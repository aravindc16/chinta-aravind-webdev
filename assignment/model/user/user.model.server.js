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
        'setModel': setModel,
        'findUserByFacebookId': findUserByFacebookId
    };
    var model = {};
    var q= require('q');
    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function findUserByFacebookId(fbid) {
        return UserModel.findOne({'facebook.id': fbid});
    }

    function setModel(_model) {
        model = _model;
    }

    function updateUser(userId, user){
        return UserModel.update({'_id':userId},
            {$set: {'firstName': user.firstName, 'lastName': user.lastName, 'email':user.email}});
    }
    
    function deleteUser(userId) {
        var d = q.defer();
        UserModel.remove({'_id':userId}, function (err, response) {
            d.resolve(response);
        });
        return d.promise;
    }
    
    function findUserByUsername(username) {
        var d =q.defer();
        UserModel.findOne({'username':username}, function (err, username) {
            d.resolve(username);
        });

        return d.promise;
    }
    
    function findUserById(userId) {
        var d = q.defer();
        UserModel.findById(userId, function (err, user) {
            if(user){
                d.resolve(user);
            }else{
                d.reject(err);
            }

        });
        return d.promise;
    }

    function findUserByCredentials(username, password){
        return UserModel.findOne({
            username:username,
            password:password
        });
    }

    function createUser(user){

        return UserModel.create(user);

        // var d = q.defer();
        // UserModel.create(user, function (err, user) {
        //     d.resolve(user);
        // });
        // return d.promise;
    }
}