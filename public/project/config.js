/**
 * Created by aravindchinta on 3/8/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/landing/templates/landing.view.client.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html'
            })
            .when('/signup', {
                templateUrl: 'views/user/templates/signup.view.client.html'
            })
    }
})();