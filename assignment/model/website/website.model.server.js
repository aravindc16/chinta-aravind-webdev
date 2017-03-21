/**
 * Created by aravindchinta on 3/7/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('Website', WebsiteSchema);

    var api = {
        'createWebsiteForUser': createWebsiteForUser,
        'findAllWebsitesForUser': findAllWebsitesForUser,
        'findWebsiteById': findWebsiteById,
        'updateWebsite':updateWebsite,
        'deleteWebsite': deleteWebsite,
        'setModel': setModel
    }

    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({'_id':websiteId});
    }
    
    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({'_id':websiteId},{$set : {'name':website.name,'description':website.description}});
    }
    
    function findWebsiteById(websiteId) {
        return WebsiteModel.findOne({'_id': websiteId});
    }
    
    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({'_user':userId});
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }
}