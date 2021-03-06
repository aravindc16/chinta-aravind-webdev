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
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername,
            "addFavoriteRestaurant":addFavoriteRestaurant,
            'deleteFavoriteRestaurant':deleteFavoriteRestaurant,
            "followUser": followUser,
            "unFollowUser": unFollowUser,
            "login": login,
            "logout": logout,
            "registerUser": registerUser,
            "loggedIn": loggedIn,
            "findCurrentLoggedInUser": findCurrentLoggedInUser,
            "checkAdmin": checkAdmin,
            "findAllUsers": findAllUsers,
            "removeUser": removeUser,
            "checkManager": checkManager,
            "removeFavorite": removeFavorite,
            "createUserByAdmin": createUserByAdmin
        };

        return api;

        function createUserByAdmin(user) {
            return $http.post('/api/project/admin/create/user', user);
        }

        function removeFavorite(user, fav) {
            return $http.put('/api/project/admin/favorite/delete/'+user._id, fav);
        }


        function checkManager() {
            return $http.post('/api/project/checkManager');
        }

        function removeUser(user) {
            return $http.delete('/api/project/admin/user/'+user._id);
        }

        function findAllUsers() {
            return $http.get('/api/project/admin/users');
        }
        
        function checkAdmin() {
            return $http.post('/api/project/checkAdmin');
        }

        function findCurrentLoggedInUser() {
            return $http.get('/api/project/findCurrentLoggedInUser');
        }

        function loggedIn() {
            return $http.post('/api/project/checkUserLogIn');
        }

        function registerUser(user) {
            return $http.post('/api/project/registerUser',user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function login(user) {
            return $http.post('/api/project/login', user);
        }

        function unFollowUser(userId, user) {
            return $http.put('/api/project/unfollow/'+userId, user);
        }

        function followUser(userId, user) {
            return $http.put('/api/project/follow/'+userId, user);
        }

        function deleteFavoriteRestaurant(userId, restaurant) {
            return $http.put('/api/project/restaurant/favorite/delete/'+userId, restaurant);
        }

        function addFavoriteRestaurant(userId, restaurant) {
            return $http.put('/api/project/restaurant/favorite/'+userId, restaurant);
        }

        function findUserByUsername(username) {
            return $http.get('/api/project/username?username='+username);
        }

        function deleteUser(userId) {
            return $http.delete('/api/project/user/'+userId);
        }

        function updateUser(userId, newuser) {
            return $http.put('/api/project/user/'+userId, newuser);
        }

        function findUserById(userId) {

            return $http.get('/api/project/user/'+userId);
        }

        function createUser(newUser) {

            return $http.post('/api/project/register', newUser);

        }

        function findUserByCredentials(username, password) {

            return $http.get('/api/project/user?username='+username+"&password="+password);
        }
    }
})();
