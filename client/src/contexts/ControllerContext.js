import { createContext, useReducer } from "react";
import { controllerReducer } from "../reducers/controllerReducer";
import { apiUrl } from "./constants";
import { SHOW_MESSAGE, HIDE_MESSAGE, SHOW_FULL_POST, HIDE_FULL_POST} from "../reducers/constants";
import axios from "axios";

export const ControllerContext = createContext();

const ControllerContextProvider = ({children}) => {
    const [controllerState, dispatch] = useReducer(controllerReducer, {
        displayMessage: false,
        displayFullPost: false,
        landing: true
    })

    const displayMessage = () => {
        dispatch({
            type: SHOW_MESSAGE
        })
    }

    const hideMessage = () => {
        dispatch({
            type: HIDE_MESSAGE
        })
    }

    const displayFullPost = () => {
        console.log("debug");
        dispatch({
            type: SHOW_FULL_POST
        })
    }

    const hideFullPost = () => {
        dispatch({
            type: HIDE_FULL_POST
        })
    }


    const controllerContextData = {controllerState, displayMessage, hideMessage, displayFullPost, hideFullPost};

    return(
        <ControllerContext.Provider value = {controllerContextData}>
            {children}
        </ControllerContext.Provider>
    )
}


export default ControllerContextProvider;
