import React, {useContext} from 'react'
import {createBrowserRouter, redirect, RouterProvider, useNavigate} from "react-router-dom";
import '../index.css'
import Home from "../home/home.jsx";
import Error from "../common/error.jsx";
import Login from "../login/login.jsx"
import PersonalLibrary from "../library/personalLibrary.jsx";
import Register from "../register/register.jsx";
import CreatePattern from "../create/createPattern.jsx";
import NavBarWrapper from "../common/NavBarWrapper.jsx";
import Cookies from "js-cookie";
import {CheckJwt} from "../utils/checkJwt.jsx";
import {useAuth, useAuthDispatch} from "../contexts/authContext.jsx";
export default function PageRoutes() {
    // Read from context
    const userStatus = useAuth();
    const dispatch = useAuthDispatch();

    // Routes
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
                    loader: () => checkToken(dispatch),
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
                    loader: () => checkToken(dispatch),
                    element: <CreatePattern />,
                    errorElement: <Error />,
                },

            ]
        }

    ]);

    // Loader function that checks if JWT is valid before accessing route
    async function checkToken (dispatch) {
        const token = Cookies.get("token");
        if (token) {
            try {
                const tokenIsValid = await CheckJwt(token, dispatch, userStatus);
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


    return (
                <RouterProvider router={router}>
                </RouterProvider>
    );


}