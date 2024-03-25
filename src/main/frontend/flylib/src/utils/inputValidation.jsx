import axios from "axios";

export function InputValidation (input, inputType) {


    switch (inputType) {
        //Validate email
        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                //check if username (email) already exits
                axios
                    .get(`http://localhost:8080/api/user/finduser?username=${input}`)
                    .then((response) => {
                        console.log(response.data);
                        return response;
                    })
            } else {
                return false;
            }
        //Validate password
        case "password":
            //code
            break;

        //Validate form input text
        //Validate is integer
        //Validate form textarea

    }
}