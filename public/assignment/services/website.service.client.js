/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http){
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
            return $http.delete('/api/website/'+websiteId);
        }

        function updateWebsite(websiteId, website){
            return $http.put('/api/website/'+websiteId, website);
        }

        function findWebsiteById(websiteId){
           return $http.get('/api/website/'+websiteId);
        }

        function createWebsite(userId, website){
           return $http.post('/api/user/'+userId+'/website', website);
        }

        function findWebsiteByUser(userId){
            return $http.get('/api/user/'+userId+'/website');
        }

    }
})();