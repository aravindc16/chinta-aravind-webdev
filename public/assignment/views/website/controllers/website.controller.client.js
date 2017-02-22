/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('websiteListController', websiteListController)
        .controller('websiteNewController', websiteNewController)
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, WebsiteService, $mdDialog){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {

            //To populate the list of websites for a user.
            var promise1 = WebsiteService.findWebsiteByUser(vm.userId);
            promise1.success(function (websites) {
                vm.websites = websites;
            })

            //To select the website content when the cog is clicked
            var promise = WebsiteService.findWebsiteById(vm.websiteId);

            promise.success(function (website){
                vm.website = website;
                if(vm.website == null){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Website Error!")
                            .textContent("No Website Found.")
                            .ok("OK"));
                }
            })

        }
        init();

        //event handler
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(){

            var confirm = $mdDialog.confirm()
                .title("Delete Website!")
                .textContent("Are you sure you want to delete?")
                .ok("Yes")
                .cancel("No!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId);
            }

            function yes(){
                var promise = WebsiteService.deleteWebsite(vm.websiteId);
                promise.success(function (code) {
                    $location.url("/user/"+vm.userId+"/website");
                })

            }
        }

        function updateWebsite(website){
            var promise = WebsiteService.updateWebsite(vm.websiteId, website);
            promise.success(function (website) {
                vm.website = website;
                $location.url('/user/'+vm.userId+'/website');
            })

        }
    }

    function websiteNewController($routeParams, $location, WebsiteService){
        var vm = this;

        var userId = $routeParams['uid'];
        vm.userId = userId;

        function init() {
            var promise = WebsiteService.findWebsiteByUser(userId);
            promise.success(function (websites) {
                vm.websites = websites;
            })
        }
        init();

        //event handler
        vm.createWebsite = createWebsite;

        function createWebsite(website){
            var promise = WebsiteService.createWebsite(userId, website);
            promise.success(function (website) {
                $location.url('/user/'+userId+'/website');
            })

        }
    }

    function websiteListController($routeParams, $mdDialog, $location, WebsiteService){
        var vm = this;

        var userId = $routeParams['uid'];
        vm.userId = userId;

        function init() {

            //To populate the list of websites of a user.
            var promise = WebsiteService.findWebsiteByUser(userId);
            promise.success(function (websites) {
                vm.websites = websites;
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
            })
        }
        init();
    }
})();