/**
 * Created by aravindchinta on 4/12/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .controller('adminController', adminController);

    function adminController(UserService, $location) {
        var vm = this;
        
        vm.removeUser = removeUser;
        vm.logout = logout;
        
        function init() {
            UserService.findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                })
        }
        init();

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url('/login')
                })
        }

        function removeUser(user) {
            UserService.removeUser(user)
                .then(function (response) {
                    init();
                }, function (err) {

                })
        }
        
    }
})();
