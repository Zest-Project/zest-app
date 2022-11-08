const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
        unique: true
    },
}, 
{collection: "ingredients"});

const ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = ingredient;