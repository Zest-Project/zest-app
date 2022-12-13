const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    amount: Number,
    image: String,
    units: [String],
    estimatedCost: [{
        value: Number,
        currency: String,
        unit: String
    }],
    nutrition: [{
        unit: String,
        nutrients: [{
            name: String,
            amount: Number,
            unit: String,
            percentOfDailyNeeds: Number
        }],
    }],
    spoonacularId: {type: Number, required: true}
  },
  { collection: "ingredients" }
);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;