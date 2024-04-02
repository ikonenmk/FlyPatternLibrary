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
            if(inputType === "email") {
                setUsername(inputString);
                setEmailError(false);
            } else if (inputType === "password") {
                setPassword(inputString)
                setPassError(false);
            }
            }
    }
    // Handling change of password
    const handlePassword = async (e) => {
        const password = e.target.value;
        // Check if password is not empty, then validate
        if (password !== "") {
            setPassword(e.target.value.replace(/\s/g, '')); // replace whitespace
            const passwordIsValid = await InputValidation(password, "password");

        }

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