import "./navBarTop.css"
export default function NavBarTop() {

    return (
        <>
            <ul className="nav">
                <li><a href="http://localhost:5173/"> Home </a></li>
                <li><a href="http://localhost:5173/login"> Sign in </a></li>
                <li><a href="http://localhost:5173/register"> Register </a></li>
                <li><a href="http://localhost:5173/create"> Upload a pattern </a></li>
                <li><a href="http://localhost:5173/library"> Library </a></li>

            </ul>
        </>
    );
}