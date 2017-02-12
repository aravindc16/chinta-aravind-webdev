/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('websiteListController', websiteListController)
        .controller('websiteNewController', websiteNewController)
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

    function websiteNewController($routeParams, $location, WebsiteService){
        var vm = this;

        //event handler
        vm.createWebsite = createWebsite;

        var userId = $routeParams['uid'];
        vm.userId = userId;
        vm.websites = WebsiteService.findWebsiteByUser(userId);


        function createWebsite(website){
            WebsiteService.createWebsite(userId, website)
            $location.url('/user/'+userId+'/website');
        }
    }

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