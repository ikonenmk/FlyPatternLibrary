import SearchField from "../common/searchField.jsx";
import {useState} from "react";

export default function CreatePattern() {

    //Input data from user
    const [isForSale, setIsForSale] = useState(false);

    //Handlers
    const handleIsForSaleCheckBoxChange = () => {
        setIsForSale(!isForSale);
    }

    return (
        <>
            <div>
                <label>Pattern name</label>
                <input type="text" id="patternName" />
            </div>
            <div>
                <label>Type of fly</label>
                <SearchField endpoint='pattern/types' />
            </div>
            <div>
                <label>Hooke size</label>
                <label>from</label>
                <input type="text" id="hookSizeFrom" />
                <label>to</label>
                <input type="text" id="hookSizeTo" />
            </div>
            <div>
                <label>Material</label>
                <SearchField endpoint="material" />
                <button>Add</button>
            </div>
            <div>
                <label>Species</label>
                <SearchField endpoint="species"/>
                <button>Add</button>
            </div>
            <div>
                <label>Description</label>
                <textarea></textarea>
            </div>
            <div>
                <label>Tying instructions</label>
                <textarea></textarea>
            </div>
            <div>
                <label>For sale</label>
                <input id="forSaleCheckbox" type="checkbox" onChange={handleIsForSaleCheckBoxChange} />
                {isForSale && <label>Price</label>}
                {isForSale && <input  type="text" />}
            </div>
            <div>
                <button>Upload pattern</button>
            </div>
        </>
    );
}