import React, { createContext, useContext } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
// import fakeAuth from "../Authentication";
// import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const UserContext = createContext({
    getRecipes: () => { }
});

const UserProvider = ({children}) => {

    // const {token} = useAuth();
    const authContext = useContext(AuthContext);
    const token = authContext.token;

  const getRecipes = async () => {
    return await axios.get("/api/recipe", { headers: { "Authorization": `Bearer ${token}`} })
      .then((response) => {
        if(response.status === 200) {
            if(response.data.recipes.length >= 1) {
                // const recipes = response.data.recipes
                // console.log("recipes: " + recipes);
                return ({
                    status: 200,
                    data: response.data
                })
            }
            else {
                console.log("no recipes for this user")
            }
        } 
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });  
  }

//   const value = {
//     getRecipes: getRecipes,
//   }

  return (
    <UserContext.Provider value={{getRecipes}}>
        {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
    children: PropTypes.object
}

// export const useUser = () => {
//     return useContext(UserContext);
// };

export default UserContext
export {
    UserProvider
}