import React, { useState } from "react";
import AddImage from './AddImage';
import Grid from "@mui/material/Grid";
//import PageTitle from "./PageTitle";
import "../scss/styles";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignupComponent = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const authContext = useContext(AuthContext)

  const navigate = useNavigate();
  const routeChange = () => {
      let path = '/login'
      navigate(path);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.onSignup(formValues.username, formValues.password, formValues.email);
  };

  return (
    <div className="sign_up">
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <Grid className="container" container direction="column" spacing={3}>
          
          <label className="title">Sign Up</label>
          <AddImage />
          <Grid className="item" item>
            <label>
              <p> Username: </p>
              <input
                type="text"
                className="input"
                name="username"
                // placeholder='username'
                onChange={handleInputChange}
              />
            </label>
          </Grid>

          <Grid className="item" item>
            <label>
              <p> Email: </p>
              <input
                type="email"
                className="input"
                name="email"
                // placeholder='password'
                onChange={handleInputChange}
              />
            </label>
          </Grid>

          <Grid className="item" item>
            <label>
              <p> Password: </p>
              <input
                type="password"
                className="input"
                name="password"
                // placeholder='password'
                onChange={handleInputChange}
              />
            </label>
          </Grid>

          <Grid className="item" item>
            <label>
              <p> Confirm Password: </p>
              <input
                type="password"
                className="input"
                name="name"
                // placeholder='password'
                onChange={handleInputChange}
              />
            </label>
          </Grid>

          <Grid className ='item' item>
            <button className='btn' type="submit" value="Submit"> Login </button> 
          </Grid>


          <Grid className ='item' item>
            <button className='btn' type="button" onClick={routeChange} value="Submit"> Back </button> 
          </Grid>

        </Grid>
      </form>
    </div>
  )
};

export default SignupComponent;
