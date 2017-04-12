(function () {
    angular.module('FoodForThoughtApp')
        .controller('SearchResultsController', SearchResultsController);

    function SearchResultsController(FoursquareSearchService, UserService, $routeParams, $location) {
        var vm = this;
        vm.name = $routeParams['name'];
        vm.city = $routeParams['city'];
        vm.userId = $routeParams['uid'];

        function init(){

            UserService.findUserById(vm.userId)
                .then(function (response) {
                    vm.user= response.data;
                    user = vm.user;
                });

            FoursquareSearchService.findRestaurantsByPlaceAndCity(vm.name, vm.city)
                .then(function (response) {
                    vm.results = response.data.response.groups[0].items;
                }, function (err) {
                    console.log(err);
                });
        }
        init();

        vm.getRestaurantDetails = getRestaurantDetails;
        vm.logout = logout;

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url('/');
                });
        }

        function getRestaurantDetails(id) {
            if(vm.userId){
                $location.url('/details/'+id+"/user/"+vm.userId);
            }else{
                $location.url('/details/'+id);
            }
        }
    }
})();