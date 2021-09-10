import { createContext, useReducer } from "react";
// import { postLikeReducer } from "../reducers/postLikeReducer";
import { apiUrl } from "./constants";
// import { POSTLIKE_SUCCESS, POSTUNLIKE_SUCCESS } from "../reducers/constants";
import axios from "axios";

export const PostCommentContext = createContext();

const PostCommentContextProvider = ({children}) => {
    // const [postLikeState, dispatch] = useReducer(postLikeReducer, {
    //     likes: [],
    //     isLike: false
    // })

    const commentPost = async (postId, data) => {
        try{
            const url = apiUrl + "/postComment/" + postId;
            // console.log("check data trước khi post news", data);

            const res = await axios.post(url, data);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }


    const repliesComment = async (postId, commentId, data) => {
        try{
            const url = apiUrl + "/postComment/" + postId + "/" + commentId;
            // console.log("check data trước khi post news", data);

            const res = await axios.post(url, data);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }


    const getPostComment = async (postId) => {
        try{
            const url = apiUrl + "/postComment/" + postId;

            const res = await axios.get(url);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }

    const getCommentReplies = async (postId, commentId) => {
        try{
            const url = apiUrl + "/postComment/" + postId + "/" + commentId;

            const res = await axios.get(url);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }




    const deleteComment = async (commentId) => {
        try{
            const url = apiUrl + "/postComment/" + commentId;
            // console.log("check data trước khi post news", data);

            const res = await axios.delete(url);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }

    const updateComment = async (commentId, data) => {
        try{
            const url = apiUrl + "/postComment/"+ commentId;

            // console.log("test update post", data);

            const res = await axios.put(url, data);
            
            // console.log(res.success);
            return res.data;

        }catch(err){
            if(err.response.data){
                // console.log(err.response.data)
                return err.response.data
            }
            else{  
                return {success: false, message: err.message}
            }
        }
    }



    const postCommentContextData = {commentPost, repliesComment, getPostComment, getCommentReplies, deleteComment, updateComment};

    return(
        <PostCommentContext.Provider value = {postCommentContextData}>
            {children}
        </PostCommentContext.Provider>
    )
}


export default PostCommentContextProvider;
