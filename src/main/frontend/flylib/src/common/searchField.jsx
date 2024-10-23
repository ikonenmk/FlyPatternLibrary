import {useEffect, useState} from "react";
import axios from "axios";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import Cookies from "js-cookie";
import "./searchField.css"

/** Input field with autocomplete based on stored data, takes a parameter ("endpoint") for which
 * endpoint that should be used to make the api call
 * **/
export default function SearchField({endpoint, setSearchInput, updateFilter}) {
    //Load available data into const availableData
    const [availableData, setAvailableData] = useState([]);
    const token = Cookies.get("token");


    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/${endpoint}`)
            .then((response) => {
                setAvailableData(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            });
    }, []);

    //Variable for storing search field input
    const [searchString, setSearchString] = useState("");
    const [searchStringArray, setSearchStringArray] = useState([]);


    //Handel input in search field
    const handleOnSearch = (item, itemType) => {
        setSearchString(item);
        // If gallery is the parent component, update search filter
        if (updateFilter) {
            if (endpoint === "name") {
                updateFilter(item, itemType);
            }
        }
    }
    const handleOnSelect = (item) => {
        setSearchString(item);
    }

    //Add new item to list
    const handleAddButton = (itemType) => {
        // If gallery is the parent component, update search filter with id of search string object
        if (updateFilter) {
            // If parent component is gallery, only allow adding of existing materials
            if(typeof searchString === 'object' && searchString !== null && 'id' in searchString) {
                updateFilter(searchString.id, endpoint)
                const updatedArray = [...searchStringArray, searchString.name];
                setSearchStringArray(updatedArray);
                setSearchInput(updatedArray, endpoint);
            }
        } else {
            //Add search string object name to array
            const updatedArray = [...searchStringArray, searchString.name];
            //Update states
            setSearchStringArray(updatedArray);
            setSearchInput(updatedArray, endpoint);
        }
    }
    //Delete item from list
    const handleButtonClick = (value) => {
        // filter out array element with same index as the button clicked
        const filteredArray = searchStringArray.filter((element) => element.toLowerCase() !== value.toLowerCase());
        // recreate object to send back to updateFilter
        const filteredElement = searchStringArray.filter((element) => element.toLowerCase() === value.toLowerCase());
        const filteredElementObject = availableData.filter((element) => element.name.toLowerCase() === filteredElement[0].toLowerCase());

        //Update states
        setSearchStringArray(filteredArray);
        setSearchInput(filteredArray, endpoint);
        if (updateFilter) {
            updateFilter(filteredElementObject[0].id, endpoint, "delete");
        }
    }


        return (
            <>
                <div className="search-field">
                <ReactSearchAutocomplete items={availableData} id={endpoint}
                                          onSearch={(item) => handleOnSearch(item, endpoint)}
                                          onSelect={handleOnSelect}
                                          styling={
                                            {color: "black"}
                                          }
                                         placeholder={`Type in ${endpoint}`}
                />
                </div>
                <div className="button-container">
                    { endpoint === "name" ? (
                        ""
                    ) : (
                        <button className="add-button" onClick={handleAddButton}>Add</button>
                    )
                    }

                    {searchStringArray.map((value) => <button className="delete-button" key={value} onClick={() =>handleButtonClick(value)}>{value}</button>)}
                </div>
            </>

        )
}