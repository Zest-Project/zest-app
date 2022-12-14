import React from "react";
import { Routes, Route } from "react-router-dom";
import PreLoginLayout from "./components/PreLoginLayout";
import ProtectedLayout from "./components/ProtectedLayout";
// import ProtectedRoute from "./components/ProtectedRoute";

import AddRecipe from "./pages/AddRecipe";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import LogMeal from "./pages/LogMeal";
import MyRecipes from "./pages/MyRecipes";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import RecipeDetail from "./pages/RecipeDetail"
// import ProtectedRoute from "./components/ProtectedRoute";

const AppRouter = () => {
  // Changed default page to login as that is how we would start our application
  return (
    <Routes>
      <Route element={<PreLoginLayout />} >
      {/* <Route exact path="/" element={<PreLoginLayout />} > */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/> }/>
        {/* <Route exact path="/" element={<Login/>}/> */}
      </Route>

      <Route element={<ProtectedLayout/>}> 
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="addrecipe" element={<AddRecipe />} />
        <Route path="explore" element={<Explore />}> 
          <Route path=":recipename" element={<RecipeDetail />}/> 
        </Route>
        <Route path="logmeal" element={<LogMeal />} />
        <Route path="myrecipes" element={<MyRecipes />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="RecipeDetail" element={<RecipeDetail />} /> */}
      </Route> 
    </Routes>
  );
};

export default AppRouter;
