/**
 * Created by aravindchinta on 2/21/17.
 */


module.exports = function (app) {
    require('./services/user.service.server.js')(app);
    require('./services/website.service.server.js')(app);
}