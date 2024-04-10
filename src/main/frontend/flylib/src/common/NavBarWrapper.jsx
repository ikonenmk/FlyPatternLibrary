import NavBarTop from "../common/navBarTop.jsx";
import {Outlet} from "react-router-dom";

export default function NavBarWrapper() {


    return (
        <>
            <NavBarTop />
            <Outlet />
        </>

    )
}