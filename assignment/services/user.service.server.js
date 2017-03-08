/**
 * Created by aravindchinta on 2/21/17.
 */


module.exports = function (app, model) {

    // added the words login and register to differentiate between the two calls
    app.get('/api/user/login/', findUserByCredentials);
    app.get('/api/user/register/', findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.post('/api/user', createUser);
    app.delete('/api/user/:userId', deleteUser);

    function deleteUser(req, res){
        var userId = req.params.userId;

        model.UserModel.deleteUser(userId)
            .then(function (user) {         //Call if this function is successful.
                res.sendStatus(200);
            }, function () {
                res.sendStatus(400);
            });
    }

    function createUser(req, res){
        var user = req.body;

        //Using the model being sent from the app.js to create a new user when he registers.
        model.UserModel.createUser(user)
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(500).send('Could not create user' + error);
            });

    }

    function updateUser(req,res){
        var userId = req.params.userId;
        var user = req.body;

        model.UserModel.updateUser(userId, user)
            .then(function (user) {
                res.send(user);
            },function (err) {
                res.sendStatus(500);
            });
    }
    function findUserById(req, res){
        var userId = req.params.userId;
        //DB query
        model.UserModel.findUserById(userId)
            .then(function (user) {
                res.send(user);
            },
            function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByUsername(req, res){
        var username = req.query.username;

        model.UserModel.findUserByUsername(username)
            .then(function (user) {
                    if(user == undefined){
                        res.sendStatus(404);
                    }else {
                        res.send(user);
                    }
            },
            function (err) {
                res.sendStatus(505);
            })

    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;

        model.UserModel.findUserByCredentials(username,password)
            .then(function (user) {
                if(user == undefined){
                    res.sendStatus(500);
                }else {
                    res.send(user);
                }
            }, function (error) {
                res.sendStatus(404).send('No user found');
            })
    }
}