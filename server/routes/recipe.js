let express = require("express");
let router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const mongoose = require("mongoose")

const Recipe = require("../models/recipe");
const User = require("../models/user");
const Ingredient = require("../models/ingredient");

const CUISINE_TYPES = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese"
];

const DIETS = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "lowFODMAP",
  "whole30",
  "dairy free"
];

router.get("/getDietOptions", async (request, response) => {
  response.send({
    status: "ok",
    diets: DIETS
  });
});

router.get("/getCuisines", async (request, response) => {
  response.send({
    status: "ok",
    cuisines: CUISINE_TYPES
  });
});

// get all recipes
router.get("/", async (request, response) => {
  // let cuisine = request.body.cuisine; // string
  // let diet = request.body.diet; // string

  let query = {};
  // if (cuisine)
  //   query.cuisines = cuisine;
  // if (diet)
  //   query.diets = diet;
  
  let recipes = await Recipe.find(query);
  response.status(200).send({
    status: "ok",
    recipes: recipes
  });
});

// get filtered recipes
router.put("/getFiltered", async (request, response) => {
  let cuisine = request.body.cuisine; // string
  let diet = request.body.diet; // string

  console.log("cuisine: " + cuisine);
  console.log("diet: " + diet);

  let query = {};
  if (cuisine)
    query.cuisines = cuisine;
  if (diet)
    query.diets = diet;
  
  let recipes = await Recipe.find(query);
  response.status(200).send({
    status: "ok",
    recipes: recipes
  });
});

// get recipe by id
router.get("/findById/:id", async (request, response) => {
  let errors = [];

  let recipe = await Recipe.findById(request.params.id);
  if (!recipe)
    errors.push("recipe not found");
  
  if (errors.length > 0)
    response.send({
      status: "error",
      errors: errors
    });
  else
    response.send({
      status: "ok",
      recipe: recipe
    });
});

async function getIngredientNutrientsForRecipe(recipe) {
  let ingredients = [];

  const promises = recipe.ingredients.map(async ingredient => {
    const obj = await Ingredient.findOne(
      {
        spoonacularId: ingredient.spoonacularId
      }); 
    let index = obj.units.indexOf(ingredient.unit);
    let nutrition = obj.nutrition[index];
    return {
      amount: ingredient.amount,
      nutrients: nutrition.nutrients
    }
  });

  const objs = await Promise.all(promises);

  objs.forEach(obj => {
    ingredients.push(obj);
  });

  return ingredients;
}

// get recipe nutritional data
router.get("/getNutrition/:id", async (request, response) => {
  let errors = [];

  let recipe = await Recipe.findById(request.params.id);
  if (!recipe)
    errors.push("recipe not found");

  if (errors.length == 0) {
    
    let ingredients = await getIngredientNutrientsForRecipe(recipe);
    let out = [];
    ingredients.forEach( ingredient => {
      ingredient.nutrients.forEach((currNutrient) => {
        let index = out.findIndex(entry => {
          return entry.name.normalize() === currNutrient.name.normalize();
        });
  
        if (index < 0) {
          out.push({
            name: currNutrient.name,
            amount: (ingredient.amount / recipe.servings) * currNutrient.amount, 
            unit: currNutrient.unit,
            percentOfDailyNeeds: (ingredient.amount / recipe.servings) * currNutrient.percentOfDailyNeeds
          });
        } else {
          console.log(`${out[index].unit}  ${currNutrient.unit}`);
          out[index].amount += (ingredient.amount / recipe.servings) * currNutrient.amount
          out[index].percentOfDailyNeeds += (ingredient.amount / recipe.servings) * currNutrient.percentOfDailyNeeds;
        }
      });
    });
    
    response.send({
      status: "ok",
      nutrition: out
    });
    
  }

  if (errors.length > 0)
    response.send({
      status: "error",
      errors: errors
    });
});

async function getIngredientCostForRecipe(recipe) {
  let ingredients = [];

  const promises = recipe.ingredients.map(async ingredient => {
    const obj = await Ingredient.findOne(
      {
        spoonacularId: ingredient.spoonacularId
      }); 
    let index = obj.units.indexOf(ingredient.unit);
    let estimatedCost = obj.estimatedCost[index];
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      estimatedCost: estimatedCost
    }
  });

  const objs = await Promise.all(promises);

  objs.forEach(obj => {
    ingredients.push(obj);
  });

  return ingredients;
}

// get recipe cost
router.get("/getRecipeCost/:id", async (request, response) => {
  let errors = [];

  let recipe = await Recipe.findById(request.params.id);
  if (errors.length == 0) {
    let ingredientCosts = await getIngredientCostForRecipe(recipe);
    let totalDollars = 0;
    let totalCents = 0;

    ingredientCosts.forEach(ingredient => {
      if (ingredient.estimatedCost.currency.normalize() === "US Cents") {
        totalCents += ingredient.amount * ingredient.estimatedCost.value;
      } else if (ingredient.estimatedCost.currency.normalize() === "US Cents") {
        totalDollars += ingredient.amount * ingredient.estimatedCost.value;
      }
    });
    
    totalDollars += totalCents / 100;
    
    response.send({
      status: "ok",
      costs: {
        ingredientCost: ingredientCosts,
        totalInDollars: Math.round(totalDollars * 100) / 100
      }
    });
    
  }
});

// get recipes by username
router.get("/findByUsername/:username", async (request, response) => {
  // console.log("endpoint hit");
  let recipes = await Recipe.find(
    {
      creator: request.params.username
    },
    {
      name: 1,
      image: 1,
      servings: 1,
      readyInMinutes: 1,
      cuisines: 1,
      diets: 1,
      ingredients: {
        name: 1
      }
    });
  
  response.send({
    status: "ok",
    recipes: recipes
  });
});

router.post("/", async (request, response) => {
  if (!request.body) {
    errors.push("no request body");
  }
  // console.log(request.body.recipename);

  const { body, user } = request;
  const name = body.name;
  const cuisines= body.cuisines;
  const ingredients = body.ingredients;
  const diets = body.diets;
  const image = body.image;

  // console.log("navigating to recipe");
  // console.log(name + "ingredients: " + JSON.stringify(ingredients));

  let errors = [];
  if (!name || cuisines.length < 1) {
    errors.push("incomplete info");
  }
  if (name.length < 5 || name.length > 50) {
    errors.push("recipename must be between 5 and 50 characters.");
  }
  if (!user) {
    errors.push("no associated user");
  }
  if (errors.length > 0) {
    return response.send({ status: "error", errors: errors });
  }

  const myRecipeCount = await Recipe.countDocuments();
  // console.log("myrecipecount: " + JSON.stringify(myRecipeCount))
  const recipe = await Recipe.create({
    name: name,
    image: image,
    cuisines: cuisines,
    ingredients: ingredients,
    diets: diets,
    creator: user.username,
    spoonacularId: Date.now()
  });

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
        recipename: recipe.name,
        cuisines: recipe.cuisines,
        username: user.username,
      });
    }
  } else {
    errors.push("recipe not created");
    return response.send({ status: "error", errors: errors });
  }
});

module.exports = router;
