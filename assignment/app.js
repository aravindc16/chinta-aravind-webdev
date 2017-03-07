/**
 * Created by aravindchinta on 2/21/17.
 */


module.exports = function (app) {

    var UserModel = require('./model/user/user.model.server')();
    require('./services/user.service.server.js')(app, UserModel);
    require('./services/website.service.server.js')(app);
    require('./services/page.service.server.js')(app);
    require('./services/widget.service.server.js')(app);

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MONGODB_URI) {

        connectionString = process.env.MONGODB_URI;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
}