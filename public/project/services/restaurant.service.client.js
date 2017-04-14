/**
 * Created by aravindchinta on 4/13/17.
 */
(function () {
    angular.module('FoodForThoughtApp')
        .factory('RestaurantService', RestaurantService);

    function RestaurantService($http) {
        var api = {
            "placeOrder": placeOrder,
            "findOrderByBillId": findOrderByBillId
        };

        return api;

        function findOrderByBillId(billId) {
            return $http.get('/api/project/restaurant/order/bill/'+billId);
        }
        
        function placeOrder(order, list) {
            var finalOrder = {
                'name': order.name,
                'phone': order.phone,
                'order': []
            };

            finalOrder.order.push(list);
            return $http.post('/api/project/restaurant/order', finalOrder);
        }

    }
})();
