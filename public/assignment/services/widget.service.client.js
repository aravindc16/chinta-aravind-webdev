/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('WidgetService', WidgetService);

    function WidgetService(){
        var widgets = [
            { "_id": "1", "widgetType": "HEADER", "pageId": "2", "size": 1, "text": "GIZMODO"},
            { "_id": "2", "widgetType": "HEADER", "pageId": "2", "size": 2, "text": "Lorem ipsum"},
            { "_id": "3", "widgetType": "IMAGE", "pageId": "1", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "4", "widgetType": "HEADER", "pageId": "3", "size": 3, "text": "Lorem ipsum"},
            { "_id": "5", "widgetType": "YOUTUBE", "pageId": "1", "width": "100%",
                "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" }
        ];

        var api = {
            'findWidgetsByPageId': findWidgetsByPageId
        };

        return api;

        function findWidgetsByPageId(pageId){
            var localWidgets = [];
            for(var w in widgets){
                if(widgets[w].pageId == pageId){
                    localWidgets.push(widgets[w]);
                }
            }

            return localWidgets;
        }
    }
})();