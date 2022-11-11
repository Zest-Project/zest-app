import React, { createContext, useContext } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
import AuthContext from "./AuthProvider";

const RecipeContext = createContext({
    addRecipe: () => { }
});

const RecipeProvider = ({children}) => {

    const authContext = useContext(AuthContext);
    const token = authContext.token;

    const addRecipe = async (recipename, cuisineType, ingredients) => {
      console.log(JSON.stringify(ingredients));
      await axios.post("/api/recipe", {
        recipename: recipename,
        cuisineType: cuisineType,
        ingredients: ingredients
      }, { headers: { "Authorization": `Bearer ${token}`} })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  
    };

  return (
    <RecipeContext.Provider value={{addRecipe}}>
        {children}
    </RecipeContext.Provider>
  )
}

RecipeProvider.propTypes = {
    children: PropTypes.object
}

export default RecipeContext
export {
    RecipeProvider
}