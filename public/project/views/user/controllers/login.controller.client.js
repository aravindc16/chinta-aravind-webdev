/**
 * Created by aravindchinta on 3/13/17.
 */

(function () {
    angular
        .module('FoodForThoughtApp')
        .controller('loginController', LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(user) {
            var user = UserService.findUserByCredentials(user.username, user.password);
            console.log(user);
            if(user){
                $location.url('user/'+user._id);
            }
        }
    }
})();