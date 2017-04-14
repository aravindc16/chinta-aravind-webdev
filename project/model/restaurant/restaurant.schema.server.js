/**
 * Created by aravindchinta on 4/13/17.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var RestaurantSchema = mongoose.Schema({
        'name': String,
        'phone': String,
        'order':[],
        'total': {type: Number, default: 0}
    }, {'collection': 'project.restaurant'});

    return RestaurantSchema;
}