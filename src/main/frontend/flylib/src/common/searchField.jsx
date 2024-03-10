import {useEffect, useState} from "react";
import axios from "axios";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import Cookies from "js-cookie";

/** Input field with autocomplete based on stored data, takes a parameter ("endpoint") for which
 * endpoint that should be used to make the api call
 * **/
export default function SearchField({endpoint}) {
    //Load available data into const availableData
    const [availableData, setAvailableData] = useState([]);
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/${endpoint}`, config)
            .then((response) => {
                setAvailableData(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            });
    }, []);


    const [value, setValue] = useState("");

    //Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    }
        return (
            <form onSubmit={handleSubmit}>
                <label>Species</label>
                <ReactSearchAutocomplete items={availableData}
                />
                <input type="submit" value="Submit" />
            </form>
        )
}