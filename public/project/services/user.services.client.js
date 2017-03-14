/**
 * Created by aravindchinta on 3/13/17.
 */
(function () {
    angular
        .module('FoodForThoughtApp')
        .factory('UserService', UserService);

    function UserService($http) {
        var users = [
            {firstName: 'Aravind', lastName: 'Chinta', _id:'1', city: 'Boston', email: 'aravindc16@gmail.com', username: 'achinta', password: 'abcd'}
        ];

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "updateUser" : updateUser,
            "findUserByCredentials" : findUserByCredentials,
            "deleteUser": deleteUser
            // "findUserByUsername": findUserByUsername
        };

        return api;

        function deleteUser(userId) {
            for(var u in users){
                if(users[u]._id == userId){
                    users.splice(u,1);
                    return 'success';
                }
            }
            return null;
        }

        function updateUser(userId, newuser) {
            for(var u in users){
                if(users[u]._id == userId){
                    users[u].firstName = newuser.firstName;
                    users[u].lastName = newuser.lastName;
                    users[u].email = newuser.email;
                    users[u].city = newuser.city;
                }
            }
            return angular.copy(users[u]);
        }

        function findUserById(userId) {
            for(var u in users){
                if(users[u]._id == userId){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function createUser(newUser) {
            newUser._id = (new Date()).getTime();
            users.push(newUser);
            return newUser;
        }

        function findUserByCredentials(username, password) {
            // console.log(users);
            for(var u in users){
                if(users[u].username == username && users[u].password == password){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

    }
})();
