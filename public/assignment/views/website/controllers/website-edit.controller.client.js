/**
 * Created by aravindchinta on 2/7/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, WebsiteService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        if(vm.website == null){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title("Website Error!")
                    .textContent("No Website Found.")
                    .ok("OK"));
        }
    }
})();