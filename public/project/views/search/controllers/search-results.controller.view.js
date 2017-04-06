(function () {
    angular.module('FoodForThoughtApp')
        .controller('SearchResultsController', SearchResultsController);

    function SearchResultsController(FoursquareSearchService, $routeParams, $location) {
        var vm = this;
        vm.name = $routeParams['name'];
        vm.city = $routeParams['city'];

        function init(){
            FoursquareSearchService.findRestaurantsByPlaceAndCity(vm.name, vm.city)
                .then(function (response) {

                    vm.results = response.data.response.venues
                }, function (err) {
                    console.log(err);
                });
        }
        init();
    }
})();