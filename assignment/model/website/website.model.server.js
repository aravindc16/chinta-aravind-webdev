/**
 * Created by aravindchinta on 3/7/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var q = require('q');
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
        var d= q.defer();
        WebsiteModel.remove({'_id':websiteId}, function (err, response) {
            d.resolve(response);
        });
        return d.promise;
    }
    
    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({'_id':websiteId},{$set : {'name':website.name,'description':website.description}});
    }
    
    function findWebsiteById(websiteId) {
        var d = q.defer();
        WebsiteModel.findOne({'_id': websiteId}, function (err, website) {
            if(website){
                d.resolve(website);
            }else{
                d.reject(err);
            }

        });
        return d.promise;
    }
    
    function findAllWebsitesForUser(userId) {
        var d = q.defer();
        WebsiteModel.find({'_user':userId}, function (err, websites) {
            d.resolve(websites);
        });

        return d.promise;
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        var d = q.defer();
        WebsiteModel.create(website, function (err, website) {
            d.resolve(website);
        });
        return d.promise;
    }
}