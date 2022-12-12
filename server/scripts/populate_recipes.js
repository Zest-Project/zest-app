require('dotenv').config();
const conn = require('../startup/conn');
const prompt = require('prompt-sync')({sigint: true});
const https = require('https');
const Ingredient = require("../models/ingredient");
const Recipe = require("../models/recipe");
const { cpuUsage } = require('process');

const spoonacular_API_Key = 'f69e9e6bf8d34f55b29f197f937723a7';
const number = 20;
const offset = 20;
let results;
let units;

https.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacular_API_Key}&query=a&number=${number}&offset=${offset}`, (resp) => {        
        // A chunk of data has been received.
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', async () => {

          try {
            await conn.connectToDatabase();
          } catch (error) {
            conn.handleConnectionError(error);
          }
            
          console.log('- Connected to MongoDB\n');
          results = JSON.parse(data).results;
          if (results === undefined) {
            console.log("No recipes were found");
            return;
          }
    
          units = new Map();
          processResult(0);
          //addRecipe(1);
        });
      
      }).on("error", (err) => {
        console.log("Error: ", err.message);
      });

function processResult(currRecipe) {
    if (currRecipe >= results.length)
        return;

    console.log(`\nCurrent recipe: ${results[currRecipe].title}`);
    let skip = '';
    while (skip != 'y' && skip != 'n') {
      skip = prompt('Would you like to add this recipe to the database, y or n? ');
    }

    if (skip == 'y') {
        https.get(`https://api.spoonacular.com/recipes/${results[currRecipe].id}/information?apiKey=${spoonacular_API_Key}`, (resp) => {        
            // A chunk of data has been received.
            let data = '';
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', async () => {
              let recipeTemp = JSON.parse(data);

              if (recipeTemp === undefined) {
                console.log("Recipe not found");
                return;
              }

              let ingredientData = [];
              recipeTemp.extendedIngredients.forEach( ingredient => {
                ingredientData.push({
                    id: ingredient.id,
                    unit: ingredient.unit,
                    name: ingredient.name
                });
              });
              
              console.log("Ingredients:");
              await getIngredient(ingredientData, 0, currRecipe);
            });
          
          }).on("error", (err) => {
            console.log("Error: ", err.message);
          });
    } else {
        processResult(currRecipe+1);
    }
}

async function getIngredient(ingredientData, currIngredient, currRecipe) {
    if (currIngredient >= ingredientData.length) {
        await addRecipe(currRecipe);
        return;
    }

    if (ingredientData[currIngredient].unit === undefined) {
        console.log("Recipe was not added due insufficient information");
        processResult(currRecipe+1);
        return;
    }

    https.get(`https://api.spoonacular.com/food/ingredients/${ingredientData[currIngredient].id}/information?apiKey=${spoonacular_API_Key}&amount=1`, (resp) => {        
            // A chunk of data has been received.
            let data = '';
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', async () => {
              let parsedData = JSON.parse(data);
              
              if (parsedData === undefined) {
                console.log("    Ingredient not found");
                console.log(parsedData);
                return;
              }
              console.log(`  - name: ${ingredientData[currIngredient].name}`);
              console.log(`    unit in recipe: ${ingredientData[currIngredient].unit}`);
              console.log(`    units available: ${parsedData.possibleUnits}`);

              let unit = prompt('    select unit: ');

              if (unit === "abort") {
                console.log("Recipe not added");
                processResult(currRecipe+1);
                return;
              }

              units.set(ingredientData[currIngredient].id, unit);
              if (!await Ingredient.exists({spoonacularId: ingredientData[currIngredient].id, units: unit}))
                addIngredient(ingredientData, currIngredient, currRecipe, unit);
              else
                await getIngredient(ingredientData, currIngredient+1, currRecipe);
            });
          
          }).on("error", (err) => {
            console.log("Error: ", err.message);
          });
}

function addIngredient(ingredientData, currIngredient, currRecipe, unit) {
    https.get(`https://api.spoonacular.com/food/ingredients/${ingredientData[currIngredient].id}/information?apiKey=${spoonacular_API_Key}&unit=${unit}&amount=1`, (resp) => {        
        // A chunk of data has been received.
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', async () => {
          let parsedData = JSON.parse(data);

          let ingredient = await Ingredient.findOne({spoonacularId: ingredientData[currIngredient].id});
          
          if (!ingredient) {
            ingredient = {
                name: ingredientData[currIngredient].name,
                amount: 1,
                image: parsedData.image,
                units: [unit],
                estimatedCost: [{
                    value: parsedData.estimatedCost.value,
                    currency: parsedData.estimatedCost.unit,
                    unit: unit    
                }],
                nutrition: [{
                    unit: unit,
                    nutrients: parsedData.nutrition.nutrients
                }],
                spoonacularId: ingredientData[currIngredient].id
              };
              await Ingredient.create(ingredient);
          } else {
            ingredient.units.push(unit);
            ingredient.estimatedCost.push({
                value: parsedData.estimatedCost.value,
                currency: parsedData.estimatedCost.unit,
                unit: unit
            });
            ingredient.nutrition.push({
                unit: unit,
                nutrients: parsedData.nutrition.nutrients
            });
            
            await ingredient.save();
          }

          if (currIngredient+1 < ingredientData.length)
            await getIngredient(ingredientData, currIngredient+1, currRecipe);

          if (currIngredient+1 == ingredientData.length) {
            console.log("adding...");
            await addRecipe(currRecipe);
          }
        });
      
      }).on("error", (err) => {
        console.log("Error: ", err.message);
      });
}

async function addRecipe(currRecipe) {
    https.get(`https://api.spoonacular.com/recipes/${results[currRecipe].id}/information?apiKey=${spoonacular_API_Key}`, (resp) => {        
        // A chunk of data has been received.
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', async () => {
          let parsedData = JSON.parse(data);
          //console.log(parsedData.title);
          let recipe = {
            name: parsedData.title,
            creator: "Zest",
            image: parsedData.image,
            imageType: parsedData.imageType,
            servings: parsedData.servings,
            readyInMinutes: parsedData.readyInMinutes,
            cuisines: parsedData.cuisines,
            diets: parsedData.diets,
            ingredients: [],
            instructions: [],
            spoonacularId: parsedData.id
          }

          parsedData.extendedIngredients.forEach(ingredient => {
            // console.log(ingredient.name);
            // unit = prompt('unit: ');
            recipe.ingredients.push({
                spoonacularId: ingredient.id,
                name: ingredient.name,
                amount: ingredient.amount,
                unit: units.get(ingredient.id)
                //unit: unit
            });
          });

          parsedData.analyzedInstructions.forEach(instruction => {
            let steps = [];
            instruction.steps.forEach(step => {
                steps.push({
                    number: step.number,
                    step: step.step
                });
            });
            recipe.instructions.push({
                name: instruction.name,
                steps: steps
            });
          });

          await Recipe.create(recipe);
          console.log("Recipe was created");
          processResult(currRecipe+1);
        });
      
      }).on("error", (err) => {
        console.log("Error: ", err.message);
      });
}


