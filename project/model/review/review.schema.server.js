/**
 * Created by aravindchinta on 4/7/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var ReviewSchema = mongoose.Schema({
       username: String,
       restaurantId: String,
        restaurantName: String,
        review: String
    }, {collection: 'project.review'});

    return ReviewSchema;
}
