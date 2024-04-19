import {createContext, useReducer} from "react";

export const TokenContext = createContext(null);
export const TokenDispatchContext = createContext(null);

export function TokenProvider ({children}) {
    const [token, dispatch] = useReducer(
        tokenReducer,
        initialToken
    );

    return (
        <TokenContext.Provider value={{token}}>
            <TokenDispatchContext.Provider value={dispatch}>
                {children}
            </TokenDispatchContext.Provider>
        </TokenContext.Provider>
    );
}

function tokenReducer(token, action) {
    switch(action.type) {
        case 'login': {
            console.log("token in context is: " + action.token);
            return [token, {
                token: action.token
            }];
        }
        case 'logout': {
            console.log("user logged out action logout from context");
            return null;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialToken = [{token: "none"}];