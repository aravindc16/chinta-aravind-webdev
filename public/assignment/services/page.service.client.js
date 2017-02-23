/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('PageService', PageService);

    function PageService($http){
        var pages = [
            { "_id": "3", "name": "Post 1", "websiteId": "1", "title": "Post 1" },
            { "_id": "2", "name": "Post 2", "websiteId": "2", "title": "Post 2" },
            { "_id": "1", "name": "Post 3", "websiteId": "4", "title": "Post 3" }
        ];

        var api={
            'findPageByWebsiteId': findPageByWebsiteId,
            'findPageByPageId': findPageByPageId,
            'createPage': createPage,
            'updatePage': updatePage,
            'deletePage': deletePage
        }

        return api;

        function deletePage(pageId){
            return $http.delete('/api/page/'+pageId);
        }

        function updatePage(pageId, page){
            return $http.put('/api/page/'+pageId, page);
        }

        function createPage(websiteId, page){
            return $http.post('/api/website/'+websiteId+'/page', page);
        }

        function findPageByPageId(pageId){
            return $http.get('/api/page/'+pageId);
        }

        function findPageByWebsiteId(websiteId){
            return $http.get('/api/website/'+websiteId+'/page');
        }
    }
})();