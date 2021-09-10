import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        // console.log("debug here", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
        console.log("bị xóa");
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;