import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../scss/styles";
const defaultValues = {
    username: "",
    password: "",
};

const LoginComponent = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(formValues);
        }

        return (
            <>
            <form className='form' onSubmit={handleSubmit}>
                <Grid container direction="column">
                    <Grid item>
                        <TextField
                            className="name_input"
                            name="name"
                            label="Username"
                            type="text"
                            value={formValues.username}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className="name_input"
                            name="name"
                            label="Password"
                            type="text"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    
                </Grid>
                <Button className='btn' variant="contained" color="primary" type="submit"> Login </Button>
                <Button className='btn' variant="contained" color="primary" type="submit"> Signup </Button>
            </form>
            </>
        )
    
};

export default LoginComponent;


