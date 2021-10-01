import "../../styles/navbar/navbar.css";
import Button from '../button/Button'

// import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ControllerContext } from '../../contexts/ControllerContext';
// import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from '../../contexts/constants';

import chat_icon from "../../assets/chat_icon.png";
import notification_icon from "../../assets/notification_icon.png";
import write_icon from "../../assets/write_icon.png";
import gallery_icon from "../../assets/navbar/gallery_icon.png";
import right_arrow from "../../assets/navbar/right_arrow.png"
import left_arrow from "../../assets/navbar/left_arrow.png"

const Navbar = (props) => {

    const {authState: {authLoading, isAuthenticated, user}, redirectToLogin} = useContext(AuthContext);
    const { controllerState: { displayMessage, isOpenNavbar }, showMessage, hideMessage, closeNavbar, openNavbar } = useContext(ControllerContext);
    // window.onscroll = function() {scrollFunction()};

    // const [isOpenNavbar, setIsOpenNavbar] = useState(true);


    // function scrollFunction() {
    //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //         // document.getElementsByClassName("navbar").style.fontSize = "30px";
    //         // document.getElementsByClassName("navbar");
    //         document.getElementsByClassName("navbar")[0].style.height =  "4.3rem";
    //         document.getElementsByClassName("navbar")[0].style.boxShadow = "0px 0.2rem 0.5rem #ababab";
    //         // document.getElementsByClassName("left")[0].style.marginTop = "0";
    //         // console.log(document.getElementsByClassName("navbar")[0].style);
    //     } else {
    //         // document.getElementsByClassName("navbar").style.fontSize = "90px";
    //         // console.log(document.getElementsByClassName("navbar").style);
    //         document.getElementsByClassName("navbar")[0].style.height =  "5rem";
    //         document.getElementsByClassName("navbar")[0].style.boxShadow = "none";
    //         // document.getElementsByClassName("left")[0].style.marginTop = "2rem";
    //     }
    // }

    // useEffect(() => {
    //     const location = useLocation(); 
    //     console.log("đang ở path", location.pathname)
    // })

    // const location = useLocation(); 
    // console.log("đang ở path", location.pathname);

    const switchOpenNavbar = () => {
        if(isOpenNavbar){
            closeNavbar();
        }
        else{
            openNavbar();
        }
    }


    return (
        <div className = "navbar-container">
            <div className = "tmpnavbar-header"></div>
            <div className = "navbar-header">
                <div className = "navbar">
                    <div className = "left">
                        earthview
                    </div>

                    <div className = "center">
                        <div className = "navbar-item">Dành cho bạn</div>
                        <div className = "navbar-item">Khám phá</div>
                        <div className = "navbar-item">Đang theo dõi</div>
                    </div>


                    {!isAuthenticated &&
                        <div className = "right">
                            <Button 
                                content="Viết Bài"
                                color="white"
                                bgcolor="#295E62"
                                width="25%"
                                height="35%"
                                fontSize="17px"
                                fontWeight="600"
                                paddingTop="0.3rem"
                                paddingBottom="0.3rem"
                                handleClick={redirectToLogin}
                            />
                            <Button 
                                content="Đăng Nhập"
                                color="black"
                                width="25%"
                                height="35%"
                                fontSize="17px"
                                fontWeight="600"
                                border="1px solid gray"
                                // marginLeft="-2rem"
                                paddingTop="0.25rem"
                                paddingBottom="0.3rem"
                                handleClick={redirectToLogin}
                            />
                        </div>
                    }

                    {(isAuthenticated && user) && 
                        <div className = "right">
                            {!isOpenNavbar &&
                                <div className = "total-unread">6</div>
                            }

                            <div className = "close_navbar">
                                <img src = {isOpenNavbar ? right_arrow: left_arrow} onClick = {switchOpenNavbar}></img>
                            </div>


                            {isOpenNavbar &&
                                <div className = "navbar-tools">
                                    <div className = "write_icon icon" onClick = {() => props.createPost()}>
                                        <img src = {write_icon}></img>
                                    </div>

                                    <div className = "chat_icon icon">
                                        <img src = {chat_icon} onClick = {!displayMessage? showMessage : hideMessage}></img>
                                        <div className = "unread">2</div>
                                    </div>

                                    <div className = "notification_icon icon">
                                        <img src = {notification_icon}></img>
                                        <div className = "unread">2</div>
                                    </div>

                                    <div className = "gallery_icon icon">
                                        <img src = {gallery_icon}></img>
                                    </div>
                                </div>
                            }

                            {/* <div className = "write_icon icon" onClick = {() => props.createPost()}>
                                <img src = {write_icon}></img>
                            </div>

                            <div className = "chat_icon icon">
                                <img src = {chat_icon} onClick = {!displayMessage? showMessage : hideMessage}></img>
                                <div className = "unread">2</div>
                            </div>

                            <div className = "notification_icon icon">
                                <img src = {notification_icon}></img>
                                <div className = "unread">2</div>
                            </div>

                            <div className = "gallery_icon icon">
                                <img src = {gallery_icon}></img>
                            </div> */}

                            <div className = "profilepicture icon">
                                <img src = {user.profilePicture}></img>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}


export default Navbar;