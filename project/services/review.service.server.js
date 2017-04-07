/**
 * Created by aravindchinta on 4/7/17.
 */

module.exports = function (app, model) {

    app.post('/api/project/review/:restName/user/:username', addReview);
    app.get('/api/project/review/:restName', findReviewsForRestaurant);
    app.get('/api/project/review/user/:username', findAllReviewsByUser);

    function findAllReviewsByUser(req, res) {
        var username = req.params['username'];

        model.ReviewModel.findAllReviewsByUser(username)
            .then(function (reviews) {
                if(reviews){
                    res.send(reviews);
                }else{
                    res.sendStatus(404).send('No reviews for the user found.')
                }
            })
    }

    function findReviewsForRestaurant(req, res) {
        var restName = req.params['restName'];

        model.ReviewModel.findReviewsForRestaurant(restName)
            .then(function (reviews) {
                if(reviews){
                    res.send(reviews)
                }else{
                    res.sendStatus(404).send("No reviews found for the restaurant.")
                }
            })
    }

    function addReview(req, res) {
        var restName = req.params['restName'];
        var username = req.params['username'];
        var review = req.body;

        model.ReviewModel.addReview(username, restName, review)
            .then(function (review) {
                if(review){
                    res.send(review);
                }else{
                    res.sendStatus(500).send("Sorry, could not create a review");
                }
            })
    }
}
