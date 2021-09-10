import {createContext, useReducer, useEffect} from 'react'
import axios from 'axios'
import {authReducer} from '../reducers/authReducer'
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from './constants'
import setAuthToken from '../utils/setAuthToken'
import { SHOW_LOGIN_PANEL } from "../reducers/constants";



export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true, 
        isAuthenticated: false, 
        user: null,
        flagShowLoginPanel: false 
    })



    const showLoginPanel = () => {
        if(document.body.style.overflowY === "hidden"){
            document.body.style.overflowY = "scroll";
        }
        else{
            document.body.style.overflowY = "hidden";
        }
        // document.body.style.overflowY = "hidden";


        dispatch({
            type: SHOW_LOGIN_PANEL,
            payload: {}
        })
    }



// Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]) 
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`);

            console.log("debug load user", response);

            if (response.data.success) {
                console.log("load user thành công", response.data.user);
                dispatch({
                    type: 'SET_AUTH', 
                    payload: {isAuthenticated: true, user: response.data.user}
                })
            }

        } catch (error) {
            console.log("có lỗi");
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH', 
                payload: {isAuthenticated: false, user: null}
            })
        }
    }

    useEffect(() => {
        // loadUser();
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            console.log("chạy chỗ này");
            loadUser();
        }
    }, []);

    // Register
    const registerUser = async userForm => {
        try {

            const url = apiUrl + "/auth/register";

            const response = await axios.post(url, userForm)

            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

            await loadUser()

            return response.data;

        } catch (error) {
            if (error.response.data)
                return error.response.data;
            else 
                return {success: false, message: error.message};
        }

    }

    // Login 
    const loginUser = async userForm => {
        try {

            const url = apiUrl + "/auth/login";

            const response = await axios.post(url, userForm)

            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

            return response.data;

        } catch (error) {
            if (error.response.data)
                return error.response.data;
            else 
                return {success: false, message: error.message};
        }

    }



    const facebookLoginUser = async (userForm) => {
        try {
            const url = apiUrl + "/auth/facebooklogin";

            const response = await axios.post(url, userForm)

            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                await loadUser();

            return response.data;

        } catch (error) {
            if (error.response.data)
                return error.response.data;
            else 
                return {success: false, message: error.message};
        }
    }


    const googleLoginUser = async (userForm) => {
        try {
            const url = apiUrl + "/auth/googlelogin";

            const response = await axios.post(url, userForm)

            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                await loadUser();

            return response.data;

        } catch (error) {
            if (error.response.data)
                return error.response.data;
            else 
                return {success: false, message: error.message};
        }
    }

    const authContextData = { showLoginPanel , loginUser, registerUser, facebookLoginUser, googleLoginUser ,authState }

    return (<AuthContext.Provider  value = {authContextData}>{children}</AuthContext.Provider>)

}

export default AuthContextProvider