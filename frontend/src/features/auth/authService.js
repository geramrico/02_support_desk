import axios from 'axios'

const API_URL = '/api/users'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        //Local storage con only hold strings. 
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data);
    }
    return response.data
}

const authService = {
    register
}

export default authService