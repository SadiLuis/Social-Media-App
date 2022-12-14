import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import Layout from '../Components/Layout/Layout';
import Home from '../Pages/Home/Home';
import Users from '../Components/Users/AllUsers';
import Profile from '../Pages/Profile/Profile';
import Comments from '../Components/Comments/AllComment';


export const LOGIN = "/";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const HOME = "/protected/home";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

export const Routes = createBrowserRouter([
  
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: HOME,
        element: <Home />,
      },
      {
        path: USERS,
        element: <Users />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
      {
        path: COMMENTS,
        element: <Comments />,
      },
    ],
  },
]);