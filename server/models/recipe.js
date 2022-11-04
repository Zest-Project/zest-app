const mongoose = require('mongoose');
// const unique = require('mongoose-unique-validator')
// const env = require('../startup/config')
//const conn = require("../db/conn").connect('recipes');
// const { emailRegex } = require('../utils/patterns');

const recipeSchema = new mongoose.Schema({
    recipename: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
        unique: true
    }
}, 
{collection: "recipes"});
// ,{ collection: "recipe" }




  const recipe = mongoose.model("recipe", recipeSchema);
  module.exports = recipe;