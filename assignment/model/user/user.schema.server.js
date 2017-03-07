/**
 * Created by aravindchinta on 3/7/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username : String,
        password : String,
        firstName: String,
        lastName: String,
        email : String,
        phone : String
    });

    return UserSchema;
}