
const axios=require('axios');
const API_URL = 'http://localhost:9000/api'; 



export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData); 
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error.message; 
    }
}
export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : error.message; 
    }
}