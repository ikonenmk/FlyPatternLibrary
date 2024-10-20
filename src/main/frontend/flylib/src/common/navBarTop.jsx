import "./navBarTop.css"
import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBarLoginButton from "./navBarLoginButton.jsx";
export default function NavBarTop() {

    return (
        <nav>
            <ul className="nav">
                <li><NavLink to="/"> Home </NavLink></li>
                <li><NavBarLoginButton /></li>
                <li><NavLink to="register"> Register </NavLink></li>
                <li><NavLink to="/create"> Upload a pattern </NavLink></li>
                <li><NavLink to="/library"> Library </NavLink></li>
            </ul>
        </nav>
    );
}