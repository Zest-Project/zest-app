import React, { createContext, useContext } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
// import fakeAuth from "../Authentication";
// import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const RecipeContext = createContext({
    addRecipe: () => { }
});

const RecipeProvider = ({children}) => {

    // const {token} = useAuth();
    const authContext = useContext(AuthContext);
    const token = authContext.token;

    const addRecipe = async (recipename) => {
      // data.preventDefault();
      // const username = data.target[0].value;
      // const password = data.target[1].value;
      // const token = await fakeAuth(username, password); // pass data here when needed
      await axios.post("/api/recipe", {
        recipename: recipename
      }, { headers: { "Authorization": `Bearer ${token}`} })
      .then((response) => {
        console.log(response.data);
        // token = response.data.token;
        // setToken(token);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  
      // localStorage.setItem("token", token);
      // setToken(token);
      // navigate("/");
      
    };

//   const value = {
//     getRecipes: getRecipes,
//   }

  return (
    <RecipeContext.Provider value={{addRecipe}}>
        {children}
    </RecipeContext.Provider>
  )
}

RecipeProvider.propTypes = {
    children: PropTypes.object
}

// export const useRecipe = () => {
//     return useContext(RecipeContext);
// };

export default RecipeContext
export {
    RecipeProvider
}