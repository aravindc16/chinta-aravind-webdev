/**
 * Created by aravindchinta on 4/6/17.
 */

(function () {
    angular.module('FoodForThoughtApp')
        .controller('DetailsController', DetailsController);

    function DetailsController($mdDialog, FoursquareSearchService,ReviewService, UserService, $location, $routeParams) {
        var vm = this;

        vm.id = $routeParams['id'];
        vm.userId = $routeParams['uid'];

        var user= {};

        vm.addReviews = addReviews;
        vm.viewProfile = viewProfile;
        vm.addFavoriteRestaurant = addFavoriteRestaurant;
        vm.deleteFavoriteRestaurant = deleteFavoriteRestaurant;

        function init() {

            UserService.findUserById(vm.userId)
                .then(function (response) {
                    user = response.data;
                    if(user.favourites.length == 0){
                        vm.favorite = false;
                    }else{
                        for (var f in user.favourites) {
                            if (vm.id == user.favourites[f].id) {
                                vm.favorite = true;
                                break;
                            } else {
                                vm.favorite = false;
                            }
                        }
                    }

                });


            FoursquareSearchService.findRestaurantById(vm.id)
                .then(function (response) {

                    vm.details = response.data.response.venue;

                    var address = vm.details.name;

                    restName = vm.details.name;

                    var latitude = vm.details.location.lat;
                    var longitude = vm.details.location.lng;


                    var myLatLng = {lat: latitude, lng: longitude};

                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: myLatLng,
                        zoom: 12
                    });

                    var marker = new google.maps.Marker({
                        map: map,
                        position: myLatLng,
                        title: address
                    });


                    ReviewService.findReviewsForRestaurant(vm.details.name)
                        .then(function (response) {
                            vm.reviews = response.data;
                            // vm.reviews = response.data;
                        })
                }, function (err) {
                    
                });
            
        }
        init();
        
        function deleteFavoriteRestaurant(restaurant) {
            UserService.deleteFavoriteRestaurant(vm.userId, restaurant)
                .then(function (response) {
                    UserService.findUserById(vm.userId)
                        .then(function (response) {
                            user=response.data;
                            for(var f in user.favourites){
                                if(restaurant.id != user.favourites[f].id){
                                    vm.favorite = false;
                                }else{
                                    vm.favorite = true;
                                }
                            }
                        });
                });
            init();
        }
        
        function addFavoriteRestaurant(restaurant) {

            UserService.addFavoriteRestaurant(vm.userId, restaurant)
                .then(function (response) {
                    UserService.findUserById(vm.userId)
                        .then(function (response) {
                            user=response.data;
                            for(var f in user.favourites){
                                if(restaurant.id == user.favourites[f].id){
                                    vm.favorite = true;
                                }else{
                                    vm.favorite = false;
                                }
                            }
                        });

                }, function (err) {

                })
        }


        function viewProfile(username) {
            UserService.findUserByUsername(username)
                .then(function (response) {
                    user = response.data;
                    $location.url('/user/'+user._id);
                })
        }

        
        function addReviews(name, review) {
            init();

            vm.review = "";
            if(vm.userId){
                ReviewService.addReview(user.username, name, review)
                    .then(function (response) {
                        vm.review = response.data;

                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Review Success!")
                                .textContent("We appreciate your review. Thank you!")
                                .ok("OK"));
                    }, function (err) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Review error!")
                                .textContent("Sorry, we couldn't save your review. Please try again.")
                                .ok("OK"));
                    });
            }else{
                var user = {'username': "Anonymous"};
                ReviewService.addReview(user.username, name, review)
                    .then(function (response) {
                        vm.review = response.data;

                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Review Success!")
                                .textContent("We appreciate your review. Thank you!")
                                .ok("OK"));
                    }, function (err) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Review error!")
                                .textContent("Sorry, we couldn't save your review. Please try again.")
                                .ok("OK"));
                    });
            }

        }
    }
})();