/**
 * Created by aravindchinta on 3/8/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'views/user/admin/templates/admin-profile.view.client.html'
                // controller: 'landingController',
                // controllerAs: 'model'
            })
            .when('/signup', {
                templateUrl: 'views/user/templates/signup.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:uid', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:uid/edit', {
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileEditController',
                controllerAs: 'model'
            })
            .when('/:uid', {
                templateUrl: 'views/landing/templates/landing.view.client.html',
                controller: 'landingController',
                controllerAs: 'model'
            })

    }
})();