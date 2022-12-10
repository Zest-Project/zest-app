const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true},
    unit: String,
    estimatedCost: {
        value: Number,
        unit: String
    },
    image: String,
    nutrition: {
        nutrients: [{
            name: String,
            amount: Number,
            unit: String,
            percentOfDailyNeeds: Number
        }],
        caloricBreakdown: {
            percentProtein: Number,
            percentFat: Number,
            percentCarbs: Number
        }
    }
  },
  { collection: "ingredients" }
);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;