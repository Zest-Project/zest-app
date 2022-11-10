import React, { createContext, useContext } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
import AuthContext from "./AuthProvider";

const IngredientContext = createContext({
    addRecipeByIngredient: () => { }
});

const IngredientProvider = ({children}) => {

    const authContext = useContext(AuthContext);
    const token = authContext.token;

    const addRecipeByIngredient = async (ingredientId) => {
      return await axios.get("/api/ingredient/getRecipe", {
        ingredient: ingredientId
      }, { headers: { "Authorization": `Bearer ${token}`} })
      .then((response) => {
        if(response.status === 200) {
          if(response.data.recipes.length >= 1) {
              return ({
                  status: 200,
                  data: response.data
              })
          }
          else {
              console.log("no recipes for this ingredient")
          }
      } 
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  
    };

  return (
    <IngredientContext.Provider value={{addRecipeByIngredient}}>
        {children}
    </IngredientContext.Provider>
  )
}

IngredientProvider.propTypes = {
    children: PropTypes.object
}

export default IngredientContext
export {
    IngredientProvider
}