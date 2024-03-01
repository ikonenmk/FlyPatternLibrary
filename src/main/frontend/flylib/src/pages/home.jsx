import {useContext} from "react";
import {store} from "../stores/store.jsx";
import LoginForm from "../components/loginForm.jsx";
import Cookies from "js-cookie";
import axios from "axios";

export default function Home() {
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

    return (
        <>
            <ExampleComponent /> {/* Render ExampleComponent */}
            <LoginForm/>

        </>
    )
}