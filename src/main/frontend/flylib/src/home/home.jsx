import {useEffect, useState} from "react";
import SearchField from "../common/searchField.jsx";
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Home() {
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


    return (
        <>
            <h1>Gallery of all flies </h1>
            <div className="gallery-container">
                <div className="filter-container">

                </div>
                <div className="image-container">
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {patterns.map((pattern) => (
                            <ImageListItem key={pattern.id}>
                                <img
                                    srcSet={`http://localhost:8080/images/${pattern.img_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`http://localhost:8080/images/${pattern.img_url}?w=164&h=164&fit=crop&auto=format`}
                                    alt={pattern.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar position="bottom" title={pattern.name} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    )
}