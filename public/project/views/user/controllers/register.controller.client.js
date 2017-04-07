/**
 * Created by aravindchinta on 3/13/17.
 */
(function () {
    angular
        .module('FoodForThoughtApp')
        .controller('registerController', RegisterController);

    function RegisterController(UserService, $mdDialog, $location){
        var vm = this;

        //event handler
        vm.register = register;

        function register(user){

            if(user == undefined){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("You did not enter the required fields.")
                        .ok("OK"));
            }else if(user.username == null){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("Please make sure you enter the username.")
                        .ok("OK"));
            }else if(user.password == null || user.verifyPassword == null){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("Please make sure you enter the password and type again to verify.")
                        .ok("OK"));

            }else if(user.password != user.verifyPassword){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Attention!")
                        .textContent("Passwords do not match.")
                        .ok("OK"));
            } else{

                UserService.findUserByUsername(user.username)
                    .then(function (response) {
                        UserService.createUser(user)
                            .then(function (response) {
                                var user = response.data;
                                $mdDialog.show(
                                    $mdDialog.alert()
                                        .clickOutsideToClose(true)
                                        .title("Registration Success!")
                                        .textContent("You have registered successfully.")
                                        .ok("OK"));
                                $location.url('/user/'+user._id);
                            });
                    }, function (err) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Registration Error!")
                                .textContent("Sorry username already taken.")
                                .ok("OK"));
                    })




            }
        }
    }

})();
