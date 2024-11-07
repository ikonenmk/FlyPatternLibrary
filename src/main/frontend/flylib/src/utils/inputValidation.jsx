import axios from "axios";

export async function InputValidation(input, inputType) {
    let hasError = false;
    let errorMsg  = "";
    switch (inputType) {
        // Login and registration validations
        //Validate email
        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) { // check if e-mail matches regex for correct e-mail format
                // check if username (email) already exits
                try {
                    const userExists = await axios.get(`http://localhost:8080/api/user/finduser?username=${input}`)
                    if (userExists.data === true) {
                        return "The email address has already been registered";
                    } else if (userExists.data === false) {
                        return true;
                    }

                } catch (error) {
                    console.error("An error occured: ", error);
                    throw error;
                }
            } else {
                return "State a correct email address";
            }
            break;
        // Validate password
        case "password":
            //Checks if the password is between 12-50 chars, includes uppercase and lowercase, has numbers and symbols
            if (input.length <= 12 || input.length > 50) {
                hasError = true;
                errorMsg = errorMsg.concat(" ", "between 12 and 50 characters");
            }
            if (!checkUpperLowerCase(input)) {
                hasError = true;
                errorMsg = errorMsg.concat(", ", "contain both upper and lower case letters");
            }
            if (!containsNumbers(input)) {
                hasError = true;
                errorMsg = errorMsg.concat(", ", "include at least 1 number");
            }
            if (!containsSpecialChar(input)) {
                hasError = true;
                errorMsg = errorMsg.concat(", ", "include at least one of the following: !@#£$%&*,.?");
            }
            break;

        // Pattern creation validations
        case "patternName":
            if (input.length > 100) {
                hasError = true;
                errorMsg = "Patter name is to long (max 100 characters)"
            }
            break;
        case "hookSizeFrom":
            if (!containsNumbers(input)) {
                hasError = true;
                errorMsg = "Hook size must be a number"
            }
            break;
        case "hookSizeTo":
            if (!containsNumbers(input)) {
                hasError = true;
                errorMsg = "Hook size must be a number"
            }
            break;
        case "material":
            if (input.length > 100) {
                hasError = true;
                errorMsg = "Material name is to long (max 100 characters)"
            }
            break;
        case "species":
            if (input.length > 100) {
                hasError = true;
                errorMsg = "Species name is to long (max 100 characters)"
            }
            break;
        case "description":
            if (input.length > 2000) {
                hasError = true;
                errorMsg = "Description is to long (max 2000 characters)"
            }
            break;
        case "instruction":
            if (input.length > 2000) {
                hasError = true;
                errorMsg = "Instruction is to long (max 2000 characters)"
            }
            break;
    }
            // Check if there are any errors and return error message, or if not the value true
            if (hasError) {
                return errorMsg;
            } else {
                return true;
            }

    // Function for controlling if string has upper and lower case
    function checkUpperLowerCase(string) {
        const upper = /[A-Z]/.test(string);
        const lower = /[a-z]/.test(string);

        return upper && lower;
    }

    //Function for controlling if string contains special chars
    function containsSpecialChar(string) {
        return /[!@#£$%&*,.?]/.test(string);
    }

    // Function for controlling if a string has numbers
    function containsNumbers(input) {
        return /\d/.test(input);
    }
}