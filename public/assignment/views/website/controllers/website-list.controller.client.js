/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, $mdDialog, $location, WebsiteService){
        var vm = this;

        var userId = $routeParams['uid'];
        vm.userId = userId;
        vm.websites = WebsiteService.findWebsiteByUser(userId);

        // console.log(vm.websites);

        if(vm.websites.length == 0){
            var confirm = $mdDialog.confirm()
                .title("No Websites.")
                .textContent("Damn, no websites. Would you like to create one?")
                .ok("Alright")
                .cancel("Some other time!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+userId);
            }

            function yes(){
                $location.url('/user/'+userId+'/website/new');
            }
        }
    }
})();