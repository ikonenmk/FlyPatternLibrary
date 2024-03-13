import SearchField from "../common/searchField.jsx";
import {useState} from "react";

export default function CreatePattern() {

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
    const [types, setTypes] = useState([]);

    const [autoSearchInput, setAutoSearchInput] = useState("");

    const setAutoSearchValue = (newValue) => {
        setAutoSearchInput(newValue);
    }
    //Handlers
    const handleIsForSaleCheckBoxChange = () => {
        setIsForSale(!isForSale);
    }

    const handleAddMaterial = () => {
        materials.push()
    }
    const handleSubmit = () => {

    }


    return (
        <>
            <div>
                <label>Pattern name</label>
                <input type="text" id="formInputText" onChange={(e) => setPatternName(e.target.value)}/>
            </div>
            <div>
                <label>Type of fly</label>
                <SearchField endpoint='pattern/types' setAutoSearchValue={setAutoSearchValue}/>
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
                <SearchField endpoint="material" setAutoSearchValue={setAutoSearchValue}/>
                <button>Add</button>
            </div>
            <div>
                <label>Species</label>
                <SearchField endpoint="species" setAutoSearchValue={setAutoSearchValue}/>
                <button>Add</button>
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
                <button>Upload pattern</button>
            </div>
        </>
    );
}