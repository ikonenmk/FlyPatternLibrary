import SearchField from "../common/searchField.jsx";
import {useState} from "react";
import SelectList from "../common/selectList.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import error from "eslint-plugin-react/lib/util/error.js";

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
            <div>
                <label>Pattern name</label>
                <input type="text" id="formInputText" onChange={(e) => setPatternName(e.target.value)}/>
            </div>
            <div>
                <label>Type of fly</label>
                <SelectList endpoint="pattern/types" setSelectOptionValue={setSelectOptionValue}/>
            </div>
            <div>
                <label>Hooke size</label>
                <label>from</label>
                <input type="text" id="formInputText" onChange={(e) => setHookSizeFrom(e.target.value)} />
                <label>to</label>
                <input type="text" id="formInputText" onChange={(e)=> setHookSizeTo(e.target.value)} />
            </div>
            <div>
                <label>Material</label>
                <SearchField endpoint="material" setSearchInput={setSearchInput}/>
            </div>
            <div>
                <label>Species</label>
                <SearchField endpoint="species" setSearchInput={setSearchInput}/>
            </div>
            <div>
                <label>Description</label>
                <textarea id="formTextarea" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Tying instructions</label>
                <textarea id="formTextarea" onChange={(e) => setInstruction(e.target.value)}></textarea>
            </div>
            <div>
                <label>For sale</label>
                <input id="forSaleCheckbox" type="checkbox" onChange={handleIsForSaleCheckBoxChange} />
                {isForSale && <label>Price</label>}
                {isForSale && <input  type="text" id="formInputText" onChange={(e) => setPrice(e.target.value)} />}
            </div>
            <div>
                <button onClick={handleSubmit}>Upload pattern</button>
            </div>
        </>
    );
}