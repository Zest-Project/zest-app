import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import RecipeContext from "../context/RecipeProvider";
import IngredientContext from "../context/IngredientProvider";
import UnstyledSelectForm from "../components/UnstyledSelectForm";

import PageTitle from "../components/PageTitle";
import UserContext from "../context/UserProvider";

const defaultValues = {
  recipename: "",
  cuisineType: "",
};

const AddRecipe = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const recipeContext = useContext(RecipeContext);
  const ingredientContext = useContext(IngredientContext);
  const [selectedIngredient, setSelectedIngredient] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const userContext = useContext(UserContext);
  const [cuisineTypes, setCuisineTypes] = useState([]); // get cuisinetypes
  const [selectedCuisineType, setSelectedCuisineType] = useState();

  const getCuisineTypes = async () => {
    await userContext.getRecipes("allRecipes").then((response) => {
      if (response) {
        const recipes = response.data.recipes
        console.log("response in search explore: " + recipes);
        // setRecipes(response.data.recipes);
        if (recipes) {
          let tempCuisineTypes = recipes.map((recipe) => recipe.cuisineType)
          setCuisineTypes([...new Set(tempCuisineTypes)]);
        }
      }
      else {
        console.log("error");
      }
    })
  }

  const getIngredients = async () => {
    await ingredientContext.getIngredients().then((response) => {
      if (response) {
        console.log("response in search explore: " + response.data.ingredients);
        setIngredients(response.data.ingredients);
      } else {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    getIngredients();
    getCuisineTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `recipename: ${formValues.recipename} + cuisineType: ${formValues.cuisineType}`
    );
    recipeContext.addRecipe(
      formValues.recipename,
      formValues.cuisineType,
      recipeIngredients
    );
  };

  const handleIngredientSelect = (selectedIngredientFromDropdown) => {
    // event.preventDefault;
    // let tempIngredients = recipeIngredients;
    // tempIngredients.push(event.target.value);
    // const value = event.target.value
    // console.log("AAAAAAAAAAAAHHH **** " + JSON.stringify(selectedIngredientFromDropdown));
    setSelectedIngredient(selectedIngredientFromDropdown);
    setRecipeIngredients([
      ...recipeIngredients,
      selectedIngredientFromDropdown,
    ]);
  };

  const handleCuisineTypeSelected = (selectedCuisineTypeFromDropdown) => {
    // event.preventDefault;
    // let tempIngredients = recipeIngredients;
    // tempIngredients.push(event.target.value);
    // const value = event.target.value
    // console.log("AAAAAAAAAAAAHHH **** " + JSON.stringify(selectedIngredientFromDropdown));
    setSelectedCuisineType(selectedCuisineTypeFromDropdown.name);
    // setRecipeIngredients([
    //   ...recipeIngredients,
    //   selectedIngredientFromDropdown,
    // ]);
    if ( selectedCuisineTypeFromDropdown.name.toLowerCase() ) {
      setFormValues({
        ...formValues,
        cuisineType: selectedCuisineTypeFromDropdown.name,
      });
    }
  };

  useEffect(() => {
    console.log(
      "formvalues: " +
        JSON.stringify(formValues) +
        " ***** " +
        JSON.stringify(recipeIngredients)
    );
  }, [recipeIngredients]);

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


        <div className="custom_select">
          <p> Ingredients: </p>
          <UnstyledSelectForm
            values={ingredients}
            handleSelected={handleIngredientSelect}
            selected={selectedIngredient}
          />

          { recipeIngredients && recipeIngredients.map((ingredient) => (
            <div> {ingredient.name} </div>
          ))}
        </div>

        <div className="custom_select">
          <p> CuisineType: </p>
          <UnstyledSelectForm
            values={cuisineTypes.map((cuisineType) => JSON.parse(`{"name": "${cuisineType}"}`))}
            handleSelected={handleCuisineTypeSelected}
            selected={selectedCuisineType}
          />

          { selectedCuisineType && 
            <div> {selectedCuisineType} </div>
          }
        </div>
        <div>
          <p> Can't find your Cuisine Type, add one here: </p>
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
        </div>
        

        <button className="button" type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
