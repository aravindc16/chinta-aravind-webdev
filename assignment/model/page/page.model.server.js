/**
 * Created by aravindchinta on 3/8/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        'createPage': createPage,
        'findAllPagesForWebsite': findAllPagesForWebsite,
        'findPageById': findPageById,
        'updatePage': updatePage,
        'deletePage': deletePage,
        'updateSortableWidgets': updateSortableWidgets,
        'setModel': setModel
    }

    return api;

    function setModel(_model) {
        model = _model;
    }

    function updateSortableWidgets(pageId, start, end) {
        return PageModel.findById(pageId)
            .then(function (page) {
                console.log(start, end);
                console.log("before" + page.widgets);
                var final = page.widgets.splice(start, 1)[0];
                console.log("final " + final);
                page.widgets.splice(end, 0, final);
                page.save();
                console.log("after" + page.widgets);
            }, function (err) {
                return err;
            });
    }
    
    function deletePage(pageId) {
        return PageModel.remove({'_id': pageId});
    }
    
    function updatePage(pageId, page) {
        return PageModel.update({'_id': pageId}, {$set: {'name': page.name, 'title': page.title}});
    }
    
    function findPageById(pageId) {
        return PageModel.findOne({'_id':pageId});
    }
    
    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({'_website': websiteId});
    }
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }
}
