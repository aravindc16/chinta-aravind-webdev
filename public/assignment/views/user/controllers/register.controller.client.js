/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController(UserService, $mdDialog, $location){
        var vm = this;

        //event handler
        vm.register = register;

        function register(user){
            var userId = UserService.createUser(user);
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title("Registration Success!")
                    .textContent("You have registered successfully.")
                    .ok("OK"));
            $location.url('/user/'+userId);
        }


    }
})();