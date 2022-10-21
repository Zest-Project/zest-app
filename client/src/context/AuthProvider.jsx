import React, { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
import fakeAuth from "../Authentication";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
    navigate("/")
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
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

