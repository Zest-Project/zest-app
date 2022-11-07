import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
// import fakeAuth from "../Authentication";
// import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const LoadingContext = createContext({
  setLoading: () => { }
});

const LoadingProvider = ({children}) => {
  const [loading, setLoading] = useState();

  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
        {children}
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
    children: PropTypes.object
}

export default LoadingContext
export {
    LoadingProvider
}