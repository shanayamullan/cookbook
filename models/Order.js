var mongoose = require('mongoose');
var Dish= require('./Dish');

var orderSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    }
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;