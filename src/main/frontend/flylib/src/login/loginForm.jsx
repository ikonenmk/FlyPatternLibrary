import {useContext, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
export default function LoginForm() {

    /** States **/
    //States for registration information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //State for submission status
    const [submitted, setSubmitted] = useState(""); //TODO: will be used for error messages

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
            setSubmitted(false);
        } else {
            //Post request to backend
            try {
                const token = await axios.post('http://localhost:8080/api/auth/token', {
                    username: username,
                    password: password
                });
                Cookies.set('token', token.data, {expires: 7, secure: false});
                setSubmitted(true);
            } catch (error) {
                console.log("Error: " +error);
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
            </div>
        </>
    )
}