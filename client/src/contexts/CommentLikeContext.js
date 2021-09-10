import { createContext } from "react";
import { apiUrl } from "./constants";
import axios from "axios";

export const CommentLikeContext = createContext();

const CommentLikeContextProvider = ({children}) => {

    const likeComment = async (commentId) => {
        try{
            const url = apiUrl + "/commentLike/" + commentId;
            // console.log("check data trước khi post news", data);

            const res = await axios.post(url);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }


    const unlikeComment = async (commentId) => {
        try{
            const url = apiUrl + "/commentLike/" + commentId;
            // console.log("check data trước khi post news", data);

            const res = await axios.delete(url);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }

    const checkLike = async (commentId) => {
        try{
            const url = apiUrl + "/commentLike/check/" + commentId;
            // console.log("check data trước khi post news", data);

            const res = await axios.get(url);

            return res;

        }catch(error){
            console.log(error);
            return {success: false, message: error};
        }
    }


    const commentLikeContextData = {likeComment, unlikeComment, checkLike};

    return(
        <CommentLikeContext.Provider value = {commentLikeContextData}>
            {children}
        </CommentLikeContext.Provider>
    )
}


export default CommentLikeContextProvider;
