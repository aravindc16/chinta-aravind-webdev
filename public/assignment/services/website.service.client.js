/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService(){
        var websites = [
            { "_id": "1", "name": "Facebook",    "developerId": "4", "description": "This is the Facebook Website" },
            { "_id": "2", "name": "Twitter",     "developerId": "4", "description": "This is Twitter Website" },
            { "_id": "3", "name": "Gizmodo",     "developerId": "4", "description": "Yo, this is Gizmodo!" },
            { "_id": "4", "name": "Tic Tac Toe", "developerId": "1", "description": "Wanna play some games?" },
            { "_id": "5", "name": "Checkers",    "developerId": "1", "description": "Chinese checkers! :D" },
            { "_id": "6", "name": "Chess",       "developerId": "2", "description": "I am the king in this game" }
        ];

        var api = {
            'findWebsiteByUser': findWebsiteByUser,
            'createWebsite': createWebsite,
            'findWebsiteById': findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId){
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    websites.splice(w, 1);
                }
            }
        }

        function updateWebsite(websiteId, website){
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsiteById(websiteId){
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function createWebsite(userId, website){
            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
        }

        function findWebsiteByUser(userId){
            var localWebsites = [];
            for(var w in websites){
                if(websites[w].developerId == userId){
                    localWebsites.push(websites[w]);
                }
            }
            return angular.copy(localWebsites);
        }

    }
})();