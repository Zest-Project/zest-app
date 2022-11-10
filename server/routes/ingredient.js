let express = require("express");
let router = express.Router();
const mongoose = require("mongoose")

const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const User = require("../models/user");

router.get("/", async (request, response) => {
  // const body = request.body;

  console.log("navigating to ingredeints");
  const ingredeints = await Ingredient.find({});
  // { _id : { $in: body.ingredeints }}

  let errors = [];
  if (ingredeints) {
  //   const recipes = Recipe.findById
    return response.status(200).send({
      status: "ok",
      ingredeints: ingredeints,
    });
  } else {
    errors.push("ingredeints not found");
    return response.status(400).send({ status: "error", errors: errors });
  }

});

router.get("/getRecipes", async (request, response) => {
  const body = request.body;

  console.log("navigating to ingredeints + " + body.ingredient);
  const ingredeints = await Ingredient.find({});
  const recipes = await Recipe.find({ ingredients : mongoose.Types.ObjectId(body.ingredient) });

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
