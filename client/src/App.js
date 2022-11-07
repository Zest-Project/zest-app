import React from "react";
import "./scss/styles";
import { Grid } from "@mui/material";
import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthProvider"
import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import LoadingContext from "./context/LoadingProvider";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const authContext = useContext(AuthContext);
  const loadingContext = useContext(LoadingContext)
  const  token  = authContext.token;

  if(!token) {
    <Navigate to="/login" replace/>
    return (
      <>
      {loadingContext.loading && <LoadingComponent/>}
      {!loadingContext.loading && <AppRouter/>}

      </>
      );
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
          {loadingContext.loading && <LoadingComponent/>}
          {!loadingContext.loading && <AppRouter/>}
          </Grid>
        </Grid>
        {/* <Outlet/> */}
      </div>
  );
  }
};

export default App;
