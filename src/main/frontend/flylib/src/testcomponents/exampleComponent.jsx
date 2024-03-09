import {useContext} from "react";
import {store} from "./store.jsx";

//useContext component, not used
const ExampleComponent = () => {
    const { state, dispatch } = useContext(store);
    const changeColor = () => {
        dispatch({ type: "CHANGE_COLOR", payload: "blue" });
    };
    return (
        <>
            <div>
                <h2>Example Component</h2>
                <p>Current color: {state.color}</p>
                <button onClick={changeColor}>Change Color</button>
            </div>
        </>
    );
};