/**
 * Created by aravindchinta on 4/7/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {
        var api = {
            'addReview': addReview,
            'findReviewsForRestaurant': findReviewsForRestaurant,
            'findAllReviewsByUser': findAllReviewsByUser
        };

        return api;

        function findAllReviewsByUser(username) {
            return $http.get('/api/project/review/user/'+username);
        }

        function findReviewsForRestaurant(restName) {
            return $http.get('/api/project/review/'+restName);
        }

        function addReview(username, restName, review) {
            return $http.post('/api/project/review/'+restName+'/user/'+username, review);
        }
    }
})();
