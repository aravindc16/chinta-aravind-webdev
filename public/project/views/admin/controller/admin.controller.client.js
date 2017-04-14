/**
 * Created by aravindchinta on 4/12/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .controller('adminController', adminController);

    function adminController(UserService, $location, ReviewService, RestaurantService) {
        var vm = this;
        
        vm.removeUser = removeUser;
        vm.logout = logout;
        vm.removeReview = removeReview;
        vm.removeOrder = removeOrder;
        
        function init() {
            UserService.findAllUsers()
                .then(function (response) {
                    vm.users = response.data;

                    vm.reviews = [];
                    for(var u in vm.users){
                        ReviewService.findAllReviewsByUser(vm.users[u].username)
                            .then(function (response) {
                                vm.reviews.push(response.data);
                            });
                    }
                });

            var anonUsername = "Anonymous";

            ReviewService.findAllReviewsByUser(anonUsername)
                .then(function (response) {
                    vm.anonReviews = response.data;
                });

            RestaurantService.findAllOrders()
                .then(function (response) {
                    vm.orders = response.data;
                })
        }
        init();

        function removeOrder(order) {
            RestaurantService.removeOrder(order)
                .then(function (response) {
                    init();
                })
        }

        function removeReview(review) {
            ReviewService.removeReview(review)
                .then(function (response) {
                    init();
                })
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url('/login')
                })
        }

        function removeUser(user) {
            UserService.removeUser(user)
                .then(function (response) {
                    init();
                }, function (err) {

                })
        }
        
    }
})();
