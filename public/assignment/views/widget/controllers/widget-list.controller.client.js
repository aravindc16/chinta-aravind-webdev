/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, WidgetService, $sce){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        vm.safeYoutube = safeYoutube;

        function safeYoutube(widget){
            if(widget.widgetType === 'YOUTUBE'){
                return $sce.trustAsResourceUrl(widget.url);
            }
        }
    }
})();