
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import "./pattern.css";
import ImageResize from "../utils/imageResize.jsx";



// Page showing a single pattern based on id


export default function Pattern () {
    const {patternId} = useParams();
    const [pattern, setPattern] = useState("");
    const [materials, setMaterials] = useState([]);
    const [materialNames, setMaterialNames] = useState([]);

    // För bild resizing
    const patternCanvasRef = useRef();
    const [style, setStyle] = useState("patternCanvas");
    useEffect(() => {
        const img = new Image();
        img.src = `http://localhost:8080/images/${pattern.img_url}`;
        img.onload = () => {
            const canvasWidth = patternCanvasRef.current.offsetWidth;
            console.log("width = " + canvasWidth);
            const canvasHeight = patternCanvasRef.current.offsetHeight;
            console.log("height = " + canvasHeight);
            const resizedImage = ImageResize(img, canvasWidth, canvasHeight, "patternCanvas");
            patternCanvasRef.current.style.backgroundImage = `url(${resizedImage})`;
        }
    })

    // Get pattern based on id
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/pattern/${patternId}`)
            .then((response) => {
                if (response.data !== null) {
                    setPattern(response.data);
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            })
    }, []);

    // Get all materials for the pattern
    useEffect(() => {
        axios
        .get(`http://localhost:8080/api/patternmaterial/${patternId}`)
        .then((response) => {
            if (response.data !== null) {
                setMaterials(response.data);
            } else {
                console.log("Error: no materials in db for this pattern");
            }
        })
            .catch((error) => {
                console.log('Axios request error: ', error);
            })
    }, []);

    // Get names of materials
    useEffect(() => {
        const materialsString = materials.map(material => material.material).join(',');
        if (materialsString) {
            axios
                .get(`http://localhost:8080/api/material/names/${materialsString}`)
                .then((response) => {
                    if(response.data !== null) {
                        setMaterialNames(response.data);
                    }
                })
                .catch((error) => {
                    console.log('Axios request error: ', error);
                });
        }
     }, [materials]);


    // Map all materials to materialListItems
    const materialListItems = materialNames.map((material) => {
        return <li key={material.id}>{material.name}</li>;
    });


    return (
        <>
            { pattern ? (
                <>

                    <div className="patternContainer">
                        <h1>{pattern.name}</h1>
                        <div className="imgAndMaterialsContainer ">
                            <canvas
                                id="patternCanvas"
                                className={style}
                                ref={patternCanvasRef}
                            />
                            <div className="materialsContainer">
                                <h2>Hook size: </h2>
                                <p>{pattern.hook_size_from} - {pattern.hook_size_to}</p>
                                <h2>Materials: </h2>
                                <ul className="material-list">
                                    {materialListItems}
                                </ul>
                            </div>
                        </div>
                        <div className="descriptionAndInstructionContainer">
                            <div className="descriptionContainer">
                                <h2>Description:</h2>
                                <p>{pattern.descr}</p>
                            </div>
                            <div className="instructionContainer">
                                <h2>Tying instructions:</h2>
                                <p>{pattern.instr}</p>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <h2>Pattern was not found</h2>
            )}
        </>
    );

}