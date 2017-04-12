/**
 * Created by aravindchinta on 3/8/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/landing/templates/landing.view.client.html',
                controller: 'landingController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/searchResults/:name/location/:city/', {
                templateUrl: 'views/search/templates/search-results.view.client.html',
                controller: 'SearchResultsController',
                controllerAs: 'model'
            })
            .when('/searchResults/:name/location/:city/user/:uid', {
                templateUrl: 'views/search/templates/search-results.view.client.html',
                controller: 'SearchResultsController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
            })
            .when('/details/:id', {
                templateUrl: 'views/search/templates/details.view.client.html',
                controller: 'DetailsController',
                controllerAs: 'model'
            })
            .when('/details/:id/user/:uid', {
                templateUrl: 'views/search/templates/details.view.client.html',
                controller: 'DetailsController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
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
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
            })
            .when('/user/:uid/edit', {
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileEditController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
            })
            .when('/:uid', {
                templateUrl: 'views/landing/templates/landing.view.client.html',
                controller: 'landingController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
            })

    }

    function checkUserLogIn(UserService, $q, $location, $http) {
        var d = $q.defer();
        // UserService.loggedIn()
        $http.post('/api/project/checkUserLogIn')
            .then(function (response) {
                console.log(response.data);
                if(response.data != '0'){
                    d.resolve(response.data);

                } else {
                    d.reject();
                    $location.url('/login');
                }
            });
        return d.promise;
    }
})();