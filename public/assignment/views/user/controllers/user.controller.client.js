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
                // This is the promise for findByUsername
                var promise = UserService.findUserByUsername(user.username);
                promise.success(function(user){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Username Error!")
                            .textContent("This username is already taken.")
                            .ok("OK"));
                }).error(function (err){

                    // This is the promise for create user
                    var promise = UserService.registerUser(user);
                    promise.success(function (user){

                        vm.currentUser = user;
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Registration Success!")
                                .textContent("You have registered successfully.")
                                .ok("OK"));
                        $location.url('/user/'+user._id);
                    });
                })


            }
        }
    }

    function profileController($routeParams, $mdDialog, UserService, $location, checkLoggedIn){
        var vm = this;

        console.log(checkLoggedIn);
        var userId = $routeParams['uid'];
        vm.currentUser = checkLoggedIn;

        function init() {

            UserService.findCurrentUser()
                .then(function (response) {
                    
                    vm.user = response.data;
                }, function (err) {

                })

        }
        init();

        //event handlers
        vm.logout = logout;
        vm.update = update;
        vm.deleteUser = deleteUser;

        function logout(){
            UserService.logout().then(function (response) {
                $location.url('/login')
            }, function (err) {
                
            })
        }

        function deleteUser() {

            var confirm = $mdDialog.confirm()
                .title("Unregister Warning!")
                .textContent("Are you sure you want to unregister and delete your account?")
                .ok("Yes")
                .cancel("No!..");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+userId);
            }

            function yes(){
               var promise = UserService.deleteUser(userId);
               promise.success(function (suc){
                   console.log(suc);
                   $location.url('/login/');
               })

            }


        }

        function update(user){
            var promise = UserService.updateUser(userId, user);

            promise.success(function (newUser){
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
            })
        }

    }

    function loginController($http, UserService, $location, $mdDialog){
        var vm = this;

        //event handlers
        vm.login = login;

        function login(user){

            vm.loading = true;
            // If nothing is entered in the fields.
            if(user == undefined){
                vm.loading = false;
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Credentials Error!")
                        .textContent("Please enter your credentials.")
                        .ok("OK"));
            }

            var promise = UserService.login(user);

            promise
                .success(function(user){
                    vm.loading = false;
                    vm.currentUser = user;
                    $location.url('/user/'+user._id);

            })
                .error(function (err,message){
                    vm.loading = false;
                    //clear the fields
                    user.username='';
                    user.password='';

                    //dialog showing the error.
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Credentials Error!")
                            .textContent('No such user found.')
                            .ok("OK"));

                });

        }
    }
})();