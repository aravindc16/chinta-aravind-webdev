/**
 * Created by aravindchinta on 4/6/17.
 */

(function () {
    angular.module('FoodForThoughtApp')
        .controller('DetailsController', DetailsController);

    function DetailsController(FoursquareSearchService, $location, $routeParams) {
        var vm = this;

        vm.id = $routeParams['id'];

        function init() {
            FoursquareSearchService.findRestaurantById(vm.id)
                .then(function (response) {
                    console.log(response);
                    vm.details = response.data.response.venue;

                    var address = vm.details.name;

                    var latitude = vm.details.location.lat;
                    var longitude = vm.details.location.lng;


                    var myLatLng = {lat: latitude, lng: longitude};

                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: myLatLng,
                        zoom: 12
                    });

                    var marker = new google.maps.Marker({
                        map: map,
                        position: myLatLng,
                        title: address
                    });
                }, function (err) {
                    
                });
        }
        init();
    }
})();