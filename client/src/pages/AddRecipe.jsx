import React from "react";
import { useContext } from "react";
import { useState } from "react";
import RecipeContext from "../context/RecipeProvider";
import PageTitle from "../components/PageTitle";

const defaultValues = {
  recipename: "",
  cuisineType: "",
};

const AddRecipe = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const recipeContext = useContext(RecipeContext);

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
    recipeContext.addRecipe(formValues.recipename, formValues.cuisineType);
}

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

        <button className="button" type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
