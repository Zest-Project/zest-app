const jwt = require("../utils/jwt");
var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Recipe = require("../models/recipe");

router.post("/", async (request, response) => {
  if (!request.body) {
    errors.push("no request body");
  }
  const { username, password } = request.body;

  console.log("navigating to login");
  console.log(request.body.username + " " + username + " " + password);

  let errors = [];

  const user = await User.findOne({username: username});
  const recipes = user.recipes;
  const getAllRecipes = await Recipe.find({ });
  getAllRecipes.map((recipe) => {recipes.push(recipe._id)});

  const update_user = await User.findByIdAndUpdate(user._id, {
    recipes: recipes
  });

  if (user && update_user && (await bcrypt.compare(password, user.password))) {
    
    return response.send({
      status: "ok",
      _id: user.id,
      username: user.username,
      token: jwt.signToken(username, user.id)
    });
  } else {
    errors.push("user not found, check username and/or password");
    return response.send({ status: "error", errors: errors });
  }

  // const token = jwt.sign({
  //     username: body.username,
  //     email: body.email,
  // },
  // process.env.JWT_SECRET
  // );
});

module.exports = router;
