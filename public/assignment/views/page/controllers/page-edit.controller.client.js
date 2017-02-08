/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, $location, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.page = PageService.findPageByPageId(vm.pageId);
        //event handler

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
        }

        function updatePage(page){
            vm.page = PageService.updatePage(vm.pageId, page);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
        }


    }
})();