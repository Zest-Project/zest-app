import React, { useContext, useEffect } from 'react'
import LoginComponent from '../components/LoginComponent'
import LoadingContext from '../context/LoadingProvider';
import background from '../images/login_hero.jpeg'
import '../scss/styles';

const Login = () => {

  return (
    <div> 
      <div className="login_hero"> <img src={background} alt="login-hero"/></div>
      <div> <h1> Helloo </h1></div>
      <div className="login_form"> <LoginComponent/> </div>
    </div>

  )
}

export default Login