/**
 * Created by aravindchinta on 3/13/17.
 */

(function () {
    angular.module('FoodForThoughtApp')
        .controller('profileController', ProfileController);

    function ProfileController($mdDialog, $location, $http, $routeParams, UserService, ReviewService, FoursquareSearchService) {
            var vm = this;

            vm.userId = $routeParams['uid'];

            var User = {};
            var favs = [];

            vm.deleteUser = deleteUser;
            vm.removeFavorite = removeFavorite;
            vm.unFollowUser = unFollowUser;

            function init() {

                UserService.findUserById(vm.userId)
                    .then(function (response) {
                        vm.user=response.data;

                        vm.userFollows = [];
                        vm.userFollowedBy = [];

                        // If the user does not follow anyone
                        if(response.data.follows.length == 0){
                            vm.noFollows = true;
                            vm.alreadyFollows = false;
                        }else{
                            vm.noFollows = false;
                        }

                        // If the user is not followed by anyone
                        if(response.data.followedBy.length == 0){
                            vm.noFollowedBy = true;
                        }else{
                            vm.noFollowedBy = false;
                        }

                        for(var f in response.data.follows){
                            UserService.findUserById(response.data.follows[f])
                                .then(function (response) {
                                    vm.userFollows.push(response.data);
                                    vm.alreadyFollows = true;
                                });
                        }

                        for(var f in response.data.followedBy){
                            UserService.findUserById(response.data.followedBy[f])
                                .then(function (response) {
                                    vm.userFollowedBy.push(response.data);
                                });
                        }


                        vm.avatar = vm.user.firstName.charAt(0) + vm.user.lastName.charAt(0);
                        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+vm.user.city+'&sensor=false&key=AIzaSyB5Ae4ILNTqkQEPmk0AeBlak_bkNJI9wm4';
                        $http.get(url)
                            .then(function (response) {
                                vm.lat = response.data.results[0].geometry.location.lat;
                                vm.long = response.data.results[0].geometry.location.lng;
                                vm.city = response.data.results[0].formatted_address;
                            },function () {

                            });
                        ReviewService.findAllReviewsByUser(vm.user.username)
                            .then(function (response) {
                                vm.reviews = response.data;
                            });
                    });
            }
            init();
            
            function unFollowUser(user) {
                UserService.unFollowUser(vm.userId, user)
                    .then(function (response) {

                        setTimeout(init, 100);
                    })
            }

            function removeFavorite(favorite) {
                UserService.deleteFavoriteRestaurant(vm.userId, favorite)
                    .then(function (response) {
                        init();
                    });
            }

            function deleteUser(){
            var confirm = $mdDialog.confirm()
                .title("Unregister Warning!")
                .textContent("Are you sure you want to unregister and delete your account?")
                .ok("Yes")
                .cancel("No!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+vm.userId);
            }

            function yes(){
                UserService.deleteUser(vm.userId)
                    .then(function (response) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Delete Success!")
                                .textContent("Sorry to see you go. Come back soon.")
                                .ok("OK"));
                        $location.url('/');
                    }, function (err) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Delete Error!")
                                .textContent("We love you so much that we couldn't delete you.")
                                .ok("OK"));
                    });
                }
            }


        }
})();