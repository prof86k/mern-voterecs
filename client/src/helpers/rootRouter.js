import React from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile';
import PageNotFoundError from '../components/PageNotFoundError';
import Reset from '../components/Reset';

/** Create routes**/
const router = createBrowserRouter([
    {
        path: '/',
        element: (<div> This Home
            <Link to="register">Register</Link>
        </div>)
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'profile',
        element: <Profile />
    },
    {
        path: 'reset',
        element: <Reset />
    }
    ,
    {
        path: '*',
        element: <PageNotFoundError />
    }
]);

export default router