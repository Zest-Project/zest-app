// import * as React from 'react';
// import {
//   Routes,
//   Route,
//   NavLink,
//   Navigate,
//   useNavigate,
//   useLocation,
// } from 'react-router-dom';

const fakeAuth = () =>
// console.log("from fakeauth username: " +  {username} + ", password:" + {password})
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
});
export default fakeAuth;



