/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('WidgetService', WidgetService);

    function WidgetService($http){

        var api = {
            'findWidgetsByPageId': findWidgetsByPageId,
            'createWidget': createWidget,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget
        };

        return api;

        function deleteWidget(widgetId){
            return $http.delete('/api/widget/'+widgetId);
        }

        function updateWidget(widgetId, widget){
            return $http.put('/api/widget/'+widgetId, widget);
        }

        function findWidgetById(widgetId){
            return $http.get('/api/widget/'+widgetId);
        }

        function createWidget(pageId, widget) {
            return $http.post('/api/page/'+pageId+'/widget', widget);
        }

        function findWidgetsByPageId(pageId){
            return $http.get('/api/page/'+pageId+'/widget');
        }
    }
})();
