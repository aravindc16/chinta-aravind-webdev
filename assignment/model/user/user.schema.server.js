/**
 * Created by aravindchinta on 3/7/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        facebook : {
            id: String,
            token: String
        },
        username : String,
        password : String,
        firstName: String,
        lastName: String,
        email : String,
        phone : String,
        dateCreated: {type: Date, default: Date.now},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}]
    }, {collection: 'assignment.user'});

    return UserSchema;
}