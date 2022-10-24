import React, { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
import fakeAuth from "../Authentication";
import { useNavigate } from "react-router-dom";
// import useLocalStorage from "../hooks/useLocalStorage"

const AuthContext = createContext(null);

const validateHistoryToken = () => {
  //vaidate token from database
  const historyToken = localStorage.getItem("token");

  //check history token against database

  return historyToken;
}

export const AuthProvider = ({ children }) => {
  // const [authToken, setAuthToken] = useLocalStorage("token", null);
  const [token, setToken] = useState( validateHistoryToken() || "");
  const navigate = useNavigate();

  if(token) {
    validateHistoryToken(token);
  }
  const handleSignup = async (data) => {
    data.preventDefault();
    const username = data.target[0].value;
   // const email = data.target[0].value;
    const password = data.target[2].value;
    //const confirm_pass = data.target[3].value;
    
    const token = await fakeAuth(username, password);
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    navigate("/");

  }

  const handleLogin = async (data) => {
    data.preventDefault();
    const username = data.target[0].value;
    const password = data.target[1].value
    
    const token = await fakeAuth(username, password); // pass data here when needed
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    navigate("/");
    
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignup: handleSignup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default  AuthProvider;

