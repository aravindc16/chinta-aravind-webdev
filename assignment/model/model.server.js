/**
 * Created by aravindchinta on 3/7/17.
 */
module.exports = function () {

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MONGODB_URI) {

        connectionString = process.env.MONGODB_URI;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

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