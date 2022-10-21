import React from 'react'
import LoginComponent from '../components/LoginComponent'
import background from '../images/login_hero.jpeg'
import '../scss/styles';

const Login = () => {

  return (
    <div> 
      <div className="login_hero"> <img src={background} alt="login-hero"/></div>
      <div className="login_form"> <LoginComponent/> </div>
    </div>

  )
}

export default Login