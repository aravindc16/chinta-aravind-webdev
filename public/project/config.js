/**
 * Created by aravindchinta on 3/8/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/templates/login.view.client.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html'
            })
    }
})();