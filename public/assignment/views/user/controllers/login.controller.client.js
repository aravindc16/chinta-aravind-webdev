/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $mdDialog){
        var vm = this;
        //event handlers

        vm.login = login;
        vm.footer = true;

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