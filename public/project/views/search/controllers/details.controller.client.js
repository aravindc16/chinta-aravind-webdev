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
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.logout = logout;
        vm.deleteReview = deleteReview;

        function init() {

            if(vm.userId){
                UserService.findUserById(vm.userId)
                    .then(function (response) {
                        user = response.data;

                        vm.loggedInUser = user;
                        vm.username = user.username; //This is for the check so that the logged in person doesn't follow themselves.
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
            }

            FoursquareSearchService.findMenuForRestaurant(vm.id)
                .then(function (response) {
                    if(response.data.response.menu.menus.count == 0){
                        vm.canOrder = false;
                    }else{
                        vm.canOrder = true;
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

                            vm.alreadyFollows = [];
                            for(var r in vm.reviews){
                                if(vm.reviews[r].username != "Anonymous"){
                                    UserService.findUserByUsername(vm.reviews[r].username)
                                        .then(function (response) {
                                            if (user) {
                                                if (user.follows.length == 0) {
                                                    vm.Follows = false;
                                                } else {
                                                    for (var u in user.follows) {
                                                        if (response.data._id == user.follows[u]) {

                                                            vm.alreadyFollows.push(response.data.username);
                                                        }
                                                    }
                                                }
                                            } else {
                                                vm.Follows = false;
                                            }
                                        });
                                }
                            }
                        })
                }, function (err) {
                    
                });
            
        }
        init();

        var userToFollow = {};
        
        function deleteReview(review) {
            ReviewService.deleteReview(review)
                .then(function (response) {
                    init();
                })
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url('/');
                });
        }

        function unFollowUser(username) {
            UserService.findUserByUsername(username)
                .then(function (response) {

                    vm.userToFollow = response.data;
                    userToFollow = vm.userToFollow;

                    UserService.unFollowUser(vm.userId, response.data)
                        .then(function (response) {

                            for(var u in response.data.follows){
                                if(userToFollow._id != response.data.follows[u]){
                                    vm.Follows = false;
                                }else{
                                    vm.Follows = true;
                                }
                            }
                        })
                });
            //Introducing 100 ms delay to call the init function because it is taking some time for the user model to get updated and it shows that the current user
            // is still following the other user.
            setTimeout(init, 100);
        }

        function followUser(username) {

            UserService.findUserByUsername(username)
                .then(function (response) {
                    vm.userToFollow = response.data;
                    userToFollow = vm.userToFollow;
                    UserService.followUser(vm.userId, response.data)
                        .then(function (response) {
                           for(var u in response.data.follows){
                               if(userToFollow._id == response.data.follows[u]){
                                   vm.Follows = true;
                               }else{
                                   vm.Follows = false;
                               }
                           }
                        })
                });

            setTimeout(init, 100);

        }
        
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

            vm.review = "";
            if(vm.userId){

                if(review){
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
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Review error!")
                            .textContent("Can't post an empty review.")
                            .ok("OK"));
                }

            }else{
                if(review){
                    var newUser = {'username': "Anonymous"};
                    ReviewService.addReview(newUser.username, name, review)
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
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Review error!")
                            .textContent("Can't post an empty review.")
                            .ok("OK"));
                }

            }

            init();
        }
    }
})();