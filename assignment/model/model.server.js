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

    //Getting all the models of all types of views in one variable and returning them to app.
    var models = {
      UserModel: require('./user/user.model.server')(),
      WebsiteModel: require('./website/website.model.server')()
    };

    return models;
}