const mongoose = require("mongoose");
// const unique = require('mongoose-unique-validator')
// const env = require('../startup/config')
//const conn = require("../db/conn").connect('users');
// const { emailRegex } = require('../utils/patterns');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recipes: {
      type: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
        },
      ],
      required: true,
      default: [],
    },
    savedRecipes: {
      type: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
        },
      ],
      required: true,
      default: [],
    },
    createdRecipes: {
      type: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
        },
      ],
      required: true,
      default: [],
    },
    mealslogged: {
      type: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
        },
      ],
      required: true,
      default: [],
    },
  },
  { collection: "users" }
);
// ,{ collection: "user" }

const User = mongoose.model("User", userSchema);
module.exports = User;
