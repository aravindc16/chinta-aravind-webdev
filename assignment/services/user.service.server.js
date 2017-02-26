/**
 * Created by aravindchinta on 2/21/17.
 */


module.exports = function (app) {
    var users = [
        {_id: "1", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "2", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "3", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "4", username: "achinta", password: "achinta", firstName: "Aravind",   lastName: "Chinta" }
    ]

    app.get('/api/user/login/', findUserByCredentials);
    app.get('/api/user/register/', findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.post('/api/user', createUser);
    app.delete('/api/user/:userId', deleteUser);

    function deleteUser(req, res){
        var userId = req.params.userId;
        for(var u in users){
            if(users[u]._id == userId){
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
    }

    function createUser(req, res){
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function updateUser(req,res){
        var userId = req.params.userId;
        var user = req.body;
        for(var u in users){
            if(users[u]._id==userId){
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                res.send(users[u]);
                return;
            }
        }
    }
    function findUserById(req, res){
        var userId = req.params.userId;
        var user = users.find(function(user){
            return user._id == userId;
        })
        res.send(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username && password){
            findUserByCredentials(req, res);
        }else if(username){
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        var user = users.find(function (user){
            return user.username == username;
        })
        if(user == undefined){
            res.sendStatus(404);
        }else {
            res.send(user);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;

        var user = users.find(function (user){
            return user.username == username && user.password == password;
        })
        if(user == undefined){
            res.sendStatus(404);
        }else {
            res.send(user);
        }

    }
}