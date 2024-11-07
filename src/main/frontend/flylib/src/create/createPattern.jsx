import SearchField from "../common/searchField.jsx";
import {useEffect, useRef, useState} from "react";
import SelectList from "../common/selectList.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import "./createPattern.css";
import ImageUpload from "./imageUpload.jsx";
import {InputValidation} from "../utils/inputValidation.jsx";

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
    const [type, setType] = useState("");
    const [searchInputArray, setSearchInputArray] = useState([]);
    const fileRef = useRef(null);

    // Error handling
    const [errors, setErrors] = useState([
        {hasError: true, errorType: "patternName", errorMsg: "This field cannot be empty"},
        {hasError: true, errorType: "type", errorMsg: "This field cannot be empty"},
        {hasError: true, errorType: "hookSizeFrom", errorMsg: "This field cannot be empty"},
        {hasError: true, errorType: "hookSizeTo", errorMsg: "This field cannot be empty"},
        {hasError: true, errorType: "description", errorMsg: "This field cannot be empty"},
        {hasError: true, errorType: "instruction", errorMsg: "This field cannot be empty"},
        {hasError: true, errorType: "image", errorMsg: "Please chose an image file to upload"},
    ]);
    // Updating image error status
    // Listen for file change through image upload component
    const [fileChanged, setFileChanged] = useState();
    useEffect(() => {
        // if a file has been selected, remove image error
        if(fileRef.current &&  fileRef.current.files.length > 0) {
            const newError = {hasError: false, errorType: "image", errorMsg: ""};
            const updatedErrors = errors.map(error => {
                if(error.errorType === "image") {
                    // change error specific to this type of input
                    return newError;
                } else {
                    // leave rest of error array unchanged
                    return error;
                }
            })
            setErrors(updatedErrors);
        }
    },[fileChanged]);

    // Button enable/disable based on errors
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        // Check if there are any errors, if so disable button
        if(errors.some((error) => error.hasError === true)) {
            setIsButtonDisabled(true);
        } else { // if no errors, enable submit button
            setIsButtonDisabled(false);
        }
    }, [errors]);



    // Type of flies available for user to pick
    const selectListData = ['Dryfly', 'Wetfly', 'Streamer', "Nymph"];

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

    // Input validation
    const handleInput = async (e) => {
        const inputString = e.target.value;
        const inputType = e.target.id;
        // Check if input is empty, if so create error
        if(inputString === "") {
            const newError = {hasError: true, errorType: inputType, errorMsg: "This field cannot be empty"};
            const updatedErrors = errors.map(error => {
                if(error.errorType === inputType) {
                    // change error specific to this type of input
                    return newError;
                } else {
                    // leave rest of error array unchanged
                    return error;
                }
            })
            setErrors(updatedErrors);
        }
        // Check is empty, if not validate input
        if (inputString !== "") {
            const inputIsValid = await InputValidation(inputString, inputType);
            // If valid, set variables to input
            if (inputIsValid === true) {
                const newError = {hasError: false, errorType: inputType, errorMsg: ""};
                const updatedErrors = errors.map(error => {
                    if(error.errorType === inputType) {
                        // change error specific to this type of input
                        return newError;
                    } else {
                        // leave rest of error array unchanged
                        return error;
                    }
                })
                setErrors(updatedErrors);
                // Check which type of input, then change variable
                if (inputType === "patternName") {
                    setPatternName(inputString);
                }
                if (inputType === "type") {
                    setSelectOptionValue(inputString);
                }
                if (inputType === "hookSizeFrom") {
                    setHookSizeFrom(inputString);
                }
                if (inputType === "hookSizeTo") {
                    setHookSizeTo(inputString);
                }
                if (inputType === "description") {
                    setDescription(inputString);
                }
                if (inputType === "instruction") {
                    setInstruction(inputString);
                }
            }
            else { // If validation fails, set error
                const newError = {hasError: true, errorType: inputType, errorMsg: inputIsValid};
                const updatedErrors = errors.map(error => {
                    if(error.errorType === inputType) {
                        // change error specific to this type of input
                        return newError;
                    } else {
                        // leave rest of error array unchanged
                        return error;
                    }
                })
                setErrors(updatedErrors);
            }
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

    // function for storing image on submit and returning image name to be used for img url
    const storeImage = async () => {
        const files = fileRef.current.files;
        const formData = new FormData();
        let imageUrl = "";
        // add chosen file to formData
        [...files].forEach((file) => {
            // Transform name of file
            const newFileName = Math.random().toString(36).slice(2) +"_"+ file.name.replaceAll(/\s/g ,"");
            const newFile = new File([file], newFileName, {type: file.type});
            formData.append('file', newFile);
            imageUrl = newFile.name;
        })
        // post to DB
        try {
            const response = await axios.post(`http://localhost:8080/api/pattern/uploadimage`, formData, {
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log("File uploaded");
             return imageUrl;
        } catch (error) {
                console.error('Error uploading image:', error);
                return null;
            }
    }

    const handleSubmit = async () => {
        // Store image and generate img url
        const imgUrl = await storeImage();

        // Alert user if image upload failed
        if(!imgUrl) {
            alert("Image upload failed, try again");
            return;
        }

        //Create date and timestamp and convert to (java) LocalDateTime format
        const dateTime = new Date().toISOString();
        console.log("Ok so setting all variables, imgUrl is: " +imgUrl);
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
            <div className="rubric">
                <h1>Upload a new pattern</h1>
            </div>
            <div className="create-form">
            <fieldset>
                <legend>Pattern name</legend>
                <input type="text" className="form-input-text" id="patternName" onChange={(e) => handleInput(e)}/>
                    {
                       errors.find((error) => error.errorType === "patternName").hasError ?
                        <p className="error-text">
                            {errors.find((error) => error.errorType === "patternName").errorMsg}
                        </p>
                            :
                            ""
                    }

            </fieldset>
                <fieldset>
                    <legend>Type of fly</legend>
                    <select className="select-type" id="type"
                            onChange={(e) => handleInput(e)}
                    >
                        {selectListData.map((type) =>
                            <option key={type} value={type}>{type}</option>
                        )}
                    </select>
                    {
                        errors.find((error) => error.errorType === "type").hasError ?
                            <p className="error-text">
                                {errors.find((error) => error.errorType === "type").errorMsg}
                            </p>
                            :
                            ""
                    }
                </fieldset>
                <fieldset>
                    <legend>Image</legend>
                    <ImageUpload fileRef={fileRef} setFileChanged={setFileChanged} />
                    {
                        errors.find((error) => error.errorType === "image").hasError ?
                            <p className="error-text">
                                {errors.find((error) => error.errorType === "image").errorMsg}
                            </p>
                            :
                            ""
                    }
                </fieldset>
                <fieldset>
                    <legend className="hook-container">Hook size</legend>
                    <p>From (hook size number):</p>
                    <input type="text" id="hookSizeFrom" className="form-input-text" onChange={(e) => handleInput(e)} />
                    {
                        errors.find((error) => error.errorType === "hookSizeFrom").hasError ?
                            <p className="error-text">
                                {errors.find((error) => error.errorType === "hookSizeFrom").errorMsg}
                            </p>
                            :
                            ""
                    }
                    <p>To (hook size number):</p>
                   <input type="text" id="hookSizeTo" className="form-input-text" onChange={(e)=> handleInput(e)} />
                    {
                        errors.find((error) => error.errorType === "hookSizeTo").hasError ?
                            <p className="error-text">
                                {errors.find((error) => error.errorType === "hookSizeTo").errorMsg}
                            </p>
                            :
                            ""
                    }
                </fieldset>
                <fieldset className="material-fieldset">
                    <legend>Material</legend>
                    <div className="material-search-field">
                        <SearchField endpoint="material" id="material" setSearchInput={setSearchInput}/>
                    </div>
                </fieldset>
                <fieldset className="species-fieldset">
                <div className="species-search-field">
                    <legend>Species</legend>
                    <SearchField endpoint="species" id="species" setSearchInput={setSearchInput}/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Description</legend>
                <textarea className="form-textarea" id="description" onChange={(e) => handleInput(e)}></textarea>
                {
                    errors.find((error) => error.errorType === "description").hasError ?
                        <p className="error-text">
                            {errors.find((error) => error.errorType === "description").errorMsg}
                        </p>
                        :
                        ""
                }
            </fieldset>
            <fieldset>
                <legend>Tying instructions</legend>
                <textarea className="form-textarea" id="instruction" onChange={(e) => handleInput(e)}></textarea>
                {
                    errors.find((error) => error.errorType === "instruction").hasError ?
                        <p className="error-text">
                            {errors.find((error) => error.errorType === "instruction").errorMsg}
                        </p>
                        :
                        ""
                }
            </fieldset>
            <fieldset>
                <div className="for-sale-container">
                    <label>For sale</label>
                    <div className="checkbox-wrapper">
                        <input className="for-sale-checkbox" type="checkbox" onChange={handleIsForSaleCheckBoxChange}/>
                    </div>
                </div>
                <div className="for-sale-container-dropdown">
                {isForSale && <label>Price</label>}
                    {isForSale && <input  type="text" className="form-input-text" onChange={(e) => setPrice(e.target.value)} />}
                </div>
            </fieldset>
                <div className="add-button-container">
                    <button disabled={isButtonDisabled} className={isButtonDisabled ? 'button-disabled' : 'button-enabled'} onClick={handleSubmit}>Upload pattern</button>
                </div>
            </div>
        </>
    );
}