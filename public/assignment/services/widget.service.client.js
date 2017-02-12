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
                "url": "https://www.youtu.be/AM2Ivdi9c4E" }
        ];

        var api = {
            'findWidgetsByPageId': findWidgetsByPageId,
            'createWidget': createWidget,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget
        };

        return api;

        function updateWidget(widgetId, widget){
            for(var w in widgets){
                if(widgets[w]._id == widgetId && widget.widgetType == 'HEADER'){
                    widgets[w].text = widget.text;
                    widgets[w].size = widget.size;
                    return angular.copy(widget[w]);
                }else if(widgets[w]._id == widgetId && widget.widgetType == 'IMAGE'){
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                    return angular.copy(widget[w]);
                }else if(widgets[w]._id == widgetId && widget.widgetType == 'YOUTUBE'){
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                    return angular.copy(widget[w]);
                }
            }
        }

        function findWidgetById(widgetId){
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            if(widget.widgetType == 'HEADER'){
                widget._id = (new Date()).getTime();
                widget.pageId = pageId;
                widget.size = 3;
                widget.text = 'Change the text';
                widgets.push(widget);
                return widget;
            }else if(widget.widgetType == 'IMAGE'){
                widget._id = (new Date()).getTime();
                widget.pageId = pageId;
                widget.width = '100%';
                widget.url = '';
                widgets.push(widget);
                return widget;
            }else if(widget.widgetType == 'YOUTUBE'){
                widget._id = (new Date()).getTime();
                widget.pageId = pageId;
                widget.width = '100%';
                widget.url = '';
                widgets.push(widget);
                return widget;
            }
        }

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