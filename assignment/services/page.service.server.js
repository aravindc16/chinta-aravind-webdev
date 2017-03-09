/**
 * Created by aravindchinta on 2/22/17.
 */

module.exports = function (app, model) {

    app.get('/api/page/:pageId', findPageByPageId);
    app.get('/api/website/:websiteId/page', findPagesByWebsiteId);
    app.post('/api/website/:websiteId/page', createPage);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function deletePage(req, res){
        var pageId = req.params.pageId;

        model.PageModel.findPageById(pageId)
            .then(function (page) {
                // console.log('this is' + website);
                model.WebsiteModel.findWebsiteById(page._website)
                    .then(function (website) {
                        website.pages.pull(pageId);          //First deleting the user reference
                        website.save();

                    },function (err) {
                        res.sendStatus(404).send('Website not found to delete the ref');
                    })
            },function (err) {

            })
            .then(function () {                                     //And then deleting the website.
                model.PageModel.deletePage(pageId)
                    .then(function (page) {
                        res.sendStatus(200);
                    },function (err) {
                        res.sendStatus(404).send('Page not found to delete');
                    });
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        model.PageModel.updatePage(pageId, page)
            .then(function () {
               res.send(page);
            },function (err) {
                res.sendStatus(500).send('Could not update the page');
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        model.PageModel.createPage(websiteId, page)
            .then(function (page) {
                model.WebsiteModel.findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page._id);
                        website.save();
                        res.send(page);
                    },function (err) {
                        res.sendStatus(404).send('Website not found to ref the page');
                    })
            }, function (err) {
                res.sendStatus(500).send('Could not create the page');
            });
    }

    function findPagesByWebsiteId(req, res){
        var websiteId = req.params.websiteId;

        model.PageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.send(pages);
            },function (err) {
                res.sendStatus(404).send('Pages not found');
            })
    }

    function findPageByPageId(req, res){
        var pageId = req.params.pageId;

        model.PageModel.findPageById(pageId)
            .then(function (page) {
                res.send(page);
            },function (err) {
                res.sendStatus(404),send('Page not found');
            });
    }
}