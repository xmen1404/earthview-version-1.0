import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, CREATE_POST, POSTSBYID_LOADED_SUCCESS } from "./constants"

export const postReducer = (state, action) => {
    const {type, payload} = action 

    switch(type) {
        case POSTS_LOADED_SUCCESS:
            return{
                ...state,
                posts: payload,
                postloading: false
            };
        case POSTS_LOADED_FAIL:
            return{
                ...state,
                posts: [],
                postloading: false
            };
        case POSTSBYID_LOADED_SUCCESS:
            return{
                ...state,
                postById: payload,
                postloading: false
            };
        case CREATE_POST:
            return{
                ...state,
                posts: [...state.posts, payload]
            };
        default:
            return state;
    }
}