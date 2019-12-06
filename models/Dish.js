var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({

    name: 
    {type: String,
        required: true},
    cuisine:
    { type: String,
    required: true},
    course: 
     { type: String,
        required: true},
    price: 
    {type:Number},
    chef:  { type: String,
        required: true},
    email:  { type: String,
        required: true},
    phone:  { type: String,
        required: true},
    allergens:{ type: Array,
    required:false},
    picture: {type: String,
        required: true},
    dishId:{type:Number},
});

var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
