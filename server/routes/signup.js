// const jwt = require("jsonwebtoken");
let express = require("express");
let router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const User = require("../models/user");
const Recipe = require("../models/recipe");

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

  let getAllRecipes = await Recipe.find({ });
  getAllRecipes.map((recipe) => recipe.id);
  console.log(getAllRecipes);

  const user = await User.create({
    username: username,
    email: email,
    password: hashed_password,
    recipes: getAllRecipes
  });

  if (user) {
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
