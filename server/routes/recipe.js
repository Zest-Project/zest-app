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
  console.log("HERE adding recipe: " + request.body.ingredients);

  const { body, user } = request;
  const recipename = body.recipename;
  const cuisineType = body.cuisineType;
  let ingredients = JSON.parse(body.ingredients);
  ingredients = ingredients.map((ingredient) => {
    console.log("addRecipe ingredientid: " + ingredient);
    return mongoose.Types.ObjectId(ingredient)});

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

  // getAllRecipes.map((recipe) => {
  //   if (!userRecipes.indexOf(recipe._id) <= -1) {
  //     userRecipes.push(recipe._id);
  //   }
  // });

  if (recipe) {
    let newCreatedRecipes = user.createdRecipes;
    if (newCreatedRecipes.indexOf(recipe._id <= -1)) {
      newCreatedRecipes.push(recipe._id);
    }
    let userRecipes = user.recipes;
    if (userRecipes.indexOf(recipe._id <= -1)) {
      userRecipes.push(recipe._id);
    }
    const update_user = await User.findByIdAndUpdate(user._id, {
      createdRecipes: newCreatedRecipes,
      recipes: userRecipes
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

router.get("/:search_component", async (request, response) => {
    const user = request.user;
    const params = request.params;

    console.log("navigating to recipes + " + params.search_component);
    const usr = await User.findById(user._id);

    let errors = [];
    if (usr) {
    //   const recipes = Recipe.findById
      let allRecipes;
      if (params.search_component == "createdRecipes") {
        allRecipes = await Recipe.find({ _id : { $in: usr.createdRecipes }});
      }
      else if (params.search_component == "savedRecipes") {
        allRecipes = await Recipe.find({ _id : { $in: usr.savedRecipes }});
      }
      else if (params.search_component == "allRecipes") {
        allRecipes = await Recipe.find({ _id : { $in: usr.recipes }});
      }
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
