/**
 * Created by aravindchinta on 3/23/17.
 */
module.exports = function (app, model) {

    app.post('/api/project/register', createUser);
    app.get('/api/project/user/:uid', findUserById);
    app.get('/api/project/user', findUserByCredentials);
    app.get('/api/project/username', findUserByUsername);
    app.delete('/api/project/user/:uid', deleteUser);
    app.put('/api/project/user/:uid', updateUser);
    app.put('/api/project/restaurant/favorite/:uid', addFavoriteRestaurant);
    app.put('/api/project/restaurant/favorite/delete/:uid', deleteFavoriteRestaurant);

    function deleteFavoriteRestaurant(req, res) {
        var userId = req.params['uid'];
        var restaurant = req.body;

        model.UserModel.deleteFavoriteRestaurant(userId, restaurant)
            .then(function (response) {
                if(response){
                    res.send(response);
                }else{
                    res.sendStatus(500);
                }
            });
    }

    function addFavoriteRestaurant(req, res) {
        var restaurant = req.body;
        var userId = req.params['uid'];

        model.UserModel.addFavoriteRestaurant(userId, restaurant)
            .then(function (user) {
                console.log(user);
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(500);
                }
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['uid'];

        model.UserModel.updateUser(userId, user)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(500).send('Could not update the user.')
                }
            })
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];

        model.UserModel.deleteUser(userId)
            .then(function (user) {
                 res.sendStatus(200);

            }, function (err) {
                res.sendStatus(500).send('Could not delete. DB error.')
            })
    }
    
    function findUserByUsername(req, res) {
        var username = req.query.username;

        model.UserModel.findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            })
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model.UserModel.findUserByCredentials(username, password)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(404).send('No such credentials found');
                }

            })
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];

        model.UserModel.findUserById(userId)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(404).send('No such user found');
                }
            })
    }

    function createUser(req, res) {
        var user = req.body;
        model.UserModel.createUser(user)
            .then(function (user) {
                if(user){
                    res.send(user);
                }else{
                    res.sendStatus(500).send('Could not create user.')
                }
            })

    }

}