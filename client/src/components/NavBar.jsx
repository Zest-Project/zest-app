import React from 'react'
// import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png'
// import profile_background_inactive from '../images/profile_background_inactive.png'
// import profile_background_active from '../images/profile_background_active.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../scss/styles";

const NavBar = () => {

  // const [profileBg, setProfileBg] = useState(profile_background_inactive);
  // // const [profileState, setProfileState] = useState("inactive");


  // const bgChange = (event) => {
  //   if (event.currentTarget.classList.contains('active')) {
  //     console.log("is active");
  //     setProfileBg(profile_background_active);
  //   }
  //   else if (!event.currentTarget.classList.contains('active')) {
  //     console.log("not active");
  //     setProfileBg(profile_background_inactive);
  //   }
  // };


  return (
    <div className='navbar'>
        <NavLink to='/'> <div className='logo'> <img src={logo} alt="logo"/> </div> </NavLink>

        <div className='sub_menu'>
          <NavLink className={({ isActive }) => "navlink" + (isActive ? " active" : "")} to='/profile'> 
            {/* <div className='profile_container'> */}
              <div className='navitem profile'> 
                <img alt="profile_background" /> 
              </div> 
            {/* </div> */}
          </NavLink>
          <NavLink className={({ isActive }) => "navlink" + (isActive ? " active" : "")} to='/explore'> <div className='navitem explore'> Explore </div> </NavLink>
          <NavLink className={({ isActive }) => "navlink" + (isActive ? " active" : "")} to='/myrecipes'> <div className='navitem myrecipes'> <div className='content'> My Recipes </div> </div> </NavLink>
        </div>

        <NavLink className={({ isActive }) => "navlink" + (isActive ? " active" : "")} to='/logmeal'> 
          <div className='navitem logmeal'> 
            <div className='content'>
              <AddCircleIcon className='icon'/> 
              <p> Log Meal </p>  
            </div> 
          </div> 
        </NavLink>
        <NavLink className={({ isActive }) => "navlink" + (isActive ? " active" : "")} to='/addrecipe'> 
          <div className='navitem addrecipe'> 
          <div className='content'>
              <AddCircleIcon className='icon'/> 
              <p> Add Recipe </p>  
            </div> 
          </div> 
        </NavLink>
    </div>
  )
}

export default NavBar