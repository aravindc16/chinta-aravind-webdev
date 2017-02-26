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
            "findUserByUsername": findUserByUsername
        };

        return api;

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