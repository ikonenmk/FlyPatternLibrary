import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./pages/home.jsx"
import {StateProvider} from "./stores/store.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StateProvider>
        <RouterProvider router={router} />
        </StateProvider>
    </React.StrictMode>
);

