import React from "react";
// import AppRouter from "../AppRouter";
// import { Grid } from "@mui/material";
import AuthContext from "../context/AuthProvider";

import { Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
// import AppRouter from "../AppRouter";
// import LoginComponent from "../components/LoginComponent";
// import useAuth from "../context/useAuth";
// import useAuth from "../context/useAuth";

const PreLoginLayout = () => {
  //const { user } = useAuth();
  const authContext = useContext(AuthContext)
  const token = authContext.token;
  // const outlet = useOutlet();
  // const { onLogin } = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
        <Outlet/>
  );
};

export default PreLoginLayout;
