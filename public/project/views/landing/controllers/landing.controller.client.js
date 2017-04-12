/**
 * Created by aravindchinta on 3/13/17.
 */
(function () {
    angular
        .module('FoodForThoughtApp')
        .controller('landingController', LandingController);

    function LandingController($mdDialog, $location, $routeParams, UserService, FoursquareSearchService) {
        var vm = this;

        // vm.userId = $routeParams['uid'];
        // console.log(vm.userId);

        var user = {};

        function init() {

            UserService.findCurrentLoggedInUser()
                .then(function (response) {
                    vm.userId = response.data._id;
                    vm.user= response.data;
                    user = vm.user;
                })

        }
        init();



        vm.Profile = Profile;
        vm.logout = logout;
        vm.searchPlace = searchPlace;
        vm.getFood = getFood;
        vm.getDrinks = getDrinks;
        vm.getCoffee = getCoffee;


        function searchPlace(search) {
            var place = search.restaurant;
            var city = search.city;

            if(!city){
                if(vm.userId){
                    city = user.city;
                }else {
                    city = "Boston";
                }
            }

            if(!place){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Place error!")
                        .textContent("Please enter a name or place or restaurant to search for.")
                        .ok("OK"));
            }else {
                if(vm.userId){
                    $location.url('/searchResults/'+place+'/location/'+city+"/user/"+vm.userId);
                }else{
                    $location.url('/searchResults/'+place+'/location/'+city);
                }


            }


        }

        function getFood() {
            var place = "pizza";
            var city;
            if(!city){
                if(vm.userId){
                    city = user.city;
                }else {
                    city = "Boston";
                }
            }

            if(vm.userId){
                $location.url('/searchResults/'+place+'/location/'+city+"/user/"+vm.userId);
            }else{
                $location.url('/searchResults/'+place+'/location/'+city);
            }
        }

        function getDrinks() {
            var place = "bar";
            var city;
            if(!city){
                if(vm.userId){
                    city = user.city;
                }else {
                    city = "Boston";
                }
            }

            if(vm.userId){
                $location.url('/searchResults/'+place+'/location/'+city+"/user/"+vm.userId);
            }else{
                $location.url('/searchResults/'+place+'/location/'+city);
            }
        }

        function getCoffee() {
            var place = "coffee";
            var city;
            if(!city){
                if(vm.userId){
                    city = user.city;
                }else {
                    city = "Boston";
                }
            }

            if(vm.userId){
                $location.url('/searchResults/'+place+'/location/'+city+"/user/"+vm.userId);
            }else{
                $location.url('/searchResults/'+place+'/location/'+city);
            }
        }


        function Profile() {
            $location.url('user/'+vm.userId);
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url('/');
                });
        }
    }
})();