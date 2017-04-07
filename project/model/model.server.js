/**
 * Created by aravindchinta on 3/23/17.
 */
module.exports = function () {

    // var connectionString = 'mongodb://127.0.0.1:27017/project';
    //
    // if(process.env.MONGODB_URI) {
    //
    //     connectionString = process.env.MONGODB_URI;
    // }
    //
    // var mongoose = require("mongoose");
    // // mongoose.connect(connectionString);
    // mongoose.createConnection(connectionString);

    var userModel = require('./user/user.model.server')();

    //Getting all the models of all types of views in one variable and returning them to app.
    var models = {
        UserModel: userModel
    };

    userModel.setModel(models);

    return models;

}