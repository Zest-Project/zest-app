import React from "react";
import {
  Navigate,
  Outlet,
} from 'react-router-dom';
// import { Navigate, useOutlet } from "react-router-dom";
// import useAuth from "../context/useAuth";
// import NavBar from "./NavBar";
// import AppRouter from "../AppRouter";
// import { Grid } from "@mui/material";
// import AppRouter from "../AppRouter";
import { useAuth } from "../context/AuthProvider";
import PropTypes from 'prop-types'

// import AppRouter from "../AppRouter";
const ProtectedLayout = ({children}) => {
  // const token = useContext(AuthContext);
  const {token} = useAuth();
  // const { user } = useAuth();
  // const outlet = useOutlet();

  if (!token) {
    return <Navigate to="/login" replace/>;
  }

  return children ? children : (
    <div>
      {/* <div>Authenticated as {token}</div> */}
      <Outlet/>
    </div>
  );
};

ProtectedLayout.propTypes = {
  children: PropTypes.object
}

export default ProtectedLayout;
