import React from 'react'
import SignupComponent from '../components/SignupComponent'
// import PageTitle from '../components/PageTitle'
import background from '../images/login_hero.jpeg'
import '../scss/styles';
const Signup = () => {
  return (
    <div>
        <div className="login_hero"> <img src={background} alt="login-hero"/></div>
        {/* <div><PageTitle pageTitle="Create New Account"/></div> */}
        <div className="signup_form"><SignupComponent/></div>
    </div>
  )
}

export default Signup