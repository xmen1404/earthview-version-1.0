import { useState, useContext } from 'react'
// import FacebookLoginBtn from 'react-facebook-login';
import GoogleLoginBtn from 'react-google-login';
import {AuthContext} from "../../contexts/AuthContext";
import "../../styles/googleLogin/googleLogin.css";

const GoogleLogin = (props) => {

    // const componentClicked = () => {
    //     console.log("facebook button clicked");
    // }
    const {googleLoginUser} = useContext(AuthContext)

    // const responseGoogle = async (response) => {
    //     // console.log(response);
    //     try {
    //         const loginForm = {
    //             accessToken: response.accessToken, 
    //             userId: response.userId
    //         }

    //         const loginData = await facebookLoginUser(loginForm);

    //         // console.log(loginData)

    //         if(loginData.success){
    //             // history.push('/');
    //             console.log("login thành công");
    //             // console.log(loginData);
    //             // window.location.href = "/";
    //         } else {
    //             console.log("login không thành công");
    //         }

    //     } catch (error){
    //         console.log(error)
    //     }
    // }

    const responseSuccessGoogle = async (Response) => {
        console.log(Response);
        try {
            const loginForm = {
                tokenId: Response.tokenId
            }

            const loginData = await googleLoginUser(loginForm);

            // console.log(loginData)

            if(loginData.success){
                // history.push('/');
                console.log("login thành công");
                // console.log(loginData);
                // window.location.href = "/";
            } else {
                console.log("login không thành công");
            }

            props.closePanel();

        } catch (error){
            console.log(error)
        }
    }

    const responseErrorGoogle = async (Response) => {
        
    }
    return (
        <div style = {props.containerStyles}>
            <GoogleLoginBtn
                className="googleBtnClass"
                clientId="758282287979-fjtnthm0sborf4g7283cl17nulfp04se.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleLogin;