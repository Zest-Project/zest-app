import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import "../scss/styles";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const defaultValues = {
    username: "",
    password: "",
};

const LoginComponent = () => {
    
    const [formValues, setFormValues] = useState(defaultValues);
    const authContext = useContext(AuthContext)
    // const token = authContext.token;
    
    const navigate = useNavigate();
    const routeChange = () => {
        let path = '/signup'
        navigate(path);
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        // console.log(e.target);
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        authContext.onLogin(formValues.username, formValues.password)
    }

        return (
            <div className="sign_in">
                
            <form className='login-form' onSubmit={handleSubmit}>
                
                <Grid className='container' container direction="column" spacing={3}>
                    <label className='title'>Sign In</label>    
                    <Grid className ='item' item>
                        <label>
                            <p> Username: </p>
                            <input 
                                type="text"
                                className='input'
                                name='username'
                                // placeholder='username'
                                onChange={handleInputChange} 
                            />
                        </label>
                    </Grid>

                    <Grid className ='item' item>
                        <label>
                            <p> Password: </p>
                            <input 
                                type="password"
                                className='input'
                                name='password'
                                // placeholder='password'
                                onChange={handleInputChange} 
                            />
                        </label>
                        
                    </Grid>

                    <Grid className ='item' item>
                        <button className='btn' type="submit" value="Submit"> Login </button> 
                    </Grid>

                    <Grid className ='item' item>
                        <button className='btn' type="button" onClick={routeChange} value="Submit"> Signup </button> 
                    </Grid>
                    
                </Grid>
            </form>
            </div>
        )
    
};

export default LoginComponent;


