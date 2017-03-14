/**
 * Created by aravindchinta on 3/13/17.
 */

(function () {
    angular.module('FoodForThoughtApp')
        .controller('profileController', ProfileController);

    function ProfileController($mdDialog, $location, $http, $routeParams, UserService) {
            var vm = this;

            vm.userId = $routeParams['uid'];

            vm.deleteUser = deleteUser;

            function init() {
                vm.user = UserService.findUserById(vm.userId);
                var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+vm.user.city+'&sensor=false&key=AIzaSyB5Ae4ILNTqkQEPmk0AeBlak_bkNJI9wm4';
                $http.get(url)
                    .then(function (response) {
                        vm.lat = response.data.results[0].geometry.location.lat;
                        vm.long = response.data.results[0].geometry.location.lng;
                        vm.city = response.data.results[0].formatted_address;
                    },function () {
                        
                    });
            }
            init();

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
                var response = UserService.deleteUser(vm.userId);
                if(response == 'success'){
                    $location.url('/');
                }else{
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Delete Error!")
                            .textContent("We love you so much that we couldn't delete you.")
                            .ok("OK"));
                }


            }
            }


        }
})();