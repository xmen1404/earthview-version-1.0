import { SHOW_MESSAGE, HIDE_MESSAGE, SHOW_FULL_POST, HIDE_FULL_POST, SHOW_POST_COMMENT, HIDE_POST_COMMENT, SWITCH_POST } from "./constants"

export const controllerReducer = (state, action) => {
    const {type, payload} = action 

    switch(type) {
        case SHOW_MESSAGE:
            return{
                ...state,
                displayMessage: true,
                // landing: false,
                displayPostComment: false
            };
        case HIDE_MESSAGE:
            return{
                ...state,
                displayMessage: false,
                // landing: true,
                displayPostComment: true
            };
        case SHOW_FULL_POST:
            return{
                ...state,
                displayMessage: false,
                displayFullPost: true,
                landing: false,
            };
        case HIDE_FULL_POST:
            return{
                ...state,
                displayMessage: false,
                displayFullPost: false,
                landing: true
            };
        case SWITCH_POST:
            return{
                ...state,
                currentPost: payload.postId,
                landing: payload.postId !== "" ? false : true
            }
        // case SHOW_POST_COMMENT:
        //     return{
        //         ...state,
        //         displayMessage: false,
        //         displayFullPost: true,
        //         landing: false,
        //     };
        // case HIDE_POST_COMMENT:
        //     return{
        //         ...state,
        //         displayMessage: false,
        //         displayFullPost: false,
        //         landing: true
        //     }

        default:
            return state
    }
}