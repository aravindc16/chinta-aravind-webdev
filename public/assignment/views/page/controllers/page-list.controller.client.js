/**
 * Created by aravindchinta on 2/8/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, $location, $mdDialog, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        if(vm.pages.length == 0){
            var confirm = $mdDialog.confirm()
                .clickOutsideToClose(true)
                .title("No Pages.")
                .textContent("Damn, no pages. Would you like to create one?")
                .ok("Alright")
                .cancel("Some other time!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+vm.userId+'/website');
            }

            function yes(){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/new');
            }
        }

    }
})();