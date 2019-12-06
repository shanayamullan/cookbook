var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var dishSchema = new mongoose.Schema({

    name: 
    {type: String, required: false},
    cuisine:
    { type: String,required: false},
    course: 
     { type: String, required: false},
    price: 
    {type:Number, required: false},
    chef:  
    { type: String, required: false},
    email: 
     { type: String, required: false},
    phone: 
     { type: String, required: false},
    allergens:
    { type: Array, required:false},
    picture: 
    {type: String, required: false},
   
});

var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
