const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator')
const env = require('../utils/env')
const conn = require("../db/conn").connect('users');
const { emailRegex } = require('../utils/patterns');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        minLength: 5,
        maxLength: 50,
        reuired: true,
    },
    profilePicture: {
        type: String,
    },
    email: {
        type: String,
        match: emailRegex,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    recipes: {
        type: [{
            id: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            }
          }],
          required: true,
          default: []
    },
    savedRecipes: {
        type: [{
            id: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            }
          }],
          required: true,
          default: []    
    },
    createdRecipes: {
        type: [{
            id: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            }
          }],
          required: true,
          default: []    
    },
    // name of meal: String
    // serving size
    // serving name
    // numServings
    mealslogged: {
      type: [{
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          
        }],
        required: true,
        default: []    
  }
});

userSchema.plugin(unique);

// https://stackoverflow.com/questions/9952649/convert-mongoose-docs-to-json
userSchema.set('toJSON', {
    transform: (doc, object) => {
      object.id = object._id.toString();
      //   object.verified = 'verification' in object ? false : true;
  
      delete object.passwordHash;
      delete object._id;
      delete object.__v;
    }
  });

  const User = conn.model(env.DB_USER, userSchema);
  module.exports = User;