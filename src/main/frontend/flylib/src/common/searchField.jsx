import {useEffect, useState} from "react";
import axios from "axios";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import Cookies from "js-cookie";
import "./searchField.css"

/** Input field with autocomplete based on stored data, takes a parameter ("endpoint") for which
 * endpoint that should be used to make the api call
 * **/
export default function SearchField({endpoint, setSearchInput, updateFilter}) {
    // Load available data into const availableData
    const [availableData, setAvailableData] = useState([]);
    // Get token
    const token = Cookies.get("token");
    // State for enable/disable add button
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);



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
    const handleSearch = (item, itemType) => {
        setSearchString(item);
        // If gallery is the parent component, update search filter
        if (updateFilter) {
            if (endpoint === "name") {
                updateFilter(item, itemType);
            }
            if (endpoint !== "name") {
                if(typeof item === 'object' && item !== null && 'id' in item) {
                    setIsAddButtonDisabled(false)
                } else {
                    setIsAddButtonDisabled(true);
                }
            }
        }
    }

    //Add new item to list
    const handleAddButton = () => {
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
                                          onSearch={(item) => handleSearch(item, endpoint)}
                                          onSelect={(item) => handleSearch(item, endpoint)}
                                         styling={{
                                             height: '38px',
                                             border: '1px solid #ccc',
                                             borderRadius: '4px',
                                             color: 'black'
                                         }}
                                         className="auto-search"
                                         placeholder={`Type in ${endpoint}`}
                />
                </div>
                <div className="button-container">
                    { endpoint === "name" ? (
                        ""
                    ) : (
                        <button className={isAddButtonDisabled ? 'add-button-disabled' : 'add-button-enabled'} onClick={handleAddButton} disabled={isAddButtonDisabled}>Add</button>
                    )
                    }

                    {searchStringArray.map((value) => <button className="delete-button" key={value} onClick={() =>handleButtonClick(value)}>{value}</button>)}
                </div>
            </>

        )
}