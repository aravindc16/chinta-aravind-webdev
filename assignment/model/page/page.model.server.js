/**
 * Created by aravindchinta on 3/8/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var q = require('q');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        'createPage': createPage,
        'findAllPagesForWebsite': findAllPagesForWebsite,
        'findPageById': findPageById,
        'updatePage': updatePage,
        'deletePage': deletePage,
        'updateSortableWidgets': updateSortableWidgets,
        'setModel': setModel,
        'findAllWidgetsForPage': findAllWidgetsForPage
    }

    return api;
    
    function findAllWidgetsForPage(pageId) {
        return PageModel.findById(pageId)
            .populate("widgets")
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

    function updateSortableWidgets(pageId, start, end) {
        var d = q.defer();
        return PageModel.findById(pageId)
            .then(function (page) {
                var final = page.widgets.splice(start-1, 1)[0];
                page.widgets.splice(end-1, 0, final);
                page.save(function (err, page) {
                    d.resolve(page);
                });

            }, function (err) {
                return err;
            });
        return d.promise;
    }
    
    function deletePage(pageId) {
        var d = q.defer();
        PageModel.remove({'_id': pageId}, function (err, response) {
            d.resolve(response);
        });

        return d.promise;
    }
    
    function updatePage(pageId, page) {
        var d = q.defer();
        return PageModel.update({'_id': pageId}, {$set: {'name': page.name, 'title': page.title}});
    }
    
    function findPageById(pageId) {
        var d= q.defer();
        PageModel.findOne({'_id':pageId}, function (err, page) {
            if(page){
                d.resolve(page);
            }else {
                d.reject(err);
            }
        });

        return d.promise;
    }
    
    function findAllPagesForWebsite(websiteId) {
        var d = q.defer();
        PageModel.find({'_website': websiteId}, function (err, pages) {
            if(pages){
                d.resolve(pages);
            }else{
                d.reject(err);
            }
        });

        return d.promise;
    }
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        var d = q.defer();
        PageModel.create(page, function (err, page) {
            if(page){
                d.resolve(page);
            }else{
                d.reject(err);
            }
        });
        return d.promise;
    }
}
