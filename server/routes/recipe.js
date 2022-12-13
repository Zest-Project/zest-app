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

// get filtered recipes
router.get("/getFiltered", async (request, response) => {
  let cuisine = request.body.cuisine; // string
  let diet = request.body.diet; // string

  let query = {};
  if (cuisine)
    query.cuisines = cuisine;
  if (diet)
    query.diets = diet;
  
  let recipes = await Recipe.find(query);
  response.send({
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

module.exports = router;
