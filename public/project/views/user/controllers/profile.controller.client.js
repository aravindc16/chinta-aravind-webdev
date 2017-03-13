/**
 * Created by aravindchinta on 3/13/17.
 */

(function () {
    angular.module('FoodForThoughtApp')
        .controller('profileController', ProfileController);

    function ProfileController($routeParams, UserService) {
            var vm = this;

            var userId = $routeParams['uid'];

            function init() {
                vm.user = UserService.findUserById(userId);
            }
            init();

        }
})();