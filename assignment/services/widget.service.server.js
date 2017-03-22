/**
 * Created by aravindchinta on 2/22/17.
 */
module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get('/api/widget/:widgetId', findWidgetById);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload', upload.single('myFile'), uploadImage);
    
    function uploadImage(req, res){

        var widgetId      = req.body.widgetId;
        var userId      = req.body.userId;
        var pageId      = req.body.pageId;
        var websiteId      = req.body.websiteId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var url = "/uploads/" + filename;
        model.WidgetModel.updateWidget(widgetId, {'type': 'IMAGE', 'url': url, 'width': width })
            .then(function (widget) {
                res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/" + widgetId);
            }, function (err) {
                res.send('Could not update image');
            })
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;

        model.WidgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                model.PageModel.findPageById(widget._page)
                    .then(function (page) {
                        page.widgets.pull(widgetId);
                        page.save();

                        model.WidgetModel.deleteWidget(widgetId)
                            .then(function (widget) {
                                res.send(200);
                            },function () {
                                res.sendStatus(500).send('Could not delete widget');
                            });
                    })
            })

    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;

        model.WidgetModel.updateWidget(widgetId, widget)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send('Could not update the' + widget.type+ 'widget')
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        if(widget.type == 'HEADER'){
            widget.size = 3;
            widget.text = 'Change the text';
            model.WidgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    model.PageModel.findPageById(pageId)
                        .then(function (page) {
                            page.widgets.push(widget._id);
                            page.save();
                            res.send(widget);
                        }, function (err) {
                            res.sendStatus(404).send('Could not find page to update ref of widget');
                        })

                }, function (err) {
                    // console.log(err);
                    res.send('Could not create Header Widget');
                });
        }else if(widget.type == 'IMAGE'){

            widget.type = 'IMAGE';
            widget.width = '100%';
            widget.url = '';
            model.WidgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    model.PageModel.findPageById(pageId)
                        .then(function (page) {
                            page.widgets.push(widget._id);
                            page.save();
                            res.send(widget);
                        }, function (err) {
                            res.sendStatus(404).send('Could not find page to update ref of widget');
                        })

                }, function (err) {
                    res.sendStatus(500).send('Could not create Widget');
                });
        }else if(widget.type == 'YOUTUBE'){

            widget.type = 'YOUTUBE';
            widget.width = '100%';
            widget.url = '';
            model.WidgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    model.PageModel.findPageById(pageId)
                        .then(function (page) {
                            page.widgets.push(widget._id);
                            page.save();
                            res.send(widget);
                        }, function (err) {
                            res.sendStatus(404).send('Could not find page to update ref of widget');
                        })

                }, function (err) {
                    res.sendStatus(500).send('Could not create Widget');
                });
        }
        else if(widget.type == 'HTML'){

            widget.type = 'HTML';
            widget.size = 3;
            widget.text = '<p>Your HTML Text</p>';
            model.WidgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    model.PageModel.findPageById(pageId)
                        .then(function (page) {
                            page.widgets.push(widget._id);
                            page.save();
                            res.send(widget);
                        }, function (err) {
                            res.sendStatus(404).send('Could not find page to update ref of widget');
                        })

                }, function (err) {
                    res.sendStatus(500).send('Could not create Widget');
                });
        }else if(widget.type == 'TEXT'){

            widget.type = 'TEXT';
            widget.text = 'Sample Text'
            widget.rows = 1;
            widget.formatted = false;
            widget.placeholder = 'Feel free to edit your TEXT widget'
            model.WidgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    model.PageModel.findPageById(pageId)
                        .then(function (page) {
                            page.widgets.push(widget._id);
                            page.save();
                            res.send(widget);
                        }, function (err) {
                            res.sendStatus(404).send('Could not find page to update ref of widget');
                        })

                }, function (err) {
                    res.sendStatus(500).send('Could not create Widget');
                });
        }
    }

    function findWidgetsByPageId(req, res){
        var pageId = req.params.pageId;

        model.WidgetModel.findWidgetsByPageId(pageId)
            .then(function (widgets) {
                // console.log(widgets);
                res.send(widgets);
            }, function (err) {
                res.sendStatus(500).send('Could not find widgets for the page');
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        
        model.WidgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(404).send('Could not find widget');
            });
    }
}