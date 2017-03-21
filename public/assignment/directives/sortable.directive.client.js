/**
 * Created by aravindchinta on 2/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function link(scope, element, attributes, sortController) {
            $(element)
                .sortable({
                    start:function (event,ui) {
                        start = ($(ui.item).index());
                    },
                    stop:function (event,ui) {
                        end = ($(ui.item).index());
                        sortController.WidgetSort(start,end);
                    },
                    axis: 'y'
                });
        }
        return {
            link: link,
            controller: sortController
        };
    }

    function sortController(PageService, $routeParams) {
        var vm = this;
        vm.WidgetSort = WidgetSort;
        vm.pageId = $routeParams['pid'];

        function WidgetSort(start, end) {
            PageService.sortWidgets(vm.pageId, start, end)
                .success(function (response) {
                    
                })
                .error(function (err) {
                    
                })
        }
    }
})();