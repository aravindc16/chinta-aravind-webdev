/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('widgetListController', widgetListController)
        .controller('widgetNewController', widgetNewController)
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, WidgetService, $location, $mdDialog){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.sizes = [1,2,3,4,5,6];
        vm.widget = WidgetService.findWidgetById(vm.widgetId);

        //event handler
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function deleteWidget(){
            var confirm = $mdDialog.confirm()
                .title("Delete Widget!")
                .textContent("Are you sure you want to delete?")
                .ok("Yes")
                .cancel("No!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widgetId);
            }

            function yes(){
                WidgetService.deleteWidget(vm.widgetId);
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/');
            }

        }

        function updateWidget(widget){
            vm.widget = WidgetService.updateWidget(vm.widgetId, widget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/');
        }
    }

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

    function widgetListController($routeParams, $mdDialog, WidgetService, $location, $sce){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        if(vm.widgets.length == 0){
            var confirm = $mdDialog.confirm()
                .title("No Widgets.")
                .textContent("Damn, no widgets. Would you like to create one?")
                .ok("Alright")
                .cancel("Some other time!");

            $mdDialog.show(confirm).then(yes, nope);

            function nope(){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page');
            }

            function yes(){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/new');
            }
        }
        vm.safeYoutube = safeYoutube;

        function safeYoutube(url){
            var urlSplit = url.split('=');
            var urlId = urlSplit[urlSplit.length - 1];
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+urlId);
        }
    }
})();