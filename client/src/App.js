import React from "react";
import "./scss/styles";
import { Grid } from "@mui/material";
import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthProvider";
// import { Outlet } from "react-router-dom";
// import { AuthProvider } from "./context/useAuth";
// import { Navigate } from "react-router-dom";
// import LoginRouter from "./LoginRouter";
// We use Route in order to define the different routes of our application
// import { Route, Routes } from "react-router-dom";
import {
  Navigate,
} from 'react-router-dom';
import { useContext } from "react";

const App = () => {
  const authContext = useContext(AuthContext);
  const  token  = authContext.token;

  if(!token) {
    <Navigate to="/login" replace/>
    return (<AppRouter/>);
  }

  else {
    return (
      <div className="app">
        {/* {grid} */}
        <Grid
          className="grid"
          container
          spacing={2}
          direction={{
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          }}
        >
          <Grid item sm={2} md={2} lg={2} xl={2}>
            {" "}
            <div className="navbar_fixed">
              {" "}
              <NavBar />{" "}
            </div>{" "}
          </Grid>
          <Grid item sm={10} md={10} lg={10} xl={10}>
            <AppRouter />
          </Grid>
        </Grid>
        {/* <Outlet/> */}
      </div>
  );
  }
};

export default App;
