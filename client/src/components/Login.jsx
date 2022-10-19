import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const defaultValues = {
    username: "",
    password: "",
};

const Login = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(formValues);
        }

        return (
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            value={formValues.username}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Password"
                            type="text"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    
                </Grid>
                <Button variant="contained" color="primary" type="submit"> Submit </Button>
            </form>

        )
    };
};

export default Login;


