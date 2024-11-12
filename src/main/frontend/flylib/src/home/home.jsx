import {useEffect, useRef, useState} from "react";
import SearchField from "../common/searchField.jsx";
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {IconButton} from "@mui/material";
import './home.css';
import {useAuth} from "../contexts/authContext.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function Home() {
// Read from AuthContext
const userStatus = useAuth();
const token = Cookies.get("token");
const [username, setUsername] = useState("");
// useNavigate hook call
const navigate = useNavigate();

// Input variables
const [searchString, setSearchString] = useState("");
const [searchInputArray, setSearchInputArray] = useState([]);
const [materials, setMaterials] = useState([]);
const [species, setSpecies] = useState([]);
const [nameFilter, setNameFilter] = useState([]);
const [materialsFilter, setMaterialsFilter] = useState([]);
const [speciesFilter, setSpeciesFilter] = useState([]);

// Gallery items and filtered items
const [galleryItems, setGalleryItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);

// Filtering object storing filter values for each filter option
const [filter, setFilter] = useState([{
    nameFilter: {name : []},
    materialsFilter: {material: []},
    speciesFilter: {species: []},
}]);


const updateFilter = (newFilterItem, filterType, actionType) => {
    if (actionType === "delete") {
        // Delete item from filter
        if (filterType === 'material') {
            // Remove element based on id
            setFilter(prevFilter => {
                return prevFilter.map(filterItem => {
                    return {
                        ...filterItem,
                        materialsFilter: {
                            ...filterItem.materialsFilter,
                            material: filterItem.materialsFilter.material.filter(materialsItem => materialsItem !== newFilterItem)
                        }
                    };
                });
            });
        }
        if (filterType === 'species') {
            // Remove element based on id
            setFilter(prevFilter => {
                return prevFilter.map(filterItem => {
                    return {
                        ...filterItem,
                        speciesFilter: {
                            ...filterItem.speciesFilter,
                            species: filterItem.speciesFilter.species.filter(speciesItem => speciesItem !== newFilterItem)
                        }
                    };
                });
            });
        }
    } else {
        // Check filter type and add filter value to correct filter object
        switch(filterType) {
            case 'name':
                setFilter(prevFilter => {
                    return [{
                        ...prevFilter[0],
                        nameFilter:
                            { ...prevFilter[0].nameFilter,
                                name: newFilterItem} // Replace value for name, only one value at one time should be possible
                    }]
                });
                break;
            case 'material':
                if(!filter[0].materialsFilter.material.includes(newFilterItem)) { // Check if material is not in filter
                    // update filter
                    setFilter(prevFilter => {
                        return [{
                            ...prevFilter[0],
                            materialsFilter: {
                                ...prevFilter[0].materialsFilter,
                                material: [...(prevFilter[0].materialsFilter.material || []), newFilterItem] // Append value if filter is not empty
                            }
                        }];
                    });
                } else { // if already in filter, do nothing
                }
                break;
            case 'species':
                if(!filter[0].speciesFilter.species.includes(newFilterItem)) { // Check if species is not in filter
                    // update filter
                    setFilter(prevFilter => {
                        return [{
                            ...prevFilter[0],
                            speciesFilter: {
                                ...prevFilter[0].speciesFilter,
                                species: [...(prevFilter[0].speciesFilter.species || []), newFilterItem]}
                        }]
                    });
                } else { // if already in filter, do nothing
                }
                break;
        }
    }
    updateGallery();
}

    // Load patterns from DB
    const [patterns, setPatterns] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/pattern/find")
            .then((response) => {
                setPatterns(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            })
    }, []);

    // Update gallery items based on filters

    function updateGallery(filteredPatterns) {
        const filters = filter[0];
        let updatedFilter = patterns;

        // Apply name filter
        if (filters.nameFilter.name.length > 0) {
            updatedFilter = updatedFilter.filter(pattern =>
                pattern.name.toLowerCase() === filters.nameFilter.name.toLowerCase()
            );
        }

        // Apply material filter
        if (filters.materialsFilter.material.length > 0) {
            updatedFilter = updatedFilter.filter(pattern =>
                filters.materialsFilter.material.every(requiredMaterial =>
                    pattern.materials.some(materialItem =>
                        materialItem.material === requiredMaterial
                    )
                )
            );
        }

        // Apply species filter
        if (filters.speciesFilter.species.length > 0) {
            updatedFilter = updatedFilter.filter(pattern =>
                filters.speciesFilter.species.every(requiredSpecies =>
                    pattern.species.some((speciesItem) =>
                        speciesItem.species === requiredSpecies
                    )
                )
            );
        }

        // Set gallery items to the filtered patterns
        setGalleryItems(updatedFilter);
    }

    // useEffect hook for deciding which items to show in gallery based on the filter
    useEffect(() => {
        // Check if all filters are empty
        if(filter[0].nameFilter.name.length === 0 &&
            filter[0].materialsFilter.material.length === 0 &&
            filter[0].speciesFilter.species.length === 0
        ) {
            // Show all patterns i DB in gallery
            setGalleryItems(patterns);
        } else {
            updateGallery()
        }

    }, [patterns, filter]);

    const setSearchInput = (updatedArray, endpointString) => {
        //Update array based on endpoint
        if (endpointString === "material") {
            setMaterials(updatedArray);
            setSearchInputArray(updatedArray);
        } else if (endpointString === "species") {
            setSpecies(updatedArray);
            setSearchInputArray(updatedArray);
        } else {
            console.log("Endpoint value mismatch");
        }
    }

    const [hoveredImageId, setHoveredImageId] = useState(null);

    function showButtons(patternId) {
        setHoveredImageId(patternId);
    }
    function hideButtons() {
        setHoveredImageId(null);
    }

    // Add pattern to user's library
    async function onAddClick(patternId) {
        // Get username based on auth token
        let username;
        try {
            const response = await axios.get("http://localhost:8080/api/auth/username", {
                headers: { Authorization: `Bearer ${token}` }
            });
            username = response.data;
        } catch (error) {
            if (error.response) {
                console.log("Response error: ", error.status);
                console.log(error.response.data);
            } else if (error.request) {
                console.log("Request error: ", error.request);
            } else {
                console.log("Error", error.message);
            }
            return;
        }

        console.log("username = ", username)

        // Add to database
        if (username) {
            try {
                const response = await axios
                    .post(`http://localhost:8080/api/user/addpattern?username=${username}&pattern_id=${patternId}`,
                        null,{headers: {Authorization: `Bearer ${token}`}})
                console.log(response);
                if(response.data.success) {
                    alert(response.data.message);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        alert(error.response.data.message);
                    }
                    console.log("Response error: ", error.response.data.message);
                    console.log("Status: ", error.response.status);
                } else if (error.request) {
                    console.log("Request error: ", error.request);
                } else {
                    console.log("Error", error.message);
                }
            }
        } else {
            console.log("Username not found");
        }
    }
    function onOpenClick(patternId) {
        // Navigate to page for pattern with id
        navigate(`/pattern/${patternId}`);
    }


    return (
        <>
            <div className="rubric">
                    <h1>Pattern Search </h1>
            </div>
            <div className="gallery-container">
            <div className="filter-container">
                    <fieldset className="name-fieldset">
                        <legend>Name</legend>
                        <div className="name-search-field">
                            <SearchField endpoint="name" setSearchInput={setSearchInput} updateFilter={updateFilter}/>
                        </div>
                    </fieldset>
                    <fieldset className="material-fieldset">
                        <legend>Material</legend>
                        <div className="material-search-field">
                            <SearchField endpoint="material" setSearchInput={setSearchInput} updateFilter={updateFilter}/>
                        </div>
                    </fieldset>
                    <fieldset className="species-fieldset">
                        <legend>Species</legend>
                        <div className="species-search-field">
                            <SearchField endpoint="species" setSearchInput={setSearchInput} updateFilter={updateFilter}/>
                        </div>
                    </fieldset>
                </div>
                <div className="image-container">
                    <ImageList sx={{minWidth: 200, maxWidth: 800, background: 'white', borderStyle: 'none',
                        borderColor: '#213547'}} gap={3} cols={3}
                               rowHeight={164}>
                    {galleryItems.map((pattern) => (
                            <ImageListItem
                                key={pattern.id}

                                className="gallery-image"
                                >
                                <img
                                    srcSet={`http://localhost:8080/images/${pattern.img_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`http://localhost:8080/images/${pattern.img_url}?w=164&h=164&fit=crop&auto=format`}
                                    alt={pattern.name}
                                    loading="lazy"
                                    id={pattern.id}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => onOpenClick(pattern.id)}
                                />


                                    <ImageListItemBar
                                        position="top"
                                        title={pattern.name}
                                        style={{
                                            background: "rgba(128, 128, 128, 0.5)"
                                        }}
                                        actionIcon={
                                            <div className="iconContainer"
                                                 style={{
                                                     background: "grey"

                                                 }}
                                            >
                                                {userStatus === 'authorized' ? (
                                                    <IconButton
                                                        aria-label={`add ${pattern.name}`}
                                                        sx={{ color: 'white',
                                                            '&:hover':
                                                                {color: 'green', backgroundColor: 'transparent'},
                                                            fontSize: '2em'
                                                        }}
                                                        onClick={() => onAddClick(pattern.id)}
                                                        > +
                                                    </IconButton>
                                                ) : ("")}
                                            </div>

                                        }
                                    />

                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    )
}