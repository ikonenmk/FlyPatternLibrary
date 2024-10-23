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

export default function Home() {
// Read from AuthContext
const userStatus = useAuth();

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
                    console.log("items is already in filter");
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
                    console.log("changed species filter to: " +newFilterItem);
                } else { // if already in filter, do nothing
                    console.log("item already in filter");
                }
                break;
        }
    }

}

    // Load patterns from DB
    const [patterns, setPatterns] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/pattern/find")
            .then((response) => {
                setPatterns(response.data);
                console.log(patterns);
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
    function onAddClick(patternId) {
        // Add pattern to user's library
        console.log("Click add");
    }
    function onOpenClick(patternId) {
        // Navigate to page for pattern with id
        console.log("Click open");
        navigate(`/pattern/${patternId}`);
    }


    return (
        <>
            <h1>Gallery of all flies </h1>
            <div className="gallery-container">
                <div className="filter-container">
                    <fieldset>
                        <legend>Name</legend>
                        <div className="name-search-field">
                            <SearchField endpoint="name" className="name-search-field" setSearchInput={setSearchInput} updateFilter={updateFilter}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Material</legend>
                        <div className="material-search-field">
                            <SearchField endpoint="material" setSearchInput={setSearchInput} updateFilter={updateFilter}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Species</legend>
                        <div className="species-search-field">
                            <SearchField endpoint="species" setSearchInput={setSearchInput} updateFilter={updateFilter}/>
                        </div>
                    </fieldset>
                </div>
                <div className="image-container">
                    <ImageList sx={{minWidth: 200, maxWidth: 800, background: '#242424'}} gap={0} cols={3}
                               rowHeight={164}>
                    {galleryItems.map((pattern) => (
                            <ImageListItem key={pattern.id}>
                                <img
                                    srcSet={`http://localhost:8080/images/${pattern.img_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`http://localhost:8080/images/${pattern.img_url}?w=164&h=164&fit=crop&auto=format`}
                                    alt={pattern.name}
                                    loading="lazy"
                                    id={pattern.id}
                                    onMouseEnter={() => showButtons(pattern.id)}
                                    onMouseLeave={() => hideButtons()}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                { hoveredImageId === pattern.id ? (
                                    <ImageListItemBar
                                        position="bottom"
                                        onMouseEnter={() => showButtons(pattern.id)}
                                        onMouseLeave={() => hideButtons()}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '10px',
                                        }}
                                        actionIcon={
                                            <div className="iconContainer"
                                                 style={{
                                                     display: 'flex',
                                                     gap: '30px',
                                                     position: 'absolute',       // Use absolute positioning
                                                     left: '50%',                // Center it horizontally
                                                     top: '0px',
                                                     transform: 'translateX(-50%)', // Adjust for width of icons
                                                 }}
                                            >
                                                <IconButton
                                                    aria-label={`open ${pattern.name}`}
                                                    sx={{ color: 'white',
                                                        '&:hover': {color: 'gray'}
                                                    }}
                                                    onClick={() => onOpenClick(pattern.id)}>
                                                    Open
                                                </IconButton>

                                                {userStatus === 'authorized' ? (
                                                <IconButton
                                                    aria-label={`add ${pattern.name}`}
                                                    sx={{ color: 'white',
                                                        '&:hover': {color: 'gray'}
                                                    }}
                                                    onClick={() => onAddClick(pattern.id)}>
                                                    Add
                                                </IconButton>
                                                    ) : ("")}
                                            </div>

                                        }
                                    />
                                ) : (
                                    <ImageListItemBar
                                        position="bottom"
                                        title={pattern.name}
                                        onMouseEnter={() => showButtons(pattern.id)}
                                        onMouseLeave={() => hideButtons()}
                                    />
                                )

                                }

                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    )
}