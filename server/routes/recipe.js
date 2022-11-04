let express = require("express");
let router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const Recipe = require("../models/recipe");
const User = require("../models/user");

router.post("/", async (request, response) => {
  if (!request.body) {
    errors.push("no request body");
  }
  const { body, user } = request;
  const recipename = body.recipename;

  console.log("navigating to recipe");
  console.log(recipename);

  let errors = [];
  if (await Recipe.exists({ recipename: recipename })) {
    errors.push("recipename exists");
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
    recipename: recipename,
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
        username: user.username,
      });
    }
  } else {
    errors.push("recipe not created");
    return response.send({ status: "error", errors: errors });
  }
});

// router.get("/", async (request, response) => {

//     if (!request.params) {
//       errors.push("no recipe id");
//     }
//     const { recipe_id } = request.params;

//     console.log("navigating to recipe");
//     console.log(recipe_id);

//     let errors = [];
//     if (await Recipe.exists({ recipename: recipename })) {
//       errors.push("recipename exists");
//     }
//     if (recipename.length < 5 || recipename.length > 50) {
//       errors.push("recipename must be between 5 and 50 characters.");
//     }
//     if (errors.length > 0) {
//       return response.send({ status: "error", errors: errors });
//     }

//     const recipe = await Recipe.create({
//       recipename: recipename,
//     });

//     if (recipe) {
//       return response.send({
//         status: "ok",
//         _id: recipe.id,
//         recipename: recipe.recipename,
//       });
//     } else {
//       errors.push("recipe not created");
//       return response.send({ status: "error", errors: errors });
//     }

// });

module.exports = router;
