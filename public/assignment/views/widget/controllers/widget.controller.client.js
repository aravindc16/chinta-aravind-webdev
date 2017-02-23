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

        function init() {
            vm.sizes = [1,2,3,4,5,6];
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.success(function (widget) {
                vm.widget = widget;
            })
        }
        init();

        //event handlers
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
                var promise = WidgetService.deleteWidget(vm.widgetId);
                promise.success(function (status) {
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/');
                })

            }

        }

        function updateWidget(widget){
            //Promise for UpDate Widget.
            var promise = WidgetService.updateWidget(vm.widgetId, widget);
            promise.success(function (widget) {
                vm.widget = widget;
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/');
            })

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
        vm.createHTML = createHTML;

        function createHTML(widget){
            widget.widgetType = 'HTML';
            //Promise for HEADER.
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function (widget) {
                vm.widget = widget;
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
            })

        }

        function createYoutube(widget){
            widget.widgetType = 'YOUTUBE';
            //Promise for YOUTUBE.
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function (widget) {
                vm.widget = widget;
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
            })

        }

        function createImage(widget){
            widget.widgetType = 'IMAGE';
            //Promise for IMAGE.
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function (widget) {
                vm.widget = widget;
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
            })
        }

        function createHeader(widget) {
            widget.widgetType = 'HEADER';
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.success(function (widget) {
                vm.widget = widget;
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+vm.widget._id);
            })

        }
    }

    function widgetListController($routeParams, $mdDialog, WidgetService, $location, $sce){
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise.success(function (widgets) {
                vm.widgets = widgets;

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
            })
        }
        init();

        vm.safeYoutube = safeYoutube;
        vm.getTrustedHTML = getTrustedHTML;

        function getTrustedHTML(text){
            return $sce.trustAsHtml(text);
        }

        //Implemented for both small URL and regular YouTube URLs.
        function safeYoutube(url){

            var mainSplit = url.split("/");
            if(mainSplit[mainSplit.length - 1].includes('=')){
                var subSplit = mainSplit[mainSplit.length - 1];
                var urlSplit = subSplit.split('=');
                var urlId = urlSplit[urlSplit.length - 1];
                return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+urlId);
            }else {
                var urlId = mainSplit[mainSplit.length - 1];
                return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+urlId);
            }
        }
    }
})();