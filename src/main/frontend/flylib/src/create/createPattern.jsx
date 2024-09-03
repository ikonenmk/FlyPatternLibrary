import SearchField from "../common/searchField.jsx";
import {useEffect, useRef, useState} from "react";
import SelectList from "../common/selectList.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./createPattern.css";
import ImageUpload from "./imageUpload.jsx";

export default function CreatePattern() {
    //Data for auth
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    //Input data from user
    const [isForSale, setIsForSale] = useState(false);
    const [patternName, setPatternName] = useState("");
    const [hookSizeFrom, setHookSizeFrom] = useState("");
    const [hookSizeTo, setHookSizeTo] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [price, setPrice] = useState("");
    const [materials, setMaterials] = useState([]);
    const [species, setSpecies] = useState([]);
    const UPLOAD_DIR = "";
    const [type, setType] = useState("");
    const [searchInputArray, setSearchInputArray] = useState([]);
    const fileRef = useRef(null);

    //get username from server
    const [username, setUsername] = useState("");
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/auth/username', config)
            .then((response) => {
                setUsername(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            });
    }, []);

    // Preventing default action of opening files dropped outside of dropzone

    useEffect(() => {
        // Call back functions
        const handleDragOver = (e) => {
            e.preventDefault();
        };
        const handleDrop = (e) => {
            e.preventDefault();
        }
        // Add event listeners
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);

        // cleanup function
        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
        };
    }, []);
    
    //Function for updating material and species arrays based on events in SearchField component
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

    //Function for updating type value based on select option value
    const setSelectOptionValue = (selectedType) => {
        setType(selectedType);

    }
    //Handlers
    const handleIsForSaleCheckBoxChange = () => {
        setIsForSale(!isForSale);
    }

    // function for storing image on submit
    const storeImage = async () => {
    // Kom ihåg att göra den async
        const files = fileRef.current.files;
        const formData = new FormData();
        // add chosen file to formData
        [...files].forEach((file) => {
            formData.append('file', file);
        })
        // post to DB
        try {
            const response = await axios.post(`http://localhost:8080/api/pattern/uploadimage`, formData, {
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log("File uploaded");
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    const handleSubmit = async () => {
        // Store image and generate img url
        await storeImage();

        //Create date and timestamp and convert to (java) LocalDateTime format
        const dateTime = new Date().toISOString();

        //User input data
        const patternData = {
            "name": patternName,
            "descr": description,
            "instr": instruction,
            "hook_size_from": hookSizeFrom,
            "hook_size_to": hookSizeTo,
            "type": type,
            "img_url": UPLOAD_DIR + fileRef.current.files[0].name,
            "for_sale": isForSale,
            "price" : price,
            "created_by_user" : username,
            "created": dateTime
        }
        //Send request to add pattern to DB
        // Convert arrays to comma separated strings to match endpoint
        const speciesString = species.join(",");
        const materialsString = materials.join(",");

        // Construct query string
        const queryString = `speciesArray=${encodeURIComponent(speciesString)}&materialsArray=${encodeURIComponent(materialsString)}`;
        axios
            .post(`http://localhost:8080/api/pattern?${queryString}`, patternData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                alert("pattern added");
            })
            .catch((error) => {
                console.log('Axios error: ', error);
            });
    }


    return (
        <>
            <div className="create-form">
            <fieldset>
                <legend>Pattern name</legend>
                <input type="text" className="form-input-text" onChange={(e) => setPatternName(e.target.value)}/>
            </fieldset>
            <fieldset>
                <legend>Type of fly</legend>
                <SelectList endpoint="pattern/types" setSelectOptionValue={setSelectOptionValue}/>
            </fieldset>
            <fieldset>
                <legend>Image</legend>
                <ImageUpload fileRef={fileRef} />
            </fieldset>
            <fieldset>
                <legend className="hook-container">Hook size</legend>
                   <input type="text" className="form-input-text" onChange={(e) => setHookSizeFrom(e.target.value)} />
                   <input type="text" className="form-input-text" onChange={(e)=> setHookSizeTo(e.target.value)} />
            </fieldset>
            <fieldset>
                <legend>Material</legend>
                <SearchField endpoint="material" setSearchInput={setSearchInput}/>
            </fieldset>
            <fieldset>
                <legend>Species</legend>
                <SearchField endpoint="species" setSearchInput={setSearchInput}/>
            </fieldset>
            <fieldset>
                <legend>Description</legend>
                <textarea className="form-textarea" onChange={(e) => setDescription(e.target.value)}></textarea>
            </fieldset>
            <fieldset>
                <legend>Tying instructions</legend>
                <textarea className="form-textarea" onChange={(e) => setInstruction(e.target.value)}></textarea>
            </fieldset>
            <fieldset>
                <label>For sale</label>
                <input className="for-sale-checkbox" type="checkbox" onChange={handleIsForSaleCheckBoxChange} />
                {isForSale && <label>Price</label>}
                {isForSale && <input  type="text" className="form-input-text" onChange={(e) => setPrice(e.target.value)} />}
            </fieldset>

                <button onClick={handleSubmit}>Upload pattern</button>
            </div>
        </>
    );
}