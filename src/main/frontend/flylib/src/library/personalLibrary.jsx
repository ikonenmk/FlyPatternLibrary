import {useContext, useEffect, useState} from "react";
import SavedPatternsTab from "./savedPatternsTab.jsx";
import CreatedPatternsTab from "./createdPatternsTab.jsx";
import OrdersTabs from "./ordersTab.jsx";
import {useAuth} from "../contexts/authContext.jsx";
import PatternAccordion from "./patternAccordion.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import "./personalLibrary.css"

export default function PersonalLibrary() {
    // Data for auth
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    /** Hooks **/
    // Get username from server
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


    /** States **/
    const [activeTab, setActiveTab] = useState("savedPatternTab");

    /** Handlers **/
    const handleTabClick = (e) => {
        setActiveTab(e.target.dataset.key);
    }

    //Rendering of tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case "savedPatternTab":
                return <SavedPatternsTab username={username}/>;
            case "createdPatternTab":
                return <CreatedPatternsTab username={username}/>;
            case "ordersTab":
                return <OrdersTabs />;
        }
    }
    return(
        <>
            <div className="rubric">
                <h1>Personal Library</h1>
            </div>
            <div className="tab-container">
                <div className="tabs">
                    <button data-key="savedPatternTab" className="tablinks" onClick={handleTabClick}>
                        Saved patterns
                    </button>
                    <button data-key="createdPatternTab" className="tablinks" onClick={handleTabClick}>
                        Created patterns
                    </button>
                </div>
                <div id="tabContent">
                    {renderTabContent()}
                </div>
            </div>

        </>
    );
}