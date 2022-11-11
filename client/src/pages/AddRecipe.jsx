import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import RecipeContext from "../context/RecipeProvider";
import IngredientContext from "../context/IngredientProvider";

import PageTitle from "../components/PageTitle";

const defaultValues = {
  recipename: "",
  cuisineType: ""
};

const AddRecipe = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const recipeContext = useContext(RecipeContext);
  const ingredientContext = useContext(IngredientContext);
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const getIngredients = async () => {
    await ingredientContext.getIngredients().then((response) => {
      if (response) {
        console.log("response in search explore: " + response.data.ingredients);
        setIngredients(response.data.ingredients);
      }
      else {
        console.log("error");
      }
    })
  }

  useEffect(()=> {
    getIngredients();
  }, [])

  const handleInputChange = (e) => {
    const {name, value} = e.target;
        console.log(e.target.value);
        setFormValues({
            ...formValues,
            [name]: value,
        });;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`recipename: ${formValues.recipename} + cuisineType: ${formValues.cuisineType}`)
    recipeContext.addRecipe(formValues.recipename, formValues.cuisineType, recipeIngredients);
  }

  const handleIngredientSelect = (event) => {
    event.preventDefault;
    // let tempIngredients = recipeIngredients;
    // tempIngredients.push(event.target.value);
    setRecipeIngredients([...recipeIngredients,event.target.value]);
  }

  useEffect(()=> {
    console.log("formvalues: " + JSON.stringify(formValues) + "*****" + recipeIngredients);
  }, [recipeIngredients])

  return (
    <div className="add_recipe container">
      <div className="header">
        <PageTitle pageTitle="Add Recipe" />
      </div>
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <label>
          <p> Recipe Name: </p>
          <input
            type="text"
            className="input"
            name="recipename"
            // placeholder='username'
            onChange={handleInputChange}
          />
        </label>

        <label>
          <p> Cuisine Type: </p>
          <input
            type="text"
            className="input"
            name="cuisineType"
            // placeholder='username'
            onChange={handleInputChange}
          />
        </label>

        <select
              /*
            // here we create a basic select input
            // we set the value to the selected value
            // and update the setFilterParam() state every time onChange is called
            */
              onChange={handleIngredientSelect}
              className="custom_select"
              aria-label="Filter Recipes By Ingredients"
              name="ingredients"
            >
              <option value="All">Filter By Ingredients</option>
              {ingredients.map((ingredient) => {
                return <option value={ingredient._id} key={ingredient._id}>{ingredient.ingredientName}</option>
              })}
            </select>

        <button className="button" type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
