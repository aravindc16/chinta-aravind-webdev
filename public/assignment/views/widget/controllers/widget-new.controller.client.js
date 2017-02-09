/**
 * Created by aravindchinta on 2/9/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, $location, WidgetService){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.pageId = $routeParams['pid'];
        vm.websiteId = $routeParams['wid'];
        //event handlers

    }
})();