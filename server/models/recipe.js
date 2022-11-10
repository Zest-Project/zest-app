const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
        // unique: true
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
        // unique: true
    },
    prepTime: {
        type: Number,
    },
    cookTime: {
        type: Number,
    },
    yield: {
        type: Number,
    },
    instructions: {
        type: [String],
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
    },
    cuisineType: {
        type: String,
        unique: true,
    },
    ingredients: {
        type: [mongoose.Types.ObjectId],
    }
}, 
{collection: "recipes"});
// ,{ collection: "recipe" }

const recipe = mongoose.model("recipe", recipeSchema);
module.exports = recipe;