let express = require("express");
let router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const mongoose = require("mongoose")

const Recipe = require("../models/recipe");
const User = require("../models/user");

router.post("/", async (request, response) => {
  if (!request.body) {
    errors.push("no request body");
  }
  // console.log(request.body.recipename);

  const { body, user } = request;
  const recipename = body.recipename;
  const cuisineType = body.cuisineType;
  const ingredients = body.ingredients.map((ingredient) => mongoose.Types.ObjectId(ingredient));

  console.log("navigating to recipe");
  console.log(recipename + "ingredients: " + JSON.stringify(ingredients));

  let errors = [];
  if (!recipename || !cuisineType) {
    errors.push("incomplete info");
  }
  if (recipename.length < 5 || recipename.length > 50) {
    errors.push("recipename must be between 5 and 50 characters.");
  }
  if (!user) {
    errors.push("no associated user");
  }
  if (errors.length > 0) {
    return response.send({ status: "error", errors: errors });
  }

  const recipe = await Recipe.create({
    recipeName: recipename,
    cuisineType: cuisineType,
    ingredients: ingredients
  });

  if (recipe) {
    const newCreatedRecipes = user.createdRecipes;
    newCreatedRecipes.push(recipe._id);
    const update_user = await User.findByIdAndUpdate(user._id, {
      createdRecipes: newCreatedRecipes,
    });
    if (update_user) {
      return response.send({
        status: "ok",
        _id: recipe.id,
        recipename: recipe.recipename,
        cuisineType: recipe.cuisineType,
        username: user.username,
      });
    }
  } else {
    errors.push("recipe not created");
    return response.send({ status: "error", errors: errors });
  }
});

router.get("/", async (request, response) => {
    const user = request.user;

    console.log("navigating to recipes");
    const usr = await User.findById(user._id);

    let errors = [];
    if (usr) {
    //   const recipes = Recipe.findById
      const allRecipes = await Recipe.find({ _id : { $in: usr.createdRecipes }});
      return response.status(200).send({
        status: "ok",
        recipes: allRecipes,
      });
    } else {
      errors.push("recipes not found");
      return response.status(400).send({ status: "error", errors: errors });
    }

});

// router.get("/getIngredients", async (request, response) => {
//   const user = request.user;
//   const body = request.body;

//   console.log("navigating to recipes/getIngredients");
//   const allRecipes = await Recipe.find({ ingredients : { $in: body.ingredient }});

//   let errors = [];
//   if (allRecipes) {
//   //   const recipes = Recipe.findById
//     return response.status(200).send({
//       status: "ok",
//       recipes: allRecipes,
//     });
//   } else {
//     errors.push("recipes not found");
//     return response.status(400).send({ status: "error", errors: errors });
//   }

// });

module.exports = router;
