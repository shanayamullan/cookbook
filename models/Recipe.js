var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    items: {
        type: String,
        required: true
    },

});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;