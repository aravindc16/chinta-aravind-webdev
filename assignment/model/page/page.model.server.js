/**
 * Created by aravindchinta on 3/8/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        'createPage': createPage,
        'findAllPagesForWebsite': findAllPagesForWebsite,
        'findPageById': findPageById,
        'updatePage': updatePage,
        'deletePage': deletePage
    }

    return api;
    
    function deletePage(pageId) {
        console.log('Deleting now...')
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
