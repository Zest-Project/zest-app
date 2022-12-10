// Script to populate the ingredients collection in MongoDB using the Spoonecular API
require('dotenv').config();
const conn = require('../startup/conn');
const fs = require("fs");
const { parse } = require("csv-parse");
const prompt = require('prompt-sync')({sigint: true});
const https = require('https');
const Ingredient = require("../models/ingredient");
const spoonacular_API_Key = '476dcb4698334a3eac8e6ed58579c76b';

let ingredients = [];

function readCSV() {
  fs.createReadStream("./resources/top-1k-ingredients.csv")
  .pipe(parse({ delimiter: ";", from_line: 182 }))
  .on("data", function (row) {
    ingredients.push({
      name: row[0],
      id: row[1]
    });
  })
  .on("end", async function () {
    console.log("- Finished reading CSV file");
    // connect to MongoDB
    try {
      await conn.connectToDatabase();
    } catch (error) {
      conn.handleConnectionError(error);
    }
    console.log('- Connected to MongoDB');

    // iterate through ingredients
    readIngredientByID(0);
    
  })
  .on("error", function (error) {
    console.log(error.message);
  });
}

async function readIngredientByID(index) {
  if (index >= ingredients.length)
    return;

  const exists = await Ingredient.exists({name: ingredients[index].name});
  
  if (!exists) {
    console.log(`\nCurrent Ingredient: ${ingredients[index].name}`);
  
    let skip = '';
    while (skip != 'y' && skip != 'n') {
      skip = prompt('Would you like to skip this ingredient, y or n? ');
    }
  
    if (skip == 'y') {
      readIngredientByID(index+1);
    } else {
      // call Spoonecular to get units available
      https.get(`https://api.spoonacular.com/food/ingredients/${ingredients[index].id}/information?apiKey=${spoonacular_API_Key}&amount=1`, (resp) => {        
        // A chunk of data has been received.
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', async () => {
          let possibleUnits = JSON.parse(data).possibleUnits;
          if (possibleUnits === undefined) {
            console.log("This ingredient is no longer supported by Spoonacular");
            readIngredientByID(index+1);
            return;
          }
          const i = possibleUnits.indexOf('serving');
          if (i !== -1) {
            possibleUnits.splice(index, 1);
          }
          console.log(`Units available: ${possibleUnits}`);
          let unit = '';
          while (!possibleUnits.includes(unit)) {
            unit = prompt('Select a unit? ');
          }
          await readIngredientAndSave(index, unit);
        });
      
      }).on("error", (err) => {
        console.log("Error: ", err.message);
      });
    }
  } else {
    readIngredientByID(index+1);
  }
}

async function readIngredientAndSave(index, unit) {
  https.get(`https://api.spoonacular.com/food/ingredients/${ingredients[index].id}/information?apiKey=${spoonacular_API_Key}&amount=1`, (resp) => {        
        // A chunk of data has been received.
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', async () => {
          let obj = JSON.parse(data);
          obj.name = ingredients[index].name;
          obj.unit = unit;
          const newIngredient = new Ingredient(obj);
          const out = await newIngredient.save();
          if (out)
            console.log(`Saved: ${out.name}`);
          else
            console.log('Failed to save');
            readIngredientByID(index+1);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}

readCSV();
