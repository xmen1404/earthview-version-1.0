import { createContext, useReducer } from "react";
import { controllerReducer } from "../reducers/controllerReducer";
import { apiUrl } from "./constants";
import { 
        SHOW_MESSAGE, HIDE_MESSAGE, SHOW_FULL_POST, 
        HIDE_FULL_POST, SHOW_POST_COMMENT, HIDE_POST_COMMENT, 
        SWITCH_POST, CLOSE_NAVBAR, OPEN_NAVBAR
    } from "../reducers/constants";
import axios from "axios";

export const ControllerContext = createContext();

const ControllerContextProvider = ({children}) => {
    const [controllerState, dispatch] = useReducer(controllerReducer, {
        displayMessage: false,
        displayFullPost: false,
        displayPostComment: true,
        landing: true,
        currentPost: "",
        isOpenNavbar: true,
    })

    const showMessage = () => {
        console.log("showing chat...")
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

    const switchCurrentPost = (postId) => {
        dispatch({
            type: SWITCH_POST,
            payload: {
                postId: postId
            }
        })
    }


    // const displayPostComment = () => {
    //     console.log("debug");
    //     dispatch({
    //         type: SHOW_POST_COMMENT
    //     })
    // }

    // const hidePostComment = () => {
    //     dispatch({
    //         type: HIDE_POST_COMMENT
    //     })
    // }

    const closeNavbar = () => {
        dispatch({
            type: CLOSE_NAVBAR,
        })
    }

    const openNavbar = () => {
        dispatch({
            type: OPEN_NAVBAR,
        })
    }


    const controllerContextData = {
        controllerState, showMessage, hideMessage, 
        displayFullPost, hideFullPost, switchCurrentPost,
        closeNavbar, openNavbar
    };

    return(
        <ControllerContext.Provider value = {controllerContextData}>
            {children}
        </ControllerContext.Provider>
    )
}


export default ControllerContextProvider;
