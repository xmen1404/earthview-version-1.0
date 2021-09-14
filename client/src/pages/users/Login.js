import "../../styles/pages/users/login.css";

import FacebookLogin from "../../components/facebookLogin/FacebookLogin";
import GoogleLogin from "../../components/googleLogin/GooleLogin";

import FacebookIcon from "../../assets/login/facebook_icon.png";
import GoogleIcon from "../../assets/login/google_icon.png";

import {useContext, useEffect} from 'react';
import {AuthContext} from "../../contexts/AuthContext";


const Login = () => {

    const {authState: {isAuthenticated}} = useContext(AuthContext);

    // useEffect(() => {
    //     if(isAuthenticated){
    //         window.location.href = "/";
    //     }
    // })

    if(!isAuthenticated){
        return (
            <div className = "loginPage-container">
                <div className="loginPage-background"></div>
                <div className="loginPage-body">
                    <div className="loginPage-welcome">
                        <div className="loginPage-name">earthview</div>
                        <div className="loginPage-quote">Cùng earthview lan tỏa những câu chuyện!</div>
                    </div>
                    <div className="loginPage-method">
                        <div className="loginPage-facebook">
                            <FacebookLogin 
                                containerStyles = {{
                                    // width: "75%",
                                    // margin: "1.5rem auto",
                                    // marginTop: "2rem",
                                    width: "100%",
                                    position: "absolute",
                                    top: "0",
                                    height: "100%",
                                    opacity: "0"
                                }}
                                btnStyles = {{
                                    width: "100%",
                                    height: "100%",
                                    // lineHeight: "3rem"
                                    padding: "0",
                                    // fontSize: "1rem"
                                    borderRadius: "20px"
                                }}>
                            </FacebookLogin>
                            <img src = {FacebookIcon} alt = "login with Facebook"/>
                            Đăng nhập bằng Facebook
                        </div>
                        <div className="loginPage-google">
                            <GoogleLogin
                                containerStyles = {{
                                    // width: "75%",
                                    // margin: "1.5rem auto",
                                    // marginBottom: "2rem"
                                    // borderRadius: "8px"
                                    width: "100%",
                                    position: "absolute",
                                    top: "0",
                                    height: "100%",
                                    borderRadius:"20px",
                                    opacity: "0"
                                }}>
                            </GoogleLogin>
                            <img src = {GoogleIcon} alt = "login with Google"/>
                            Đăng nhập bằng google
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        window.location.href = "/";
        return null;
    }
}

export default Login;