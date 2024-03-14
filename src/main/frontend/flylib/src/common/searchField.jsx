import {useEffect, useState} from "react";
import axios from "axios";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import Cookies from "js-cookie";

/** Input field with autocomplete based on stored data, takes a parameter ("endpoint") for which
 * endpoint that should be used to make the api call
 * **/
export default function SearchField({endpoint, setSearchInput}) {
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

    //Variable for storing search field input
    const [searchString, setSearchString] = useState("");
    const [searchStringArray, setSearchStringArray] = useState([]);


    //Handel input in search field
    const handleOnSearch = (item) => {
        setSearchString(item);
    }
    const handleOnSelect = (item) => {
        setSearchString(item.name);
    }

    //Add new item to list
    const handleAddButton = () => {
        //Add string to array
        const updatedArray = [...searchStringArray, searchString];
        //Update states
        setSearchStringArray(updatedArray);
        setSearchInput(updatedArray, endpoint);
    }
    //Delete item from list
    const handleButtonClick = (buttonIndex) => {
        console.log(searchStringArray);
        //filter out array element with same index as the button clicked
        const filteredArray = searchStringArray.filter((element, index) => index !== buttonIndex);
        //Update states
        setSearchStringArray(filteredArray);
        setSearchInput(filteredArray, endpoint);
    }


        return (
            <>
                <ReactSearchAutocomplete items={availableData} id={endpoint}
                                          onSearch={handleOnSearch}
                                          onSelect={handleOnSelect}
                />
                <button id="button" onClick={handleAddButton}>Add</button>
                {searchStringArray.map((value, index) => <button key={index} onClick={() =>handleButtonClick(index)}>{value}</button>)}
            </>

        )
}