import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import Layout from '../Components/Layout/Layout';

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register"
export const HOME = "/protected/home"
export const PROTECTED = "/protected"

export const Routes = createBrowserRouter([
    { path: ROOT, element: "Hello Public ROOT"},
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    { path: PROTECTED, 
        element: <Layout />, 
        children: [
            {
                path: HOME,
                element:"Home",
            }
        ]
    }//Will be created a dinamic protected routes
])
