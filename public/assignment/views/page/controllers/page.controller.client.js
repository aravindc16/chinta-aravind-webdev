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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageByPageId(vm.pageId);
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
                PageService.deletePage(vm.pageId);
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
            }


        }

        function updatePage(page){
            vm.page = PageService.updatePage(vm.pageId, page);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
        }

    }

    function pageNewController($routeParams, $location, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        //event handlers
        vm.createPage = createPage;

        function createPage(page){
            PageService.createPage(vm.websiteId, page);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
        }
    }

    function pageListController($routeParams, $location, $mdDialog, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);


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
        }
        init();

    }
})();