/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

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
})();