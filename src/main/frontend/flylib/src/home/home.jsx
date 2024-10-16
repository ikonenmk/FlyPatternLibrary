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

    // Load images from DB
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

                </div>
                <div className="image-container">
                    <ImageList sx={{minWidth:200, maxWidth: 800}} gap={0} cols={3} rowHeight={164}>
                        {patterns.map((pattern) => (
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