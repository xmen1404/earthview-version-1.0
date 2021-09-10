import { useState, useContext } from 'react'
import FacebookLoginBtn from 'react-facebook-login';
import {AuthContext} from "../../contexts/AuthContext";

const FacebookLogin = (props) => {

    // const componentClicked = () => {
    //     console.log("facebook button clicked");
    // }
    const {facebookLoginUser} = useContext(AuthContext)

    const responseFacebook = async (response) => {
        // console.log(response);
        try {
            const loginForm = {
                accessToken: response.accessToken, 
                userId: response.userId
            }

            const loginData = await facebookLoginUser(loginForm);

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

    return (
        <div style = {props.containerStyles}>
            <FacebookLoginBtn
                buttonStyle={props.btnStyles}
                appId="343994363872998"
                autoLoad={false}
                fields="name,email,picture"
                // onClick={() => componentClicked}
                callback={responseFacebook}
            />
        </div>
    )
}

export default FacebookLogin;