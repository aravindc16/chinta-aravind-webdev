/**
 * Created by aravindchinta on 3/13/17.
 */
(function () {
    angular
        .module('FoodForThoughtApp')
        .controller('landingController', LandingController);

    function LandingController($mdDialog, $location, $routeParams, UserService) {
        var vm = this;
        var originatorEv;

        vm.userId = $routeParams['uid'];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        vm.Profile = Profile;
        vm.Logout = Logout;


        function Profile() {
            $location.url('user/'+vm.userId);
        }

        function Logout() {
            $location.url('/');
        }
    }
})();