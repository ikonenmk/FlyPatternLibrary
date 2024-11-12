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
        setIsAddButtonDisabled(false)
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
        // Check if the searchString already has been added
        if (searchString !== null && searchString !== "") {
            // if string
            if (typeof searchString === 'string') {
                if (searchStringArray.some(item => item.toLowerCase() === searchString.toLowerCase())) {
                    // return if already added
                    return;
                }
                // if object
            } else if (typeof searchString === 'object' && searchString !== null && 'name' in searchString) {
                if (searchStringArray.some(item => item.toLowerCase() === searchString.name.toLowerCase())) {
                    // return if already added
                    return;
                }
            }
        }

        // If search filter provided (component has gallery as parent)
        if (updateFilter) {
            // If parent component is gallery, only allow adding of existing materials (objects)
            if(typeof searchString === 'object' && searchString !== null && 'id' in searchString) {
                updateFilter(searchString.id, endpoint)
                const updatedArray = [...searchStringArray, searchString.name];
                setSearchStringArray(updatedArray);
                setSearchInput(updatedArray, endpoint);
            }
        } else {
            // In other cases allow adding custom material strings
            const updatedArray = [
                ...searchStringArray,
                typeof searchString === 'string' ? searchString : searchString.name,
            ];
            setSearchStringArray(updatedArray);
            setSearchInput(updatedArray, endpoint);
        }
    }
    //Delete item from list
    const handleButtonClick = (value) => {
        // Remove string from searchStringArray equal to value
        const filteredArray = searchStringArray.filter(
            (element) => element.toLowerCase() !== value.toLowerCase());
        // Search for objects in searchString with name equal to value
        const filteredObjectArray = availableData.filter(
            (material) => material.name.toLowerCase() === value.toLowerCase());
        setSearchStringArray(filteredArray);
        setSearchInput(filteredArray, endpoint);

        if (updateFilter && typeof filteredObjectArray[0] === 'object') {
            // Call updateFilter when filteredElement has an id
            updateFilter(filteredObjectArray[0].id, endpoint, "delete");
        }
    };

    // handling style change of autosearch field on hover
    const [color, setColor] = useState("#292e37");
    const styles = {

    }


        return (
            <>
                <div className="search-field">
                <ReactSearchAutocomplete items={availableData} id={endpoint}
                                         onSearch={(item) => handleSearch(item, endpoint)}
                                         onSelect={(item) => handleSearch(item, endpoint)}
                                         onMouseEnter={() => setColor("blue")}
                                         onMouseLeave={() => setColor("#292e37")}
                                         styling={{
                                             height: '38px',
                                             border: '1px solid #213547',
                                             color: "grey",
                                             hoverBackgroundColor: "lightgrey",
                                             borderRadius: '4px',
                                             backgroundColor: "#292e37",
                                             placeholderColor: "grey",
                                             lineColor: "white",
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

                    {searchStringArray.map((value, index) => (
                        <button className="delete-button" key={`${value}-${index}`} onClick={() => handleButtonClick(value)}>
                            {value}
                        </button>
                    ))}
                </div>
            </>

        )
}