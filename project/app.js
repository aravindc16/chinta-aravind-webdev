/**
 * Created by aravindchinta on 3/23/17.
 */
module.exports = function (app) {
    var model = require("./model/model.server.js")();

    require('./services/user.service.server')(app, model);
    require('./services/review.service.server')(app, model);
}