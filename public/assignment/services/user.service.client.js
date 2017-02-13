/**
 * Created by aravindchinta on 2/6/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService(){
        var users = [
            {_id: "1", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "2", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "3", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "4", username: "achinta", password: "achinta", firstName: "Aravind",   lastName: "Chinta" }
        ]
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "updateUser" : updateUser,
            "findUserByCredentials" : findUserByCredentials,
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername
        };

        return api;

        function findUserByUsername(username){
            for(var u in users){
                if(users[u].username == username){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function deleteUser(userId){
            for(var u in users){
                if(users[u]._id == userId){
                    users.splice(u, 1);
                }
            }
        }

        function createUser(user){
            user._id = (new Date()).getTime();
            users.push(user);
            return user._id;
        }

        function updateUser(userId, user){
            for(var u in users){
                if(users[u]._id==userId){
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for(var u in users){
                if(users[u].username == username && users[u].password == password){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserById(userId){
            for(var u in users){
                if(users[u]._id == userId){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }
    }
})();