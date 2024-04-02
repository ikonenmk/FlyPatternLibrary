import axios from "axios";
import {useState} from "react";

export async function InputValidation(input, inputType) {

    switch (inputType) {
        //Validate email
        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) { // check if e-mail matches regex for correct e-mail format
                // check if username (email) already exits
                try {
                    const userExists = await axios.get(`http://localhost:8080/api/user/finduser?username=${input}`)
                    if(userExists.data === true) {
                        return "The email address has already been registered";
                    } else if(userExists.data === false) {
                        return true;
                    }

                } catch (error){
                    console.error("An error occured: ", error);
                    throw error;
                }
            } else {
                return "State a correct email address";
            }
            break;
        // Validate password
       case "password":
            //Checks if the password is at least 12 chars, includes uppercase, lowercase, numbers and symbols
            if (input.length <= 12) {
                return "The password has to be at least 12 characters long"
            }
            break;

        //Validate form input text
        //Validate is integer
        //Validate form textarea

    }
}