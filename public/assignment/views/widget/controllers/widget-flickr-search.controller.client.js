/**
 * Created by aravindchinta on 2/23/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController',FlickrImageSearchController);
    
    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            var promise = FlickrService.searchPhotos(searchText);
            promise.success(function (response) {
                data = response.replace("jsonFlickrApi(","");
                data = data.substring(0,data.length - 1);
                data = JSON.parse(data);
                vm.photos = data.photos;
            })
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var promise = WidgetService.updateWidget(vm.widgetId, {url: url, widgetType: 'IMAGE', width: '100%'});
            promise.success(function (widget) {
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+widget._id);
            })

        }
    }
})();