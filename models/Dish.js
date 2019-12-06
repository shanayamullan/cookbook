var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({

    name: {type: String,
        required: true},
    cuisine:
    { type: String,
    required: true},
    course:  { type: String,
        required: true},
    price: {type:Integer},
    chef:  { type: String,
        required: true},
    email:  { type: String,
        required: true},
    phone:  { type: String,
        required: true},
    allergens:{ type: Array,
    required:false},
    picture: {type: String,
        required: true}
});

var Dishes = mongoose.model('Dishes', dishSchema);

module.exports = Movie;
