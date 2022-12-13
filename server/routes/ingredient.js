let express = require("express");
let router = express.Router();
const mongoose = require("mongoose")

const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const User = require("../models/user");

router.get("/", async (request, response) => {
  // const body = request.body;

  console.log("navigating to ingredeints");
  const ingredients = await Ingredient.find({});
  // { _id : { $in: body.ingredeints }}

  let errors = [];
  if (ingredients) {
  //   const recipes = Recipe.findById
    return response.status(200).send({
      status: "ok",
      ingredients: ingredients,
    });
  } else {
    errors.push("ingredeints not found");
    return response.status(400).send({ status: "error", errors: errors });
  }

});

router.get("/getRecipes/:ingredients", async (request, response) => {
  const params = request.params;

  console.log("navigating to ingredients + " + params.ingredients);
  // const ingredeints = await Ingredient.find({ _id: { $in: params.ingredeints}});
  const ingredientIds = JSON.parse(params.ingredients)
  // const recipes = await Recipe.find({ ingredients : mongoose.Types.ObjectId(params.ingredient_id) });
  const recipes = await Recipe.find( { ingredients: { $in: ingredientIds}});
  

  // { _id : { $in: body.ingredeints }}

  let errors = [];
  if (recipes) {
  //   const recipes = Recipe.findById
    return response.status(200).send({
      status: "ok",
      recipes: recipes,
    });
  } else {
    errors.push("recipe by ingredeints not found");
    return response.status(400).send({ status: "error", errors: errors });
  }

});
module.exports = router;
