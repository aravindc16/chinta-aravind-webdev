/**
 * Created by aravindchinta on 2/8/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('pageListController', pageListController)
        .controller('pageNewController', pageNewController)
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, $location, PageService, $mdDialog){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            var promise1 = PageService.findPageByWebsiteId(vm.websiteId);
            promise1.success(function (pages) {
                vm.pages = pages;
            })

            var promise = PageService.findPageByPageId(vm.pageId);
            promise.success(function (page) {
                vm.page = page;
            })
        }
        init();

        //event handlers

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function deletePage(){

            var confirm = $mdDialog.confirm()
                .title("Delete Page!")
                .textContent("Are you sure you want to delete?")
                .ok("Yes")
                .cancel("No!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId);
            }

            function yes(){

                //On delete, server sends 200 OK.
                var promise = PageService.deletePage(vm.pageId);
                promise.success(function (code) {
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
                })
            }
        }

        function updatePage(page){
            if(!page.name){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Page Name Error!")
                        .textContent("Page must have a name.")
                        .ok("OK"));
            }else {
                var promise = PageService.updatePage(vm.pageId, page);
                promise.success(function (page) {
                    vm.page = page;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
                });
            }
        }

    }

    function pageNewController($mdDialog, $routeParams, $location, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {
                vm.pages = pages;
            })
        }
        init();

        //event handlers
        vm.createPage = createPage;

        function createPage(page){

            if(!page.name){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Page Name Error!")
                        .textContent("Page must have a name.")
                        .ok("OK"));
            }else {
                var promise = PageService.createPage(vm.websiteId, page);
                promise.success(function (page) {
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
                });
            }
        }
    }

    function pageListController($routeParams, $location, $mdDialog, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init(){
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {
                vm.pages = pages;
                if(vm.pages.length == 0){
                    var confirm = $mdDialog.confirm()
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
            })
        }
        init();

    }
})();