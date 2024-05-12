// Returns a button for NavBar
// A Login button if the user is not logged in or a Log out button if the user is already logged in

import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";
import {useAuth, useAuthDispatch} from "../contexts/authContext.jsx";

export default  function NavBarLoginButton() {
    // Read from AuthContext
    const userStatus = useAuth();
    const dispatch = useAuthDispatch();

    // Get user token
    const userToken = Cookies.get('token');

    // Handling click on log out button
    function logOutButtonClicked() {
        Cookies.remove('token', userToken, {expires: 7, secure: false, sameSite: 'lax'});
        // change user status in context
        dispatch({type: 'logout'})
    }
    if (userStatus === 'authorized') {
        return <NavLink to="/" onClick={logOutButtonClicked}> Log out </NavLink>
    } else {
        return <NavLink to="/login"> Log in </NavLink>
    }
}