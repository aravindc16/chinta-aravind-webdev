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
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        vm.update = update;

        function update(newuser) {
            var newuser = UserService.updateUser(vm.userId, newuser);
            $location.url('user/'+newuser._id);
        }
    }
})();
