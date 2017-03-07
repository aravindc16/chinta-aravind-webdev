/**
 * Created by aravindchinta on 2/21/17.
 */


module.exports = function (app, model) {
    var users = [
        {_id: "1", username: "alice",   email:'',    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "2", username: "bob",     email:'',    password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "3", username: "charly",  email:'',    password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "4", username: "achinta", email:'',   password: "achinta", firstName: "Aravind",   lastName: "Chinta" }
    ]


    // added the words login and register to differentiate between the two calls
    app.get('/api/user/login/', findUserByCredentials);
    app.get('/api/user/register/', findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.post('/api/user', createUser);
    app.delete('/api/user/:userId', deleteUser);

    function deleteUser(req, res){
        var userId = req.params.userId;

        model.deleteUser(userId)
            .then(function (user) {         //Call if this function is successful.
                res.sendStatus(200);
            }, function () {
                res.sendStatus(400);
            });
    }

    function createUser(req, res){
        var user = req.body;

        //Using the model being sent from the app.js to create a new user when he registers.
        model.createUser(user)
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(500).send('Could not create user' + error);
            });

    }

    function updateUser(req,res){
        var userId = req.params.userId;
        var user = req.body;

        model.updateUser(userId, user)
            .then(function (user) {
                res.send(user);
            },function (err) {
                res.sendStatus(500);
            });

        // for(var u in users){
        //     if(users[u]._id==userId){
        //         users[u].firstName = user.firstName;
        //         users[u].lastName = user.lastName;
        //         users[u].email = user.email;
        //         res.send(users[u]);
        //         return;
        //     }
        // }
    }
    function findUserById(req, res){
        var userId = req.params.userId;
        //DB query
        model.findUserById(userId)
            .then(function (user) {
                res.send(user);
            },
            function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByUsername(req, res){
        var username = req.query.username;

        model.findUserByUsername(username)
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

        model.findUserByCredentials(username,password)
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