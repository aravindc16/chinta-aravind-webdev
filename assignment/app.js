/**
 * Created by aravindchinta on 2/21/17.
 */


module.exports = function (app) {

    //Requiring all the models and sending all of them to all the services - node.js
    var model = require("./model/model.server.js")();

    require('./services/user.service.server.js')(app, model);
    require('./services/website.service.server.js')(app, model);
    require('./services/page.service.server.js')(app);
    require('./services/widget.service.server.js')(app);


}