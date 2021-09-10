import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, CREATE_POST, POSTSBYID_LOADED_SUCCESS } from "../reducers/constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    // state
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postById:[],
        postLoading: true
    })

    // get all posts
    const getAllPosts = async () => {
        try {
            const url = apiUrl + "/posts";
            // console.log("check data trước khi post news", data);

            const res = await axios.get(url);

            // console.log("debug get post", res);
            
            if(res.data.success){
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: res.data.posts
                })
            }

            // console.log("dispatch done");

        }catch(error){
            dispatch({
                type: POSTS_LOADED_FAIL
            })
            console.log("có lỗi", error);
            // return {success: false, message: error};
        }
    }


    const getPostById = async (userId) => {
        try {
            const url = apiUrl + "/posts/" + userId;
            console.log("check data trước khi post news", url);

            const res = await axios.get(url);

            console.log("debug get post", res);
            
            if(res.data.success){
                dispatch({
                    type: POSTSBYID_LOADED_SUCCESS,
                    payload: res.data.posts
                })
            }

            // console.log("dispatch done");

        }catch(error){
            dispatch({
                type: POSTS_LOADED_FAIL
            })
            console.log("có lỗi", error);
            // return {success: false, message: error};
        }
    }

    const createPost = async (data) => {
        try {
            const url = apiUrl + "/posts";

            // console.log("check post data", data);

            const res = await axios.post(url, data);
            
            // console.log(res.success);
            if(res.data.success){
                // dispatch({
                //     type: CREATE_POST,
                //     payload: res.data.post
                // })
                return res.data;
            }

            return res.data;
        }catch(error){
            return {success: false, message: error};
        }
    }


    const updatePost = async (postId, data) => {
        try{
            const url = apiUrl + "/posts/"+ postId;

            console.log("test update post", data);

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

    const updatePostIncrement = async (postId, data) => {
        try{
            const url = apiUrl + "/posts/increment/"+ postId;

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


    // post context data
    const postContextData = {postState, getAllPosts, getPostById, createPost, updatePost, updatePostIncrement};

    return(
        <PostContext.Provider value = {postContextData}>
            {children}
        </PostContext.Provider>
    )
}


export default PostContextProvider;