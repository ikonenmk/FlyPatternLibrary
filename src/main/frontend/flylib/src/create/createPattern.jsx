import SearchField from "../common/searchField.jsx";
import {useEffect, useState} from "react";
import SelectList from "../common/selectList.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./createPattern.css";

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
    const [imgUrl, setImgUrl] = useState("");
    const [type, setType] = useState("");
    const [searchInputArray, setSearchInputArray] = useState([]);
    //get username from server
    const [username, setUsername] = useState("");
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/auth/username', config)
            .then((response) => {
                console.log(response.data);
                setUsername(response.data);
            })
            .catch((error) => {
                console.log('Axios request error: ', error);
            });
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

    const handleSubmit = () => {
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
            "img_url": imgUrl,
            "for_sale": isForSale,
            "price" : price,
            "created": dateTime,
            "user_id": 1 //TODO: hardcoded
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