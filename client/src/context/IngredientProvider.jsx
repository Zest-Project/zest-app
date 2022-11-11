import React, { createContext, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AuthContext from "./AuthProvider";

const IngredientContext = createContext({
  getRecipeByIngredient: () => {},
  getIngredients: () => {},
});

const IngredientProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  const getRecipeByIngredient = async (ingredients) => {
    // console.log(ingredients[0]._id);
    return await axios
      .get(
        `/api/ingredient/getRecipes/${ingredients[0]._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
        // {
        //   params: {
        //     ingredient: ingredients[0]._id,
        //   }
        // }
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.recipes.length >= 1) {
            return {
              status: 200,
              data: response.data,
            };
          } else {
            console.log("no recipes for this ingredient or no ingredient");
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const getIngredients = async () => {
    return await axios
      .get("/api/ingredient", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.status === 200) {
          console.log("data: " + response.data.ingredients);
          if (response.data.ingredients.length >= 1) {
            return {
              status: 200,
              data: response.data,
            };
          } else {
            console.log("no recipes for this ingredient");
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <IngredientContext.Provider
      value={{ getRecipeByIngredient, getIngredients }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

IngredientProvider.propTypes = {
  children: PropTypes.object,
};

export default IngredientContext;
export { IngredientProvider };
