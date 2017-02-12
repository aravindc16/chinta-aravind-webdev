/**
 * Created by aravindchinta on 2/12/17.
 */
(function () {
    angular.module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, WidgetService, $location){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.sizes = [1,2,3,4,5,6];
        vm.widget = WidgetService.findWidgetById(vm.widgetId);

        //event handler
        vm.updateWidget = updateWidget;

        function updateWidget(widget){
            vm.widget = WidgetService.updateWidget(vm.widgetId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/');
        }
    }
})();