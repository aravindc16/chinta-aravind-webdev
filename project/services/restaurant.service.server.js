/**
 * Created by aravindchinta on 4/13/17.
 */
module.exports = function (app, model) {
    app.post('/api/project/restaurant/order', placeOrder);
    app.get('/api/project/restaurant/order/bill/:billId', findOrderByBillId);

    function findOrderByBillId(req, res) {
        var billId = req.params['billId'];

        model.RestaurantModel.findOrderByBillId(billId)
            .then(function (order) {
                res.send(order)
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function placeOrder(req, res) {

        var order = req.body;

        model.RestaurantModel.placeOrder(order)
            .then(function (order) {
                if(order){
                    res.send(order);

                }else{
                    res.sendStatus(500);
                }

            });

    }
}
