/**
 * Created by aravindchinta on 3/13/17.
 */

(function () {
    angular
        .module('FoodForThoughtApp')
        .controller('loginController', LoginController);

    function LoginController($mdDialog, $location, UserService) {
        var vm = this;

        vm.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if(user){
                        $location.url('/'+user._id);
                    }else if(user==null) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Credentials Error!")
                                .textContent("We are sorry but we couldn't find you.")
                                .ok("OK"));
                    }
                }, function (err) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Credentials Error!")
                            .textContent("We are sorry but we couldn't find you. You might want to register first.")
                            .ok("OK"));
                });

        }
    }
})();