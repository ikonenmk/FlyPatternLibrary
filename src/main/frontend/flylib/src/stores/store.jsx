import {createContext, useEffect, useReducer, useState} from "react";
import axios from "axios";


const initialState = {
    color: "yellow"
};

const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "CHANGE_COLOR":
                return {...state, color: action.payload};
            default:
                throw new Error();
        }
    }, initialState);
    return <Provider value={{state, dispatch}}>{children}</Provider>
};
export {store,StateProvider};