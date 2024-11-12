import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./patternAccordion.css";
import config from "bootstrap/js/src/util/config.js";

export default function PatternAccordion({ username, typeOfView }) {
    const token = Cookies.get("token");

    const [patterns, setPatterns] = useState([]);
    const [materialsData, setMaterialsData] = useState({});
    const [speciesData, setSpeciesData] = useState({});

    // Get user's saved patterns
    useEffect(() => {
        if(!username || username === "") {
            // return if username is undefined or empty
            return;
        }
        let url;

        if (typeOfView === "savedPatterns") {
            url = `http://localhost:8080/api/user/getpatterns?username=${username}`;
        } else if (typeOfView === "createdPatterns") {
            url = `http://localhost:8080/api/user/getcreatedpatterns?username=${username}`;
        }

        if (url) {
            axios
                .get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPatterns(response.data || []);
                })
                .catch((error) => {
                    console.log("Axios request error: ", error);
                });
        } else {
            console.log("No URL existing");
        }
    }, [username, token, typeOfView]);


    // Image resizing
    const [style, setStyle] = useState("patternCanvas");
    const canvasRefs = useRef([]);
    useEffect(() => {
        patterns.forEach((pattern, index) => {
            const canvas = canvasRefs.current[index];
            const context = canvas.getContext('2d');

            // Create resized image
            const img = new Image();
            img.src = `http://localhost:8080/images/${pattern.img_url}`;
            img.onload = () => {
                const canvasWidth = 300;
                const canvasHeight = 200;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                // Draw the image on the canvas
                context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            };
        });
    }, [patterns]);

    // Get all materials for pattern
    const fetchMaterials = async (patternId) => {
        try {
            // Get materials id
            const materialResponse = await axios.get(`http://localhost:8080/api/patternmaterial/${patternId}`);

            // Extract ids and convert to string
            const materialIds = materialResponse.data.map(item => item.material).join(',');

            // Get materials name
            const namesResponse = await axios.get(`http://localhost:8080/api/material/names/${materialIds}`);

            // Return  material names
            return namesResponse.data; // Return the material names
        } catch (error) {
            console.log("Axios error: ", error);
            return []; // Return an empty array on error
        }
    };

    // Fetch materials for all patterns
    useEffect(() => {
        const fetchAllMaterials = async () => {
            const materials = {};
            for (const pattern of patterns) {
                const names = await fetchMaterials(pattern.id);
                materials[pattern.id] = names;
            }
            setMaterialsData(materials);
        };

        if (patterns.length) {
            fetchAllMaterials();
        }
    }, [patterns]);

    // Get all materials for pattern
    const fetchSpecies = async (patternId) => {
        try {
            // Get materials id
            const speciesResponse = await axios.get(`http://localhost:8080/api/patternspecies/${patternId}`);

            // Extract ids and convert to string
            const speciesIds = speciesResponse.data.map(item => item.species).join(',');

            // Get materials name
            const namesResponse = await axios.get(`http://localhost:8080/api/species/names/${speciesIds}`);

            // Return  material names
            return namesResponse.data; // Return the material names
        } catch (error) {
            console.log("Axios error: ", error);
            return []; // Return an empty array on error
        }
    };

    // Fetch species for all patterns
    useEffect(() => {
        const fetchAllSpecies = async () => {
            const species = {};
            for (const pattern of patterns) {
                const names = await fetchSpecies(pattern.id);
                species[pattern.id] = names;
            }
            setSpeciesData(species);
        };

        if (patterns.length) {
            fetchAllSpecies();
        }
    }, [patterns]);

    // Function for deleting a pattern
    async function deleteFromLib(patternId) {
        try {
            const response= await axios
                .delete(`http://localhost:8080/api/user/deletepattern?username=${username}&patternId=${patternId}`, {
                    headers: { Authorization: `Bearer ${token}`
                },})
            if(response.data.success === true) {
                alert(response.data.message);
                setPatterns((prevPatterns) => prevPatterns.filter((pattern) => pattern.id !== patternId));
            } else {
                alert(response.data.message);
            }
            } catch(error) {
            console.log("Axios error: ", error);
        }
    }
    // Rendering functions of accordion items
    const accordionItems = patterns.map((pattern, index) => {
        return (
            <Accordion

                key={index}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    className="accordion-item"
                >
                    {pattern.name}
                </AccordionSummary>
                <AccordionDetails
                >
                    <h1>{pattern.name}</h1>
                    <canvas
                        id={`patternCanvas${index}`}
                        className={style}
                        ref={(element) => (canvasRefs.current[index] = element)}
                    />
                    <h2>Hook size: </h2>
                    <p>{pattern.hook_size_from} - {pattern.hook_size_to}</p>

                    <h2>Materials: </h2>
                    <ul className="list-of-material">
                        {materialsData[pattern.id] && materialsData[pattern.id].map((material) => (
                            <li key={material.id}>{material.name}</li>
                        ))}
                    </ul>

                    <h2>Species: </h2>
                    <ul className="list-of-species">
                        {speciesData[pattern.id] && speciesData[pattern.id].map((species) => (
                            <li key={species.id}>{species.name}</li>
                        ))}
                    </ul>

                    <h2>Description:</h2>
                    <p>{pattern.descr}</p>

                    <h2>Tying instructions:</h2>
                    <p>{pattern.instr}</p>
                    {typeOfView === 'savedPatterns' ? (
                        <AccordionActions>
                            <Button
                                onClick={() => deleteFromLib(pattern.id)}>Delete</Button>
                        </AccordionActions>) : (
                        "")}
                </AccordionDetails>
            </Accordion>
        );
    });

    return <div>{accordionItems}</div>;
}
