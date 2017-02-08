/**
 * Created by aravindchinta on 2/8/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, $location, PageService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        //event handler

        vm.createPage = createPage;

        function createPage(page){
            PageService.createPage(vm.websiteId, page);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
        }
    }
})();