/**
 * Created by aravindchinta on 4/6/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        facebook : {
            id: String,
            token: String
        },
       firstName: String,
        lastName: String,
        email: String,
        city: String,
        password: {type: String, required: true},
        favourites: [{'id': String, 'restaurantName': String}],
        follows: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        followedBy: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        roles: {type: String, enum: ['USER', 'ADMIN', 'MANAGER'], default: 'USER'}
    }, {collection: 'project.user'});

    return UserSchema;
}