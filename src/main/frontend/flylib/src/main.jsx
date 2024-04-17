import React from 'react'
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

//Data for auth
//
const token = Cookies.get("token");

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
                loader: async () => {
                    //Validate JWT from user's cookie, redirect to login page if JWT is missing or has expired
                    try {
                        const tokenIsValid = await axios
                            .get(`http://localhost:8080/api/auth/validate?token=${token}`);
                        if (!tokenIsValid.data) {
                            return redirect("/login");
                        }
                        return null;

                    } catch (error) {
                        console.error("An error occured: ", error);
                        throw error;
                    }


                },
                element: <CreatePattern />,
                errorElement: <Error />,
            },

        ]
    }

]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
    </React.StrictMode>
);

