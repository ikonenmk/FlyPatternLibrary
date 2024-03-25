import {useState} from "react";
import axios from "axios";
import {InputValidation} from "../utils/inputValidation.jsx";

export default function RegistrationForm() {

    /** States **/
    //States for registration information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //State for submission status
    const [submitted, setSubmitted] = useState(""); //TODO: will be used for error messages

    /** Handlers **/
    //Handling change of username
    const handleUsername = (e) => {
        const user = e.target.value;
        const userIsValid = InputValidation(user, "email");
        console.log(userIsValid);
           //console.log(InputValidation(e.target.value, "email"));

            setUsername(e.target.value);
        //TODO: add a check useState for each field that sets it to false if any field is not OK
    }
    //Handling change of password
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    //Handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === "" || password === "") {
            alert("No fields can be empty")
            setSubmitted(false);
        } else {
            setSubmitted(true);
            //TODO: add an if statement that checks if the checking state is true, then go on with request
            //Post request to backend
            axios.post('http://localhost:8080/api/user/register', {
                username: username,
                password: password
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log("Error: " +error);
                })
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

                <label className="label">Password</label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    type="password"
                    />
                <button onClick={handleSubmit} className="button" type="submit">
                    Register
                </button>
            </form>
        </div>
        </>
    )
}