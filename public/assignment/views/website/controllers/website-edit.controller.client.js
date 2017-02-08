/**
 * Created by aravindchinta on 2/7/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, WebsiteService){
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

        //event handler
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }

        function updateWebsite(website){
            vm.website = WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url('/user/'+vm.userId+'/website');
        }
    }
})();