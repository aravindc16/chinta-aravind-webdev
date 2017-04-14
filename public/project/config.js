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
                templateUrl: 'views/admin/templates/admin-profile.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    adminUser: checkAdmin
                }

            })
            .when('/signup', {
                templateUrl: 'views/user/templates/signup.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
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
            .when('/restaurant/:id/order', {
                templateUrl: 'views/restaurant/templates/restaurant.view.client.html',
                controller:'resturantController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkUserLogIn
                }
            })
            .when('/restaurant/:id/bill/:billId', {
                templateUrl: 'views/restaurant/templates/bill.view.client.html',
                controller:'resturantController',
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
                if(response.data != '0'){
                    d.resolve(response.data);

                } else {
                    d.reject();
                    $location.url('/login');
                }
            });
        return d.promise;
    }

    function checkAdmin(UserService, $q, $location, $http) {
        var d = $q.defer();
        UserService.checkAdmin()
            .then(function (response) {
                if(response.data != '0'){
                    d.resolve(response.data);

                } else {
                    d.reject();
                    $location.url('/user');
                }
            });
        return d.promise;
    }

})();