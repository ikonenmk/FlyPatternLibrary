import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {useAuth, useAuthDispatch} from "../contexts/authContext.jsx";
import {useNavigate} from "react-router-dom";
import "./login.css";

export default function LoginForm() {
    // Read from AuthContext
    const userStatus = useAuth();
    const dispatch = useAuthDispatch();

    // useNavigate hook for forwarding
    const navigate = useNavigate();

    /** States **/
    // States for login information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // States for error handling
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");

    // UseEffect hook to track changes to userStatus state
    useEffect(() => {
        if (userStatus === 'authorized') {
            console.log("Navigating to /library");
            navigate("/library");
        }
    }, [userStatus, navigate]);

    /** Handlers **/
        //Handling change of username
    const handleUsername = (e) => {
            setUsername(e.target.value);
        }
    //Handling change of password
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    //Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username === "" || password === "") {
            alert("No fields can be empty")
        } else {
            // Post request to backend
            try {
                const response = await axios.post('http://localhost:8080/api/auth/token', {
                    username: username,
                    password: password
                });
                // Create cookie storing JWT
                const token = response.data;
                Cookies.set('token', token, {expires: 7, secure: false, sameSite: 'lax'});
                //Change userStatus in AuthContext
                if (userStatus === 'unauthorized') {
                    console.log("Dispatching login action");
                    dispatch({ type: 'login' });
                    console.log("Dispatched login action");
                }
                console.log("User status after check:", userStatus);

                console.log("Navigating to /library");
                navigate("/library");
            } catch (error) {
                console.log("Error: " +error);
                setLoginError(true);
                setLoginErrorMsg("An error occured: " +error);
            }
        }
    }

    return (
        <>
            <div className="rubric">
                <h1>Login</h1>
            </div>
            <div className="form-container">
                <form className="login-form">
                    <label className="label">Username</label>
                    <input
                        onChange={handleUsername}
                        className="input"
                        value={username}
                        type="text"
                    />

                    <label className="label">Password</label>
                    <input
                        onChange={handlePassword}
                        className="input"
                        value={password}
                        type="password"
                    />
                    <button onClick={handleSubmit} className="login-button" type="submit">
                        Login
                    </button>
                </form>
                <p className="error-text">
                    {loginError ? loginErrorMsg : ""}
                </p>
            </div>
        </>
    )
}