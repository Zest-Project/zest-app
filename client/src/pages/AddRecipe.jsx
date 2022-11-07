import React from "react";
import { useContext } from "react";
import { useState } from "react";
import RecipeContext from "../context/RecipeProvider";
import PageTitle from "../components/PageTitle";

const AddRecipe = () => {
  const [recipename, setRecipename] = useState();
  const recipeContext = useContext(RecipeContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipename(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(recipename);
    recipeContext.addRecipe(recipename);
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

        <button className="button" type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
