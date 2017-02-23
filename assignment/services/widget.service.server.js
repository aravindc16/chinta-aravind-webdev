/**
 * Created by aravindchinta on 2/22/17.
 */
module.exports = function (app) {

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

    app.get('/api/widget/:widgetId', findWidgetById);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;

        for(var w in widgets){
            if(widgets[w]._id == widgetId && widget.widgetType == 'HEADER'){
                widgets[w].text = widget.text;
                widgets[w].size = widget.size;
                res.send(widgets[w]);
                return;
            }else if(widgets[w]._id == widgetId && widget.widgetType == 'IMAGE'){
                widgets[w].url = widget.url;
                widgets[w].width = widget.width;
                res.send(widgets[w]);
                return;
            }else if(widgets[w]._id == widgetId && widget.widgetType == 'YOUTUBE'){
                widgets[w].url = widget.url;
                widgets[w].width = widget.width;
                res.send(widgets[w]);
                return;
            }else if(widgets[w]._id == widgetId && widget.widgetType == 'HTML'){
                widgets[w].text = widget.text;
                widgets[w].size = widget.size;
                res.send(widgets[w]);
                return;
            }
        }
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        if(widget.widgetType == 'HEADER'){
            widget._id = (new Date()).getTime();
            widget.pageId = pageId;
            widget.size = 3;
            widget.text = 'Change the text';
            widgets.push(widget);
            res.send(widget);
        }else if(widget.widgetType == 'IMAGE'){
            widget._id = (new Date()).getTime();
            widget.pageId = pageId;
            widget.width = '100%';
            widget.url = '';
            widgets.push(widget);
            res.send(widget);
        }else if(widget.widgetType == 'YOUTUBE'){
            widget._id = (new Date()).getTime();
            widget.pageId = pageId;
            widget.width = '100%';
            widget.url = '';
            widgets.push(widget);
            res.send(widget);
        }
        else if(widget.widgetType == 'HTML'){
            widget._id = (new Date()).getTime();
            widget.pageId = pageId;
            widget.size = '3';
            widget.text = '<p>Your HTML Text</p>';
            widgets.push(widget);
            res.send(widget);
        }
    }

    function findWidgetsByPageId(req, res){
        var pageId = req.params.pageId;
        var localWidgets = widgets.filter(function (w) {
            return w.pageId == pageId;
        });
        res.send(localWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget= widgets.find(function (w) {
            return w._id == widgetId;
        })
        res.send(widget);
    }
}