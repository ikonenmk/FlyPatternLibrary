import {useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {useAuth, useAuthDispatch} from "../contexts/authContext.jsx";
import { useNavigate } from "react-router-dom";

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
                    dispatch({type: 'login'});
                }
                // Forwarding user to personal library page
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
            <div>
                <h2>Login</h2>
            </div>
            <div>
                <form>
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
                    <button onClick={handleSubmit} className="button" type="submit">
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