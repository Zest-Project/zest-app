// const jwt = require("jsonwebtoken");
let express = require("express");
let router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const User = require("../models/user");
const Recipe = require("../models/recipe");
const { default: mongoose } = require("mongoose");

router.post("/", async (request, response) => {
  if (!request.body) {
    errors.push("no request body");
  }
  const { username, email, password } = request.body;

  console.log("navigating to signup");
  console.log(username + " " + email + " " + password);

  let errors = [];
  if (await User.exists({ username: username })) {
    errors.push("username exists");
  }
  if (username.length < 5 || username.length > 50) {
    errors.push("username must be between 5 and 50 characters.");
  }
  if (await User.exists({ email: email })) {
    errors.push("email exists");
  }
  if (errors.length > 0) {
    return response.send({ status: "error", errors: errors });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  // console.log("here in signup all recipes " + getAllRecipes.map((recipe) => recipe._id));

  const user = await User.create({
    username: username,
    email: email,
    password: hashed_password,
    // recipes: tempids
  });

  const recipes = user.recipes;
  const getAllRecipes = await Recipe.find({ });
  getAllRecipes.map((recipe) => {recipes.push(recipe._id)});

  const update_user = await User.findByIdAndUpdate(user._id, {
    recipes: recipes
  });


  if (user && update_user) {
    return response.send({
      status: "ok",
      _id: user.id,
      username: user.username,
      token: jwt.signToken(user.username, user.id),
    });
  } else {
    errors.push("user not created");
    return response.send({ status: "error", errors: errors });
  }

  // const token = jwt.sign({
  //     username: body.username,
  //     email: body.email,
  // },
  // process.env.JWT_SECRET
  // );
});

// router.get("/", (request, response) => {
//     User.findOne({username: "priyanka"}, function (err, data) {if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Result : ", data);
//     }})

// });

module.exports = router;
