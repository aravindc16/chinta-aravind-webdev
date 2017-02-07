/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('profileController',profileController);

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
})();