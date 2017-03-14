/**
 * Created by aravindchinta on 3/13/17.
 */

(function () {
    angular.module('FoodForThoughtApp')
        .controller('profileController', ProfileController);

    function ProfileController($http, $routeParams, UserService) {
            var vm = this;

            vm.userId = $routeParams['uid'];

            function init() {
                vm.user = UserService.findUserById(vm.userId);
                var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+vm.user.city+'&sensor=false&key=AIzaSyB5Ae4ILNTqkQEPmk0AeBlak_bkNJI9wm4';
                $http.get(url)
                    .then(function (response) {

                        console.log(response.data.results[0].geometry.location.lat);
                        vm.lat = response.data.results[0].geometry.location.lat;
                        vm.long = response.data.results[0].geometry.location.lng;
                    },function () {
                        
                    });
            }
            init();



        }
})();