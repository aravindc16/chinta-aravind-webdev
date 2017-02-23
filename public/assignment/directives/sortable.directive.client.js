/**
 * Created by aravindchinta on 2/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();