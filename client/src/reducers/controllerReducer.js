import { SHOW_MESSAGE, HIDE_MESSAGE, SHOW_FULL_POST, HIDE_FULL_POST } from "./constants"

export const controllerReducer = (state, action) => {
    const {type, payload} = action 

    switch(type) {
        case SHOW_MESSAGE:
            return{
                ...state,
                displayMessage: true,
                landing: false
            };
        case HIDE_MESSAGE:
            return{
                ...state,
                displayMessage: false,
                landing: true
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
            }

        default:
            return state
    }
}