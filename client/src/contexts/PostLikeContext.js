import { createContext, useReducer } from "react";
import { postLikeReducer } from "../reducers/postLikeReducer";
import { apiUrl } from "./constants";
import { POSTLIKE_SUCCESS, POSTUNLIKE_SUCCESS } from "../reducers/constants";
import axios from "axios";

export const PostLikeContext = createContext();

const PostLikeContextProvider = ({children}) => {
    // const [postLikeState, dispatch] = useReducer(postLikeReducer, {
    //     likes: [],
    //     isLike: false
    // })

    const likePost = async (postId) => {
        try{
            const url = apiUrl + "/postLike/" + postId;
            // console.log("check data trước khi post news", data);

            const res = await axios.post(url);

            // console.log("debug get post", res);
            
            // if(res.data.success){
            //     dispatch({
            //         type: POSTLIKE_SUCCESS
            //     })
            // }

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }


    const unlikePost = async (postId) => {
        try{
            const url = apiUrl + "/postLike/" + postId;
            // console.log("check data trước khi post news", data);

            const res = await axios.delete(url);

            // console.log("debug get post", res);
            
            // if(res.data.success){
            //     dispatch({
            //         type: POSTUNLIKE_SUCCESS
            //     })
            // }

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }

    const checkLike = async (postId) => {
        try{
            const url = apiUrl + "/postLike/check/" + postId;
            // console.log("check data trước khi post news", data);

            const res = await axios.get(url);

            // console.log("debug get post", res);
            
            // if(res.data.success && res.data.isLike){
            //     dispatch({
            //         type: POSTLIKE_SUCCESS
            //     })
            // }

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }


    const postLikeContextData = {likePost, unlikePost, checkLike};

    return(
        <PostLikeContext.Provider value = {postLikeContextData}>
            {children}
        </PostLikeContext.Provider>
    )
}


export default PostLikeContextProvider;
