/**
 * Created by aravindchinta on 2/7/17.
 */

(function(){
    angular.module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http){

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