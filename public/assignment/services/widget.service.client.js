/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('WidgetService', WidgetService);

    function WidgetService($http){
        var widgets = [
            { "_id": "1", "widgetType": "HEADER", "pageId": "3", "size": 2, "text": "GIZMODO"},
            { "_id": "2", "widgetType": "HEADER", "pageId": "2", "size": 4, "text": "Lorem ipsum"},
            { "_id": "3", "widgetType": "IMAGE", "pageId": "3", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "4", "widgetType": "HTML", "pageId": "3", "text": "<p>Lorem ipsum</p>"},
            { "_id": "5", "widgetType": "HEADER", "pageId": "1", "size": 4, "text": "Lorem ipsum"},
            { "_id": "6", "widgetType": "YOUTUBE", "pageId": "1", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "7", "widgetType": "HTML", "pageId": "2", "text": "<p>Lorem ipsum</p>"}
        ];

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
