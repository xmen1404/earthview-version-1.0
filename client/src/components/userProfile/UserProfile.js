import "../../styles/userProfile/userProfile.css";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { AuthContext } from "../../contexts/AuthContext";
import wallDemo from "../../assets/EarthView's Story Background (Unsplash).jpg";
import AdjustIcon from "../../assets/adjust.png"
import CheckWhiteIcon from "../../assets/check_white.png";
import CameraWhiteIcon from "../../assets/camera_white3.png"
import CameraBlackIcon from "../../assets/black_camera.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import GoogleIcon from "../../assets/GoogleIcon.png";
import DefaultWallImage from "../../assets/default_wallimage.jpg";
import profileImgDemo from "../../assets/Icon_8.jpg";
import PostSummaryItem from "../../components/postSummaryItem/PostSummaryItem.js";
import PostItem from "../postItem/PostItem";
import RoundButton from '../roundbutton/RoundButton';
import cross_icon from "../../assets/cross_icon.png";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from '../../contexts/constants';
import axios from 'axios';

const UserProfile = (props) => {
    const {postState: {postLoading, postById}, getPostById, updatePostIncrement} = useContext(PostContext);
    const {authState: {authLoading, user}} = useContext(AuthContext);
    

    const [adjustArea, setAdjustArea] = useState(true);
    const [isAdjust, setIsAdjust] = useState(false);
    // const [wallImage, setWallImage] = useState(user.wallimage);
    // const [profileImage, setProfileImage] = useState(user.profilePicture);

    const [wallImage, setWallImage] = useState("");
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        console.log("getting post", user._id);
        getPostById(user._id);
    }, [])


    // console.log(document.getElementsByClassName("userProfile-content"));
    // document.getElementsByClassName("userProfile-content").onscroll = () => {scrollFunction()};

    const scrollFunction = () => {
        // console.log("scrolling");
        if (document.getElementsByClassName("userProfile-content")[0].scrollTop > 200) {
            if(adjustArea){
                setAdjustArea(false);
            }
        } else {
            if(!adjustArea){
                setAdjustArea(true);
            }
        }
    }

    const showAdjust = () => {
        console.log("heleoo");
        setIsAdjust(true);
        document.getElementsByClassName("userProfile-content")[0].style.overflow = "hidden";
    }


    const saveProfile = () => {

    }




    const handleChangeImage = async (event, type) => {
        try{
            const url = apiUrl + '/uploads';
            // const header = "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)

            const formData = new FormData();

            formData.append("file", event.target.files[0]);

            // const res = await axios.post(url, formData, {
            //     headers:{
            //         Authorization: header
            //     }
            // })

            const res = await axios.post(url, formData);

            // console.log("check res", res.data.url);

            // setState({
            //     ...state,
            //     backgroundUrl: res.data.url
            // })

            if(type === 0){
                setWallImage(res.data.url);
            }
            else if(type === 1){
                setProfileImage(res.data.url);
            }

            // return(list);

        }catch(err){
            console.log(err);
        }
    }


    return (
        <div className="userProfile-container" >
            <div className="userProfile-background"></div>
            <div className="userProfile-innerContainer">
                <div className="userProfile-left-tools"></div>
                <div className="userProfile">
                    <div className="userProfile-content" onScroll={scrollFunction}>
                        <div className="user-wall-img">
                            
                            <img src={wallImage !== "" ? wallImage : (user.wallimage ? user.wallimage: DefaultWallImage)}></img>
                            {isAdjust && 
                                <div className = "user-wall-img-adjust">
                                    <input type="file" name="file" onChange={(event) => handleChangeImage(event, 0)} id="file-button-wallimage" style={{display:"none"}}/>
                                    <label for="file-button-wallimage">
                                        <div style = {{
                                            display: "flex",
                                            flexFirection: "row"
                                        }}>
                                            <img src = {CameraWhiteIcon}></img>
                                            Thay đổi ảnh bìa
                                        </div>
                                    </label>
                                </div>
                            }
                        </div>
                        <div className="UserProfile-author">

                            {!isAdjust &&
                                <div 
                                    // style = {isAdjust? { background: "#cecece" } : {}}
                                    className = "accountFrom"
                                >
                                    <img
                                        style = {{width: "100%"}}
                                        src = {user.accountType === "facebook" ? FacebookIcon: GoogleIcon} alt = "account"></img>
                                </div>
                            }

                            {isAdjust &&
                                <div>
                                    <input type="file" name="file" onChange={(event) => handleChangeImage(event, 1)} id="file-button-profileimage" style={{display:"none"}}/>
                                    <label for="file-button-profileimage">
                                        <div 
                                            style = {{ background: "#cecece" }}
                                            className = "accountFrom"
                                        >
                                            <img
                                                style = {{width: "64%"}}
                                                src = { CameraBlackIcon } alt = "account"></img>
                                        </div>  
                                    </label>
                                </div>

                            }


                            <div className="user-profile-img">
                                <img src={profileImage !== "" ? profileImage : user.profilePicture}></img> 
                                {/* <div className = "accountFrom"></div> */}
                            </div>
                            <div className="user-name">
                                {user.name}
                            </div>
                            <div className="user-interactions">
                                <div className="post-count">
                                    <strong>{postById.length}</strong> Bài Viết
                                </div>
                                <div className="following">
                                    <strong>27</strong> đang follow
                                </div>
                                <div className="follower">
                                    <strong>101</strong> follower
                                </div>
                            </div>

                            <div className="post-summary">
                                <div className="post-summary-item">
                                    <PostSummaryItem data={{
                                        postImg: {wallDemo},
                                        heart: 111, 
                                        comment: 222, 
                                        share: 333,
                                    }}></PostSummaryItem>
                                </div>
                                <div className="post-summary-item">
                                    <PostSummaryItem data={{
                                        postImg: {wallDemo},
                                        heart: 111, 
                                        comment: 222, 
                                        share: 333,
                                    }}></PostSummaryItem>
                                </div>
                                <div className="post-summary-item">
                                    <PostSummaryItem data={{
                                        postImg: {wallDemo},
                                        heart: 111, 
                                        comment: 222, 
                                        share: 333,
                                    }}></PostSummaryItem>
                                </div>
                                
                            </div>
                        </div>
                        
                        {/* use data to handle user post list here */}
                        <div className="userProfile-postList">
                            {
                                postById.map((post) => {
                                    return <PostItem key = {post._id} data = {post} updatePostIncrement = {updatePostIncrement}
                                    openUserProfile={true}
                                    type={0}></PostItem>
                                })
                            }
                        </div>

                    </div>
                </div>
                <div className="userProfile-right-tools">
                    <div className="userProfile-close-post">
                        <RoundButton 
                            content = "Thoát"
                            contentColor = "rgba(255, 255, 255, 0.85)"
                            background = {cross_icon}
                            radius = "2.5rem"
                            handleClick = {props.closeUserProfile}
                            backgroundColor = "rgba(238, 238, 238, 0.8)"
                        ></RoundButton>
                        {(adjustArea && !isAdjust) && 
                            <RoundButton 
                                content = "Chỉnh sửa"
                                contentColor = "rgba(255, 255, 255, 0.85)"
                                background = {AdjustIcon}
                                backgroundSize = "1.5rem"
                                radius = "2.5rem"
                                handleClick = {showAdjust}
                                backgroundColor = "rgba(238, 238, 238, 0.8)"
                                // backgroundColor = "#295E62"
                            ></RoundButton>
                        }

                        {isAdjust &&
                            <RoundButton 
                                content = "Lưu"
                                contentColor = "rgba(255, 255, 255, 0.85)"
                                background = {CheckWhiteIcon}
                                backgroundSize = "1rem"
                                radius = "2.5rem"
                                handleClick = {saveProfile}
                                // backgroundColor = "rgba(238, 238, 238, 0.8)"
                                backgroundColor = "#295E62"
                            ></RoundButton>
                        }


                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;