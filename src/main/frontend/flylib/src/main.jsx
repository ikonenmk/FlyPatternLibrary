import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./home/home.jsx"
import NavBarTop from "./common/navBarTop.jsx";
import Error from "./common/error.jsx";
import Login from "./login/login.jsx"
import PersonalLibrary from "./library/personalLibrary.jsx";
import Register from "./register/register.jsx";
import CreatePattern from "./create/createPattern.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path:"/login",
        element: <Login />,
    },
    {
        path: "/library",
        element: <PersonalLibrary />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/create",
        element: <CreatePattern />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NavBarTop />
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);

