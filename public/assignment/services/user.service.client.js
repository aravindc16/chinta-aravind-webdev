/**
 * Created by aravindchinta on 2/6/17.
 */
(function(){
    angular.module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService($http){

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "updateUser" : updateUser,
            "findUserByCredentials" : findUserByCredentials,
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername,
            'login': login,
            'loggedIn': loggedIn,
            'logout': logout,
            'registerUser': registerUser,
            'findCurrentUser': findCurrentUser
        };

        return api;

        function findCurrentUser() {
            return $http.get('/api/user');
        }
        
        function registerUser(user) {
            return $http.post('/api/register', user);
        }

        function logout() {
            return $http.post('/api/logout');
        }

        function loggedIn() {
            return $http.post('/api/loggedIn');
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function findUserByUsername(username){
            return $http.get('/api/user/register?username='+username);
        }

        function deleteUser(userId){
            return $http.delete('/api/user/'+userId);
        }

        function createUser(user){
            return $http.post('/api/user', user);
        }

        function updateUser(userId, user){
            return $http.put('/api/user/'+userId ,user);
        }

        function findUserByCredentials(username, password){
           return $http.get('/api/user/login?username='+username+'&password='+password);
        }

        function findUserById(userId){
            return $http.get('/api/user/'+userId);

        }
    }
})();