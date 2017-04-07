/**
 * Created by aravindchinta on 4/7/17.
 */
module.exports = function () {

    var model = {};
    var mongoose = require('mongoose');
    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('reviewModel', ReviewSchema);

    var api = {
        'setModel': setModel,
        'addReview': addReview,
        'findReviewsForRestaurant':findReviewsForRestaurant,
        'findAllReviewsByUser': findAllReviewsByUser
    }

    return api;
    
    function findAllReviewsByUser(username) {
        return ReviewModel.find({'username':username});
    }

    function findReviewsForRestaurant(restName) {
        return ReviewModel.find({'restaurantName':restName});
    }

    function addReview(username, restName, review) {
        return ReviewModel.create({'username':username, 'restaurantName': restName, 'review':review.text});
    }

    function setModel(_model) {
        model = _model;
    }

}