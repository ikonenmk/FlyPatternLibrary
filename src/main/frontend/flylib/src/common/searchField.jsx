import {useEffect, useState} from "react";
import axios from "axios";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import Cookies from "js-cookie";

/** Input field with autocomplete based on stored data, takes a parameter ("endpoint") for which
 * endpoint that should be used to make the api call
 * **/
export default function SearchField({endpoint, setAutoSearchValue}) {
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
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            });
    }, []);


    //Handlers
    const handleOnSearch = (item) => {
        console.log(item);
        setAutoSearchValue(item);
    }
    const handleOnSelect = (item) => {
        console.log(item.name);
        setAutoSearchValue(item.name);
    }
        return (

                <ReactSearchAutocomplete items={availableData} id={endpoint}
                                         onSearch={handleOnSearch}
                                         onSelect={handleOnSelect}
                />

        )
}