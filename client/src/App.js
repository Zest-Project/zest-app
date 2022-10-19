import React from "react";
import "./scss/styles";
import Login from"./components/Login";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app

 
const App = () => {
 return (
   <div>
    <Login></Login>
   </div>
 );
};
 
export default App;