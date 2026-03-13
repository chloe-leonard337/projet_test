import axios from 'axios';

const API = `http://localhost:8000`;

export const GetUsers = async () => {

    try {
        const response = await axios.get(`${API}/users`);
        console.log("reponse : ", response);
        const users = response.data.utilisateurs;
        const countUsers = users.length;
        console.log(users);
        console.log(countUsers);
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