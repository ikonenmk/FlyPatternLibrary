import "./navBarTop.css"
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import NavBarLoginButton from "./navBarLoginButton.jsx";
export default function NavBarTop() {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    function toggleMenu() {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    }
    function menuItemClick() {
        setIsHamburgerMenuOpen(false);
    }

    return (
        <>
            <div className="menu-container">
                <nav className="large-menu">
                    <ul>
                        <li><NavLink to="/"> Home </NavLink></li>
                        <li><NavBarLoginButton/></li>
                        <li><NavLink to="register"> Register </NavLink></li>
                        <li><NavLink to="/create"> Upload a pattern </NavLink></li>
                        <li><NavLink to="/library"> Library </NavLink></li>
                    </ul>
                </nav>
                <div className="hamburger-menu-container">
                    <button className="hamburgerButton" onClick={toggleMenu}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </button>
                    <nav className={`${isHamburgerMenuOpen ? 'hamburger-' : 'no-'}menu`}>
                        <ul>
                            <li><NavLink to="/" onClick={menuItemClick}> Home </NavLink></li>
                            <li onClick={menuItemClick}><NavBarLoginButton /></li>
                            <li onClick={menuItemClick}><NavLink to="register"> Register </NavLink></li>
                            <li onClick={menuItemClick}><NavLink to="/create"> Upload a pattern </NavLink></li>
                            <li onClick={menuItemClick}><NavLink to="/library"> Library </NavLink></li>
                        </ul>
                    </nav>
                </div>


            </div>
        </>
    );
}