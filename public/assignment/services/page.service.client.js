/**
 * Created by aravindchinta on 2/8/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('PageService', PageService);

    function PageService(){
        var pages = [
            { "_id": "3", "name": "Post 1", "websiteId": "1", "title": "Post 1" },
            { "_id": "2", "name": "Post 2", "websiteId": "2", "title": "Post 2" },
            { "_id": "4", "name": "Post 3", "websiteId": "4", "title": "Post 3" }
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
            for(var p in pages){
                if(pages[p]._id == pageId){
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pageId, page){
            for(var p in pages){
                if(pages[p]._id = pageId){
                    pages[p].name = page.name;
                    pages[p].title = page.title;
                    return angular.copy(pages[p]);
                }
            }
        }

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
            pages.push(page);
        }

        function findPageByPageId(pageId){
            for(var p in pages){
                if(pages[p]._id == pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId){
            var localPages = [];
            for(var p in pages){
                if(pages[p].websiteId == websiteId){
                    localPages.push(pages[p]);
                }
            }
            return angular.copy(localPages);
        }
    }
})();