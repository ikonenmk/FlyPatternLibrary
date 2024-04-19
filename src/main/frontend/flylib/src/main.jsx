import React, {useContext} from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./home/home.jsx";
import Error from "./common/error.jsx";
import Login from "./login/login.jsx"
import PersonalLibrary from "./library/personalLibrary.jsx";
import Register from "./register/register.jsx";
import CreatePattern from "./create/createPattern.jsx";
import NavBarWrapper from "./common/NavBarWrapper.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import {CheckJwt} from "./utils/checkJwt.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBarWrapper />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />,

            },
            {
                path:"/login",
                element: <Login />,
                errorElement: <Error />,
            },
            {
                path: "/library",
                element: <PersonalLibrary />,
                errorElement: <Error />,
            },
            {
                path: "/register",
                element: <Register />,
                errorElement: <Error />,
            },
            {
                path: "/create",
                loader: checkToken,
                element: <CreatePattern />,
                errorElement: <Error />,
            },

        ]
    }

]);

//Loader function that checks if JWT is valid before accessing route
async function checkToken () {
    const token = Cookies.get("token");
    if (token) {
        try {
            const tokenIsValid = await CheckJwt(token);
            if (!tokenIsValid) {
                return redirect("/login");
            }
            return null;

        } catch (error) {
            console.error("An error occured: ", error);
            throw error;
        }
        } else {
        return redirect("/login");
        }

}


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </React.StrictMode>
);

