import "./navBarTop.css"
import { Link } from 'react-router-dom';
export default function NavBarTop() {

    return (
        <nav>
            <ul className="nav">
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/login"> Sign in </Link></li>
                <li><Link to="register"> Register </Link></li>
                <li><Link to="/create"> Upload a pattern </Link></li>
                <li><Link to="/library"> Library </Link></li>

            </ul>
        </nav>
    );
}