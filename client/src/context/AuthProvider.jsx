import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
// import fakeAuth from "../Authentication";
import { useNavigate } from "react-router-dom";
import LoadingContext from "./LoadingProvider";
// import useLocalStorage from "../hooks/useLocalStorage"

const AuthContext = createContext({
  onSignup: () => { },
  onLogin: () => { },
  onLogout: () => { }
});

const validateHistoryToken = () => {
  //vaidate token from database
  const historyToken = localStorage.getItem("token");

  //check history token against database

  return historyToken;
}

const AuthProvider = ({ children }) => {
  // const [authToken, setAuthToken] = useLocalStorage("token", null);
  const loadingContext = useContext(LoadingContext);
  const [token, setToken] = useState( validateHistoryToken() || "");
  const navigate = useNavigate();

  // if(token) {
  //   validateHistoryToken(token);
  // }

  const onSignup = async (username, password, email) => {
    // data.preventDefault();
    // const username = data.target[1].value;
    // const email = data.target[2].value;
    // const password = data.target[3].value;
    let token;
    //const confirm_pass = data.target[3].value;
    console.log(`username: ${username} + password: ${password} + email: ${email}`); 

    loadingContext.setLoading(true)
    await axios.post("/api/signup", {
      username: username,
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response.data.token);
      token = response.data.token;
      setToken(token)
    })
    .catch(function (error) {
      console.log(error);
    });
    // const token = await fakeAuth(username, password);
    localStorage.setItem("token", token);
    // setToken(token);
    navigate("/");
    loadingContext.setLoading(false);

  }

  const onLogin = async (username, password) => {
    // data.preventDefault();
    // const username = data.target[0].value;
    // const password = data.target[1].value;
    let token;
    console.log(`username: ${username} + password: ${password}`); 
    // const token = await fakeAuth(username, password); // pass data here when needed
    loadingContext.setLoading(true)
    await axios.post("/api/login", {
      username: username,
      password: password
    })
    .then((response) => {
      console.log(response.data.token);
      token = response.data.token;
      setToken(token);
    })
    .catch(function (error) {
      console.log(error);
    });

    localStorage.setItem("token", token);
    // setToken(token);
    navigate("/");
    loadingContext.setLoading(false)
    
  };

  const onLogout = () => {
    loadingContext.setLoading(true)
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    loadingContext.setLoading(false);
  };

  return (
    <AuthContext.Provider value={{token, onSignup, onLogin, onLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object
}

export default AuthContext;

export { AuthProvider };

