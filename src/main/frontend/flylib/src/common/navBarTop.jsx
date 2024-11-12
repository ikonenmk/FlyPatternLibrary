import "./navBarTop.css"
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import NavBarLoginButton from "./navBarLoginButton.jsx";
export default function NavBarTop() {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    function toggleMenu() {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    }

    return (
        <>
        <div className="menu-container">
            <nav className="menu">
                <ul>
                    <li><NavLink to="/"> Home </NavLink></li>
                    <li><NavBarLoginButton/></li>
                    <li><NavLink to="register"> Register </NavLink></li>
                    <li><NavLink to="/create"> Upload a pattern </NavLink></li>
                    <li><NavLink to="/library"> Library </NavLink></li>
                </ul>
            </nav>
            <nav className="hamburger-menu">
                 <ul className={`${isHamburgerMenuOpen ? 'hamburger-' : ''}nav`}>
                    <li><NavLink to="/"> Home </NavLink></li>
                    <li><NavBarLoginButton/></li>
                    <li><NavLink to="register"> Register </NavLink></li>
                    <li><NavLink to="/create"> Upload a pattern </NavLink></li>
                                <li><NavLink to="/library"> Library </NavLink></li>
                 </ul>
            </nav>
                <button className="hamburgerButton" onClick={toggleMenu}>Hamburger</button>
        </div>
        </>
    );
}