/**
 * Created by aravindchinta on 3/13/17.
 */
(function () {
    angular
        .module('FoodForThoughtApp')
        .controller('landingController', LandingController);

    function LandingController($mdDialog, $location, $routeParams, UserService, FoursquareSearchService) {
        var vm = this;

        vm.userId = $routeParams['uid'];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        vm.Profile = Profile;
        vm.Logout = Logout;
        vm.searchPlace = searchPlace;
        vm.getFood = getFood;
        vm.getDrinks = getDrinks;
        vm.getCoffee = getCoffee;

        function searchPlace(search) {
            var place = search.restaurant;
            var city = search.city;

            if(!city){
                city = "Boston";
            }

            if(!place){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Place error!")
                        .textContent("Please enter a name or place or restaurant to search for.")
                        .ok("OK"));
            }else {
                $location.url('/searchResults/'+place+'/location/'+city);

            }


        }

        function getFood() {
            
        }

        function getDrinks() {

        }

        function getCoffee() {

        }


        function Profile() {
            $location.url('user/'+vm.userId);
        }

        function Logout() {
            $location.url('/');
        }
    }
})();