import { SHOW_LOGIN_PANEL } from "./constants"

export const authReducer = (state, action) => {
    const {type, payload : {isAuthenticated, user}} = action 

    switch(type) {
        case 'SET_AUTH':
            return{
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }

        case SHOW_LOGIN_PANEL:
            return{
                ...state,
                flagShowLoginPanel: !state.flagShowLoginPanel
            }

        default:
            return state
    }
}