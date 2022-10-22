import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import "../scss/styles";
import { useAuth } from "../context/AuthProvider";

const defaultValues = {
    username: "",
    password: "",
};

const LoginComponent = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const {onLogin} = useAuth();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(formValues);
    // }

        return (
            <div className="sign_in">
                
            <form className='form' onSubmit={onLogin}>
                
                <Grid className='container' container direction="column" spacing={3}>
                    <label className='title'>Sign In</label>    
                    <Grid className ='item' item>
                        <label>
                            Username:
                            <input 
                                type="text"
                                className='input'
                                name='name'
                                // placeholder='username'
                                onChange={handleInputChange} 
                            />
                        </label>
                    </Grid>

                    <Grid className ='item' item>
                        <label>
                            Password:
                            <input 
                                type="password"
                                className='input'
                                name='name'
                                // placeholder='password'
                                onChange={handleInputChange} 
                            />
                        </label>
                        
                    </Grid>

                    <Grid className ='item' item>
                        <button className='btn' type="submit" value="Submit"> Login </button> 
                    </Grid>

                    <Grid className ='item' item>
                        <button className='btn' type="buttin"> Signup </button> 
                    </Grid>
                    
                </Grid>
                
                
            </form>
            </div>
        )
    
};

export default LoginComponent;


