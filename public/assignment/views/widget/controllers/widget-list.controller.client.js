/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .controller('widgetListController', widgetListController);

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