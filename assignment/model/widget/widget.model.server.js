/**
 * Created by aravindchinta on 3/16/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var model = {};
    var q = require('q');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    var PageModel = require('../page/page.model.server');

    var api = {
        'createWidget': createWidget,
        'findWidgetById': findWidgetById,
        'updateWidget': updateWidget,
        'findWidgetsByPageId': findWidgetsByPageId,
        'deleteWidget': deleteWidget,
        'setModel': setModel

    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({'_id':widgetId});
    }

    //Fetching all the widgets from the page and displaying them in the order.
    function findWidgetsByPageId(pageId) {
        var d = q.defer();
        model.PageModel.findAllWidgetsForPage(pageId)
            .then(function (pages) {
                d.resolve(pages.widgets);
            });

        return d.promise;
    }

    function updateWidget(widgetId, widget) {
        if(widget.type=='HEADER'){
            return WidgetModel.update({'_id':widgetId}, {$set : {'text': widget.text, 'size': widget.size}});
        } else if(widget.type=='IMAGE'){
            return WidgetModel.update({'_id':widgetId}, {$set : {'url': widget.url, 'width': widget.width}});
        } else if(widget.type=='YOUTUBE'){
            return WidgetModel.update({'_id':widgetId}, {$set : {'url': widget.url, 'width': widget.width}});
        } else if(widget.type=='HTML'){
            return WidgetModel.update({'_id':widgetId}, {$set : {'text': widget.text, 'size': widget.size}});
        } else if(widget.type=='TEXT'){
            return WidgetModel.update({'_id':widgetId},
                {$set : {'text':widget.text,
                    'rows': widget.rows,
                    'formatted': widget.formatted},
                    'placeholder': widget.placeholder});
        }

    }

    function findWidgetById(widgetId) {
        return WidgetModel.findOne({'_id':widgetId});
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel.create(widget);
    }
}
