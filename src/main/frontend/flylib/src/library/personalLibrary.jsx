import "./personalLibrary.css";
import {useContext, useState} from "react";
import SavedPatternsTab from "./savedPatternsTab.jsx";
import CreatedPatternsTab from "./createdPatternsTab.jsx";
import OrdersTabs from "./ordersTab.jsx";
export default function PersonalLibrary() {
    /** Constants **/
    //Tabs array
    const tabs = [
        {title: "Saved Patterns", content: "Saved patterns", datakey: "test1"},
        {title: "Created Patterns", content: "Created patterns", datakey:"test2"},
        {title: "Orders", content: "Orders", datakey: "test3"}
    ];

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
                return <SavedPatternsTab />;
            case "createdPatternTab":
                return <CreatedPatternsTab />;
            case "ordersTab":
                return <OrdersTabs />;
        }
    }
    return(
        <>
            <h2>Name</h2>

            <div className="tab">
                <button data-key="savedPatternTab" className="tablinks" onClick={handleTabClick}>Saved patterns</button>
                <button data-key="createdPatternTab" className="tablinks" onClick={handleTabClick}>Created patterns
                </button>
                <button data-key="ordersTab" className="tablinks" onClick={handleTabClick}>Orders</button>
            </div>
            <div id="tabContent">
                {renderTabContent()}
            </div>

        </>
    );
}