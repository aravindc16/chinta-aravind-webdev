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

        vm.createHeader = createHeader;
        vm.createImage = createImage;
        vm.createYoutube = createYoutube;

        function createYoutube(widget){
            widget.widgetType = 'YOUTUBE';
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
        }

        function createImage(widget){
            widget.widgetType = 'IMAGE';
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
        }

        function createHeader(widget) {
            widget.widgetType = 'HEADER';
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
        }
    }
})();