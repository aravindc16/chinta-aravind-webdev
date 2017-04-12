/**
 * Created by aravindchinta on 3/7/17.
 */
module.exports = function () {


    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel = require('./page/page.model.server')();
    var widgetModel = require('./widget/widget.model.server')();


    //Getting all the models of all types of views in one variable and returning them to app.
    var models = {
      UserModel: userModel,
      WebsiteModel: websiteModel,
      PageModel: pageModel,
      WidgetModel: widgetModel
    };

    userModel.setModel(models);
    websiteModel.setModel(models);
    pageModel.setModel(models);
    widgetModel.setModel(models);

    return models;
}