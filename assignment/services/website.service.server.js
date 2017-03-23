/**
 * Created by aravindchinta on 2/22/17.
 */
module.exports = function (app, model) {

    app.get('/api/website/:websiteId', findWebsiteById);
    app.get('/api/user/:userId/website', findWebsiteByUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;

        model.WebsiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                model.UserModel.findUserById(website._user)
                    .then(function (user) {
                        user.websites.pull(websiteId);          //First deleting the user reference
                        user.save();

                        model.PageModel.findAllPagesForWebsite(websiteId)
                            .then(function (pages) {
                                for(var p in pages){
                                    model.WidgetModel.findWidgetsByPageId(pages[p]._id)
                                        .then(function (widgets) {
                                            for(var w in widgets) {
                                                model.WidgetModel.deleteWidget(widgets[w]._id)
                                                    .then(function (widget) {
                                                        res.sendStatus(200).send('Successfully deleted the widget.')
                                                    });
                                            }

                                            model.PageModel.deletePage(pages[p]._id)
                                                .then(function (page) {
                                                    res.sendStatus(200);
                                                });
                                        });
                                }

                                model.WebsiteModel.deleteWebsite(websiteId)
                                    .then(function (website) {
                                        res.sendStatus(200);
                                    },function (err) {
                                        res.sendStatus(404).send('Website not found to delete');
                                    });

                            });

                    },function (err) {
                        res.sendStatus(404).send('User not found to delete the ref');
                    });
            })
        //And then deleting the pages.
    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;

        model.WebsiteModel.updateWebsite(websiteId, website)
            .then(function (website) {
                res.send(website);
            },function (err) {
                res.sendStatus(500).send('Could not update website');
            });
    }

    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;

        model.WebsiteModel.createWebsiteForUser(userId, website)
            .then(function (website) {
                model.UserModel.findUserById(userId)
                    .then(function (user) {
                        user.websites.push(website._id);
                        user.save();
                        res.send(website);
                    }, function (err) {
                        res.sendStatus(404);
                    });
            },function (err) {
                res.sendStatus(500).send('Could not create website');
            });
    }

    function findWebsiteByUser(req, res){
        var userId = req.params.userId;

        model.WebsiteModel.findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.send(websites);
            },function (err) {
                res.send(404).send('No website found');
            });
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;

        model.WebsiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                res.send(website);
            },function (err) {
                res.sendStatus(404).send('Website not found');
            });
    }
}