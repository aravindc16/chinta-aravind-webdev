/**
 * Created by aravindchinta on 4/13/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .controller('resturantController', resturantController);

    function resturantController($routeParams,FoursquareSearchService, UserService, RestaurantService, $location, $mdDialog) {
        var vm = this;

        vm.restId = $routeParams['id'];
        vm.billId = $routeParams['billId'];

        var user = {};
        vm.list = [];
        var restName = {};

        function init() {

            UserService.findCurrentLoggedInUser()
                .then(function (response) {
                    user = response.data;
                    vm.user = user;
                })

            FoursquareSearchService.findRestaurantById(vm.restId)
                .then(function (response) {
                    vm.restaurantName = response.data.response.venue.name;
                    restName = response.data.response.venue.name;
                })

            FoursquareSearchService.findMenuForRestaurant(vm.restId)
                .then(function (response) {
                    if(response.data.response.menu.menus.count == 0){
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Menu error!")
                                .textContent("This restaurant doesn't have an online menu. Please check back sooner.")
                                .ok("OK"));
                        $location.url('/details/'+vm.restId+'/user/'+user._id);
                    }else{
                        // console.log(response.data.response.menu.menus.items[0].entries.items[0].entries.items);
                        vm.menu = response.data.response.menu.menus.items[0].entries.items[0].entries.items;
                    }
                });

            if(vm.billId){
                RestaurantService.findOrderByBillId(vm.billId)
                    .then(function (response) {
                        vm.bill = response.data;
                    })
            }


        }
        init();
        vm.placeOrder = placeOrder;
        vm.addList = addList;



        function addList(item, list){
            var idx = list.indexOf(item);
            if(idx > -1){
                list.splice(idx, 1);
            }else {
                list.push(item);
            }


        }

        function placeOrder(order) {
            order.name = user.firstName;
            order.userId = user._id;
            order.restId = vm.restId;
            order.restName = restName;

            if(order.phone && order.name){

                if(order.phone.length != 10){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title("Phone Error!")
                            .textContent("Please enter a valid phone number.")
                            .ok("OK"));
                }else{
                    if(vm.list.length == 0){
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Items Error!")
                                .textContent("You must choose the items that you want to order!.")
                                .ok("OK"));
                    }else{
                        RestaurantService.placeOrder(order, vm.list)
                            .then(function (response) {
                                if(response){
                                    $mdDialog.show(
                                        $mdDialog.alert()
                                            .clickOutsideToClose(true)
                                            .title("Order Success!")
                                            .textContent("Thank you for placing your order with "+restName+
                                                ". Your bill amount is $"+response.data.total+". Please have it ready when you come for pickup.")
                                            .ok("OK"));
                                    $location.url('/restaurant/'+vm.restId+'/bill/'+response.data._id);
                                }
                            });
                    }

                }


            }else{
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Order Error!")
                        .textContent("Please enter both your name and phone.")
                        .ok("OK"));
            }



        }


    }
})();