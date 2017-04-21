/**
 * Created by aravindchinta on 4/12/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .controller('adminController', adminController);

    function adminController(UserService, $location, ReviewService, RestaurantService, $mdDialog) {
        var vm = this;
        
        vm.removeUser = removeUser;
        vm.logout = logout;
        vm.removeReview = removeReview;
        vm.removeOrder = removeOrder;
        vm.removeFavorite = removeFavorite;
        vm.createUser = createUser;
        
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
                });
        }
        init();
        
        function createUser(user) {

            if(user == undefined){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("You did not enter the required fields.")
                        .ok("OK"));
            }else if(user.username == null){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("Please make sure you enter the username.")
                        .ok("OK"));
            }else if(user.password == null || user.verifyPassword == null){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("Please make sure you enter the password and type again to verify.")
                        .ok("OK"));

            }else if(user.password != user.verifyPassword){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("Passwords do not match.")
                        .ok("OK"));
            } else{

                UserService.findUserByUsername(user.username)
                    .then(function (response) {
                        if(!response.data){
                            UserService.createUserByAdmin(user)
                                .then(function (response) {
                                    var user = response.data;
                                    $mdDialog.show(
                                        $mdDialog.alert()
                                            .clickOutsideToClose(true)
                                            .title("User Create Success!")
                                            .textContent("User "+response.data.username+" has been successfully created!")
                                            .ok("OK"));
                                    $location.url('/admin');
                                });
                        }else{
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(true)
                                    .title("Registration Error!")
                                    .textContent("Sorry username already taken.")
                                    .ok("OK"));
                        }

                    }, function (err) {

                    })
            }
        }

        function removeFavorite(user, fav) {
            UserService.removeFavorite(user, fav)
                .then(function (response) {
                    init();
                }, function (err) {

                })
        }

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
                    $location.url('/')
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
