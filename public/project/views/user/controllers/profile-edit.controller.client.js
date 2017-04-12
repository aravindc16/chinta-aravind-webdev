/**
 * Created by aravindchinta on 3/14/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .controller('profileEditController',ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService) {
        var vm = this;

        vm.userId = $routeParams['uid'];

        function init() {
            UserService.findUserById(vm.userId)
                .then(function (response) {
                    vm.user=response.data;
                });
        }
        init();

        vm.update = update;

        function update(newuser) {
            UserService.updateUser(vm.userId, newuser)
                .then(function (response) {
                    newuser = response.data;
                    $location.url('user/'+vm.userId);
                }, function (err) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Update Error!")
                            .textContent("Sorry, update didn't go through. Please try again.")
                            .ok("OK"));
                });

        }
    }
})();
