import axios from 'axios';

const API = `https://jsonplaceholder.typicode.com`;

export const GetUsers = async () => {

    try {
        const response = await axios.get(`${API}/users`);
        const users = response.data;
        const countUsers = users.length;
        return { users, countUsers };
    } catch (error){
        console.error(error)
        throw error
    }
}

export const PostUser = async (payload) => {
    try {
        const response = await axios.post(`${API}/users`,
            payload
        );
        return response.data;

    } catch  (error){
        console.error(error)
        throw error
    }
}