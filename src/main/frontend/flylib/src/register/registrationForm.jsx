import {useState} from "react";
import axios from "axios";
import {InputValidation} from "../utils/inputValidation.jsx";
import RegisterButton from "./registerButton.jsx";
import {Link} from "react-router-dom";
import "./register.css";
import Cookies from "js-cookie";

export default function RegistrationForm() {

    /** States **/
    //States for registration information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //State for submission status
    const [submitted, setSubmitted] = useState(false);
    //States for error messages
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passError, setPassError] = useState("");
    const [passErrorMsg, setPassErrorMsg] = useState("");
    const [dataBaseError, setDataBaseError] = useState(false);
    const [dataBaseErrorMsg, setDataBaseErrorMsg] = useState("");

    /** Handlers **/
    //Handling change of username
    const handleInput = async (e) => {
        const inputString = e.target.value; // set inputString to input value
        const inputType = e.target.id; //set inputType based on input element id
        // Check if user is not empty, then validate username
        if (inputString !== "") {
            if(inputType === "email") {
                setUsername(inputString);
            } else if (inputType === "password") {
                setPassword(inputString)
            }
            const inputIsValid = await InputValidation(inputString, inputType);
            //If validation fails, set error messages
            if (inputIsValid !== true) {
                switch (inputType) {
                    case "email":
                        setEmailError(true);
                        setEmailErrorMsg(inputIsValid);
                        break;
                    case "password":
                        setPassError(true);
                        setPassErrorMsg(inputIsValid);
                        break;
                }
            } else {
                switch(inputType) {
                    case "email":
                        setEmailError(false);
                        break;
                    case "password":
                        setPassError(false);
                        break;
                }
                setEmailError(false);
            }
        } else {
            switch(inputType) {
                case "email":
                    setUsername(inputString);
                    setEmailError(false);
                    break;
                case "password":
                    setPassword(inputString)
                    setPassError(false);
                    break;
            }
        }
    }

    //Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if user has accepted cookies before proceeding
        const hasAcceptedCookies = Cookies.get('consentCookie');
        if (hasAcceptedCookies === 'true') {
            if(username === "" || password === "") {
                alert("No fields can be empty")
                setSubmitted(false);
            } else if (emailError || passError) {
                alert("Please fill in the form according to error messages");
            } else {
                try {
                    const registerNewUser = await axios.post('http://localhost:8080/api/user/register', {
                        username: username, password: password
                    });
                    //Check response status of post
                    if(registerNewUser.status === 201) {
                        setSubmitted(true);
                    } else {
                        setDataBaseErrorMsg("Error: unexpected response from server");
                    }
                } catch (error) {
                    console.error("An error occurred while sending request to register ", error);
                    setDataBaseErrorMsg("Error: sending of request to server failed");
                }
            }
        } else {
            alert("You must accept cookies in order to register");
        }

    }
    return (
        <>
            <div className="rubric">
                    <h1>Register</h1>
            </div>
            {submitted ? (
                <div className="status-text-container">
                    <h2>Successfully registered</h2>
                    <p className="status-text"> You have been registered. Please <Link to="/login">login</Link></p>
                </div>
            ) : (
                    <>
                    <div className="form-container">
                        <form className="login-form">
                            <label className="label">Username</label>
                            <input
                                id="email"
                                onChange={handleInput}
                                className="input"
                                value={username}
                                type="text"
                            />
                            <p className="error-text">{emailError ? emailErrorMsg : ""}</p>

                            <label className="label">Password</label>
                            <input
                                id="password"
                                onChange={handleInput}
                                className="input"
                                value={password}
                                type="password"
                            />
                            <p className="error-text">{passError ? passErrorMsg : ""}</p>
                            <RegisterButton emailError={emailError} passError={passError} databaseError={dataBaseError}
                                            handleSubmit={handleSubmit}/>
                            {dataBaseError ? <p className="error-text">{dataBaseErrorMsg}</p> : ""}
                         </form>
                     </div>
                </>)
        }
        </>
    )
}