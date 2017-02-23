/**
 * Created by aravindchinta on 2/22/17.
 */

module.exports = function (app) {
    var pages = [
        { "_id": "3", "name": "Post 1", "websiteId": "1", "title": "Post 1" },
        { "_id": "2", "name": "Post 2", "websiteId": "2", "title": "Post 2" },
        { "_id": "1", "name": "Post 3", "websiteId": "4", "title": "Post 3" }
    ];

    app.get('/api/page/:pageId', findPageByPageId);
    app.get('/api/website/:websiteId/page', findPagesByWebsiteId);
    app.post('/api/website/:websiteId/page', createPage);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function deletePage(req, res){
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages.splice(p, 1);
                res.sendStatus(200);
            }
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages[p].name = page.name;
                pages[p].title = page.title;
                res.send(pages[p]);
                return;
            }
        }
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.send(page);
    }

    function findPagesByWebsiteId(req, res){
        var websiteId = req.params.websiteId;
        var localPages = pages.filter(function (p) {
            return p.websiteId == websiteId;
        })
        res.send(localPages);
    }

    function findPageByPageId(req, res){
        var pageId = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pageId;
        })
        res.send(page);
    }
}