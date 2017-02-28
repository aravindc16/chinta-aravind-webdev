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
                    var promise = UserService.createUser(user);
                    promise.success(function (user){

                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Registration Success!")
                                .textContent("You have registered successfully.")
                                .ok("OK"));
                        $location.url('/user/'+user._id);
                    })
                })


            }
        }
    }

    function profileController($routeParams, $mdDialog, UserService, $location){
        var vm = this;

        var userId = $routeParams['uid'];

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user){
                vm.user = user;
            })

        }
        init();

        //event handlers
        vm.update = update;
        vm.deleteUser = deleteUser;

        function deleteUser() {

            var confirm = $mdDialog.confirm()
                .title("Unregister Warning!")
                .textContent("Are you sure you want to unregister and delete your account?")
                .ok("Yes")
                .cancel("No!");

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

    function loginController(UserService, $location, $mdDialog){
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

            var promise = UserService.findUserByCredentials(user.username, user.password);

            promise
                .success(function(user){
                    vm.loading = false;
                    $location.url('/user/'+user._id);
            })
                .error(function (err){
                    vm.loading = false;
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

                });


        }
    }
})();