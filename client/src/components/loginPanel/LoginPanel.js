import "../../styles/loginPanel/LoginPanel.css"
import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import FacebookLogin from "../../components/facebookLogin/FacebookLogin";
import GoogleLogin from "../../components/googleLogin/GooleLogin";

const LoginPanel = (props) => {

    // props.pushShowLoginPanel(showLoginPanel);
    // console.log(props);
    const { showLoginPanel } = useContext(AuthContext);



    return (
        <div className="loginPanel-container">
            <div className="loginPanel">
                <div className="loginPanel-header">
                    <span className="loginPanel-text">Đăng nhập</span>
                    <button className="loginPanel-close" onClick={showLoginPanel}>&#x2716;</button>
                </div>

                {/* <hr></hr> */}

                {/* facebook login */}
                {/* <div className="loginPanel-method" onClick={props.facebookLogin}>
                    <table>
                        <tr>
                            <th>
                                <img src="#" alt="Flogo"/>
                            </th>
                            <th>
                                Đăng nhập bằng Facebook
                            </th>
                        </tr>
                    </table>
                </div> */}

                <FacebookLogin 
                    closePanel = {showLoginPanel}
                    containerStyles = {{
                        width: "75%",
                        margin: "1.5rem auto",
                        marginTop: "2rem"
                        // borderRadius: "8px"
                    }}
                    btnStyles = {{
                        width: "100%",
                        height: "3rem",
                        // lineHeight: "3rem"
                        padding: "0",
                        // fontSize: "1rem"
                        borderRadius: "5px"
                }}></FacebookLogin>
            


                {/* google login */}
                {/* <div className="loginPanel-method" onClick={props.googleLogin}>
                    <table>
                        <tr>
                            <th>
                                <img src="#" alt="GGlogo"/>
                            </th>
                            <th>
                                Đăng nhập bằng Google
                            </th>
                        </tr>
                    </table>
                </div> */}
                <GoogleLogin
                    closePanel = {showLoginPanel}
                    containerStyles = {{
                        width: "75%",
                        margin: "1.5rem auto",
                        marginBottom: "2rem"
                        // borderRadius: "8px"
                }}></GoogleLogin>

                <div className="loginPanel-description">
                    Cùng earthview lan tỏa những câu chuyện!
                </div>
            </div>
        </div>
    );



    // if(props.flagShowLoginPanel) {
    //     return (
    //         <div className="loginPanel-container">
    //             <div className="loginPanel">
    //                 <div className="loginPanel-header">
    //                     <span className="loginPanel-text">Đăng nhập</span>
    //                     <button className="loginPanel-close" onClick={props.hideLoginPanel}>&#x2716;</button>
    //                 </div>

    //                 {/* <hr></hr> */}

    //                 {/* facebook login */}
    //                 {/* <div className="loginPanel-method" onClick={props.facebookLogin}>
    //                     <table>
    //                         <tr>
    //                             <th>
    //                                 <img src="#" alt="Flogo"/>
    //                             </th>
    //                             <th>
    //                                 Đăng nhập bằng Facebook
    //                             </th>
    //                         </tr>
    //                     </table>
    //                 </div> */}

    //                 <FacebookLogin 
    //                     containerStyles = {{
    //                         width: "75%",
    //                         margin: "1.5rem auto",
    //                         marginTop: "2rem"
    //                         // borderRadius: "8px"
    //                     }}
    //                     btnStyles = {{
    //                         width: "100%",
    //                         height: "3rem",
    //                         // lineHeight: "3rem"
    //                         padding: "0",
    //                         // fontSize: "1rem"
    //                         borderRadius: "5px"
    //                 }}></FacebookLogin>
                


    //                 {/* google login */}
    //                 {/* <div className="loginPanel-method" onClick={props.googleLogin}>
    //                     <table>
    //                         <tr>
    //                             <th>
    //                                 <img src="#" alt="GGlogo"/>
    //                             </th>
    //                             <th>
    //                                 Đăng nhập bằng Google
    //                             </th>
    //                         </tr>
    //                     </table>
    //                 </div> */}
    //                 <GoogleLogin
    //                     containerStyles = {{
    //                         width: "75%",
    //                         margin: "1.5rem auto",
    //                         marginBottom: "2rem"
    //                         // borderRadius: "8px"
    //                 }}></GoogleLogin>

    //                 <div className="loginPanel-description">
    //                     Cùng earthview lan tỏa những câu chuyện!
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div></div>
    //     );
    // }
}

export default LoginPanel;