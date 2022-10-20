import React from "react";
import "./scss/styles";
import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
import { Grid } from "@mui/material";
// We use Route in order to define the different routes of our application
// import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app

 
const App = () => {
 return (
   <div className="app">        
    <Grid className="grid" container spacing={2} direction={{xs: "column", sm: "row", md: "row", lg: "row", xl: "row" }}>
      <Grid item sm={2} md={2} lg={2} xl={2}> <NavBar/> </Grid>
      <Grid item sm={10} md={10} lg={10} xl={10}> 
        <div> 
          <AppRouter/> 
        </div>
      </Grid>
    </Grid>
   </div>
 );
};
 
export default App;