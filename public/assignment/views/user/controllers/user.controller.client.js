/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module("WebAppMaker")
        .controller("loginController", loginController)
        .controller("profileController", profileController)
        .controller("registerController", registerController);

    function registerController(UserService, $mdDialog, $location){
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


    }

    function profileController($routeParams, $mdDialog, UserService){
        var vm = this;

        //event handlers
        vm.update = update;
        var userId = $routeParams['uid'];

        function update(user){
            var newUser = UserService.updateUser(userId, user);

            if(newUser == null){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Update Error!")
                        .textContent("User couldn't be updated.")
                        .ok("OK"));
            }else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Update Success!")
                        .textContent("User successfully updated.")
                        .ok("OK"));
            }
        }


        // console.log(userId);
        vm.user = UserService.findUserById(userId);

        // console.log(vm.user);
    }

    function loginController(UserService, $location, $mdDialog){
        var vm = this;

        //event handlers
        vm.login = login;

        function login(user){
            // If nothing is entered in the fields.
            if(user == undefined){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Credentials Error!")
                        .textContent("Please enter your credentials.")
                        .ok("OK"));
            }

            vm.loginUser = UserService.findUserByCredentials(user.username, user.password);

            if(vm.loginUser != null){
                $location.url('/user/'+vm.loginUser._id);
            }else{
                //clear the fields
                user.username='';
                user.password='';

                //dialog showing the error.
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Username Error!")
                        .textContent("User not found. Please check your user name.")
                        .ok("OK"));
            }
        }
    }
})();