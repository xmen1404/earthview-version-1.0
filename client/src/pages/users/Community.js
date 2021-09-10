import Navbar from "../../components/navbar/Navbar-v2";
import LoginPanel from "../../components/loginPanel/LoginPanel";
import NewPost from "../../components/newpost/NewPost";
import UserProfile from "../../components/userProfile/UserProfile.js";
import "../../styles/pages/users/community.css";
import CommunityBody from "../../components/communityBody/CommunityBody";
import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";


const Community = () => {
    // javaScript here
    const {authState: {flagShowLoginPanel}} = useContext(AuthContext);

    // const [flagShowLoginPanel, setFlagShowLoginPanel] = useState(false);
    const [isCreatePost, setIsCreatePost] = useState(false);

    const [isUserProfile, setIsUserProfile] = useState(false);

    

    const createPost = () => {
        setIsCreatePost(!isCreatePost);

        if(document.body.style.overflowY === "hidden"){
            document.body.style.overflowY = "scroll";
        }
        else{
            document.body.style.overflowY = "hidden";
        }
    }

    const openUserProfile = () => {
        setIsUserProfile(!isUserProfile);

        if(document.body.style.overflowY === "hidden"){
            document.body.style.overflowY = "scroll";
        }
        else{
            document.body.style.overflowY = "hidden";
        }
    }

    // console.log(isAuthenticated, user);

    return (
        <div className = "community">
            {flagShowLoginPanel &&
                <LoginPanel/>
            }

            {isCreatePost &&
                <NewPost closeCreatePost = {createPost}></NewPost>
            }

            <Navbar createPost = {createPost}></Navbar>
            <CommunityBody></CommunityBody>

            {isUserProfile && 
                <UserProfile closeUserProfile={openUserProfile}></UserProfile>
            }

            <button onClick={openUserProfile}>Test User Profile Page</button>
        
        </div>
    )
}   

export default Community;