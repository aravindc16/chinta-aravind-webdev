/**
 * Created by aravindchinta on 2/22/17.
 */

module.exports = function (app, model) {

    app.get('/api/page/:pageId', findPageByPageId);
    app.get('/api/website/:websiteId/page', findPagesByWebsiteId);
    app.post('/api/website/:websiteId/page', createPage);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.put('/page/:pageId/widget', updateSortableWidgets);

    function updateSortableWidgets(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.final;

        model.PageModel.updateSortableWidgets(pageId, start, end)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;

        // 1. Deleting the website reference when the page is deleted
        // 2. Deleting the widgets of that page
        // 3. Deleting the page

        console.log('in delete fn, page service server')
        model.PageModel.findPageById(pageId)
            .then(function (page) {

                model.WebsiteModel.findWebsiteById(page._website)
                    .then(function (website) {

                        website.pages.pull(pageId);          //First deleting the website reference
                        website.save();

                        model.WidgetModel.findWidgetsByPageId(pageId)
                            .then(function (widgets) {

                                for(var w in widgets){
                                    model.WidgetModel.deleteWidget(widgets[w]._id)
                                        .then(function (widget) {
                                            res.sendStatus(200);
                                        })
                                }

                                model.PageModel.deletePage(pageId)
                                    .then(function (page) {

                                        res.sendStatus(200);
                                    },function (err) {
                                        res.sendStatus(404).send('Page not found to delete');
                                    });
                            });

                    },function (err) {
                        res.sendStatus(404).send('Website not found to delete the ref');
                    })
            },function (err) {

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