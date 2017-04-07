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

        function init() {



            UserService.findUserById(vm.userId)
                .then(function (response) {
                    user=response.data;
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


        
        function addReviews(name, review) {
            init();

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
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Review error!")
                        .textContent("Sorry, you need to login to post a review.")
                        .ok("OK"));
                $location.url('/login')
            }

        }
    }
})();