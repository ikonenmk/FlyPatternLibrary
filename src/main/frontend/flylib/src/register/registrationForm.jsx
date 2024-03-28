import {useState} from "react";
import axios from "axios";
import {InputValidation} from "../utils/inputValidation.jsx";

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
    const handleUsername = async (e) => {
        setUsername(e.target.value);
        const user = e.target.value;
        const userIsValid = await InputValidation(user, "email");
        console.log(userIsValid);
        if (userIsValid !== true) {
            setEmailError(true);
            setEmailErrorMsg(userIsValid);
        } else {
            setEmailError(false);
        }

        //TODO: add a check useState for each field that sets it to false if any field is not OK
    }
    //Handling change of password
    const handlePassword = async (e) => {
        setPassword(e.target.value);
    }
    //Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
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
               console.log(registerNewUser.status);
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
    }
    return (
        <>
        <div>
            <h2>Register</h2>
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
                <p className="error-text">{emailError ? emailErrorMsg : ""}</p>

                <label className="label">Password</label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    type="password"
                    />
                <p className="error-text">{passError ? passErrorMsg : ""}</p>
                <button onClick={handleSubmit} className="button" type="submit">
                    Register
                </button>
                {dataBaseError ? <p className="error-text">{dataBaseErrorMsg}</p> : "" }
                {submitted ? <p className="status-text"> You have been registered </p> : ""}
            </form>
        </div>
        </>
    )
}