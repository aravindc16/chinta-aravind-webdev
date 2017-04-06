/**
 * Created by aravindchinta on 3/13/17.
 */
(function () {
    angular
        .module('FoodForThoughtApp')
        .factory('FoursquareSearchService', FoursquareSearchService);

    function FoursquareSearchService($http) {
        var api = {
            'findRestaurantsByPlaceAndCity': findRestaurantsByPlaceAndCity
        };

        return api;



        function findRestaurantsByPlaceAndCity(place, city) {

            var url = "https://api.foursquare.com/v2/venues/search?TERM&client_id=5OCQBYEE3PJRCWZJKQN1ETDIDIW32WRBFRJH33N2PPOFNEO1&client_secret=WGPOYKK1TG1UGIF45MB4MINNJ344DN1KOS4HNWBXUJ4OUZNE&v=20170405";
            var finalUrl = url.replace('TERM', "near="+city+"&query="+place+"&category=4d4b7105d754a06374d81259");
            return $http.get(finalUrl);
        }
    }
})();