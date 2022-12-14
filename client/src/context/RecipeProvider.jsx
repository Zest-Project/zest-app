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

    const addRecipe = async (recipename, image, cuisines, ingredients, diets) => {
      console.log(JSON.stringify(ingredients));
      // let ingredientIds = ingredients.map((ingredient)=> ingredient._id);
      // ingredientIds = JSON.stringify(ingredientIds)
      await axios.post("/api/recipe", {
        name: recipename,
        image: image,
        cuisines: cuisines,
        ingredients: ingredients,
        diets: diets
      }, { headers: { "Authorization": `Bearer ${token}`} })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  
    };

    const getFiltered = async (cuisine, diet) => {
      const requestBody =  {
          cuisine: cuisine,
          diet: diet
        }
      return await axios
        .put(`/api/recipe/getFiltered`, requestBody, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            console.log("data: " + JSON.stringify(response.data));
            if (response.data.recipes.length >= 1) {
              return {
                status: 200,
                data: response.data.recipes,
              };
            } else {
              console.log("no recipes for this search");
            }
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    };

    const getAllRecipes = async () => {
      // const requestBody = JSON.parse(`{{"cuisine": ${cuisine} }, {"diet": ${diet}}}`)
      return await axios
        .get("/api/recipe", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            // console.log("data: " + JSON.stringify(response.data));
            if (response.data.recipes.length >= 1) {
              return {
                status: 200,
                data: response.data,
              };
            } else {
              console.log("no recipes for this search");
            }
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    };

    const getCuisineTypes = async () => {
      // const requestBody = JSON.parse(`{{"cuisine": ${cuisine} }, {"diet": ${diet}}}`)
      return await axios
        .get("/api/recipe/getCuisines", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            // console.log("data: " + JSON.stringify(response.data));
            if (response.data.cuisines.length >= 1) {
              return {
                status: 200,
                data: response.data,
              };
            } else {
              console.log("no recipes for this search");
            }
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    };

    const getDiets = async () => {
      // const requestBody = JSON.parse(`{{"cuisine": ${cuisine} }, {"diet": ${diet}}}`)
      return await axios
        .get("/api/recipe/getDietOptions", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            // console.log("data: " + JSON.stringify(response.data));
            if (response.data.diets.length >= 1) {
              return {
                status: 200,
                data: response.data,
              };
            } else {
              console.log("no recipes for this search");
            }
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    };

  return (
    <RecipeContext.Provider value={{addRecipe, getAllRecipes, getFiltered, getCuisineTypes, getDiets}}>
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