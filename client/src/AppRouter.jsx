import React from "react";
import { Routes, Route } from "react-router-dom";

import AddRecipe from "./pages/AddRecipe";
import CreateNewAccount from "./pages/CreateNewAccount";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import LogMeal from "./pages/LogMeal";
import MyRecipes from "./pages/MyRecipes";
import Profile from "./pages/Profile";

const AppRouter = () => {
  // Changed default page to login as that is how we would start our application
  return (
    
    <Routes>
        <Route exact path="/" element={<Login/>}/> 
        <Route path="/addrecipe" element={<AddRecipe/>}/>
        <Route path="/createnewaccount" element={<CreateNewAccount/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logmeal" element={<LogMeal/>}/>
        <Route path="/myrecipes" element={<MyRecipes/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Routes>
);
};

export default AppRouter;
