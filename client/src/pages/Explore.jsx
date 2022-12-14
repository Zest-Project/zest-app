// import SearchRecipes from "../components/search/SearchRecipes"
import React from 'react'
import CuisineType from '../components/CuisineType'
import PageTitle from '../components/PageTitle';
import '../scss/styles';
import UserContext from "../context/UserProvider";
import AuthContext from "../context/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import LoadingContext from "../context/LoadingProvider";
import SearchExplore from "../components/search/SearchExplore";

const Explore = () => {
  // const {getRecipes} = useUser();
  const userContext = useContext(UserContext);
  // const {token} = useAuth();
  const authContext = useContext(AuthContext);
  const loadingContext = useContext(LoadingContext);
  // const [token, setToken] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   loadingContext.setLoading(true);
  //   const getRecipes = async () => {
  //     await userContext.getRecipes().then((response) => {
  //       // console.log(`response: ${response}`);
  //       // console.log(`response.data: ${response.data}`);
  //       // console.log(`response.data.recipes: ${response.data.recipes}`);
  //       if (response) {
  //         console.log("response in explore: " + response.data.recipes);
  //         setRecipes(response.data.recipes);
  //       }
  //       else {
  //         console.log("error");
  //       }
  //     })
  //   }
  //   getRecipes()
  //   loadingContext.setLoading(false);
  // }, [authContext.token])

  // useEffect(() => {
  //   console.log(recipes);
  // }, [recipes])

  return (
    <div className='explore container'>
        <div className="header"> 
          <PageTitle pageTitle="Explore"/> 
          {/* <SearchRecipes /> */}
        </div>
        
        <div>
            <SearchExplore/>
            {/* <CuisineType recipes={recipes} cuisineType="hello"/> */}
            {/* <CuisineType recipes={recipes} cuisineType="hello"/> */}
            {/* <CuisineType recipes={recipes} cuisineType="hello"/> */}
        </div>
        
    </div>
  )
}

export default Explore