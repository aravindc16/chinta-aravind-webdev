/**
 * Created by aravindchinta on 2/23/17.
 */

(function () {
    angular
        .module('WebAppMaker')
        .factory('FlickrService', FlickrService);

    var key = '43030980bd936472c043fd07829d3802';
    var secret = 'ac55b9b00d3a7db6';
    var urlBase = 'https://api.flickr.com/services/rest/?\ ' +
        'method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

    function FlickrService($http) {
        var api = {
            'searchPhotos': searchPhotos
        }

        return api;

        function searchPhotos(searchText) {
            var url = urlBase
                .replace('API_KEY', key)
                .replace('TEXT', searchText);
            return $http.get(url);
        }
    }
})();