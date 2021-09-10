import { POSTLIKE_SUCCESS, POSTUNLIKE_SUCCESS } from "./constants"

export const postLikeReducer = (state, action) => {
    const {type, payload} = action 

    switch(type) {
        case POSTLIKE_SUCCESS:
            return{
                ...state,
                isLike: true
            };
        case POSTUNLIKE_SUCCESS:
            return{
                ...state,
                isLike: false
            };
        default:
            return state;
    }
}