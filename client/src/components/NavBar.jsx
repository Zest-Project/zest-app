import React from "react";
// import { useState } from 'react';
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../context/useAuth";

import logo from "../images/logo.png";
// import profile_background_inactive from '../images/profile_background_inactive.png'
// import profile_background_active from '../images/profile_background_active.png'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "../scss/styles";
import { useAuth } from "../context/AuthProvider";
// import { Button } from "@mui/material";

const NavBar = () => {
  // const { user, logout } = useAuth();
  const { token, onLogout } = useAuth();
  // const {  } = useAuth();

  return (
    <div className="navbar">
      <NavLink to="/">
        {" "}
        <div className="logo">
          {" "}
          <img src={logo} alt="logo" />{" "}
        </div>{" "}
      </NavLink>

      <div className="logged_in web">
        <div className="sub_menu">
          <NavLink
            className={({ isActive }) =>
              "navlink" + (isActive ? " active" : "")
            }
            to="/profile"
          >
            {/* <div className='profile_container'> */}
            <div className="navitem profile">
              <div className="profile_img_container">
                {" "}
                <img alt="profile_background" />{" "}
              </div>
              <div className="content">
                {" "}
                <p> Profile </p>
              </div>
            </div>
            {/* </div> */}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "navlink" + (isActive ? " active" : "")
            }
            to="/explore"
          >
            {" "}
            <div className="navitem explore"> Explore </div>{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "navlink" + (isActive ? " active" : "")
            }
            to="/myrecipes"
          >
            {" "}
            <div className="navitem myrecipes">
              {" "}
              <div className="content"> My Recipes </div>{" "}
            </div>{" "}
          </NavLink>
        </div>

        <NavLink
          className={({ isActive }) => "navlink" + (isActive ? " active" : "")}
          to="/logmeal"
        >
          <div className="navitem logmeal">
            <div className="content">
              <AddCircleIcon className="icon" />
              <p> Log Meal </p>
            </div>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => "navlink" + (isActive ? " active" : "")}
          to="/addrecipe"
        >
          <div className="navitem addrecipe">
            <div className="content">
              <AddCircleIcon className="icon" />
              <p> Add Recipe </p>
            </div>
          </div>
        </NavLink>
        {token && ( // a conditional statement to display logout button
          // <button type="button" onClick={onLogout}>
          //   Log Out
          // </button>
          <div className="navitem logout" onClick={onLogout}>
            <div className="content">
              <ExitToAppIcon className="icon" />
              <p> Logout </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
