import axios from "axios";

//Function receiving a token, check validity of token, returns true or false
export async function CheckJwt (token) {
    try {
        const tokenIsValid = await axios
            .get(`http://localhost:8080/api/auth/validate?token=${token}`);
        if (!tokenIsValid.data) {
            return false;
        } else {
            return true;
        }
        } catch (error) {
        console.error("An error occured: ", error);
        throw error;
     }
}