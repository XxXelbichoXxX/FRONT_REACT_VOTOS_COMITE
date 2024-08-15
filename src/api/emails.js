import axios from "axios";
import { BASE_API } from "../utils/constants";



export async function sendEmailApi(data) {
    try {
        const url = `${BASE_API}/api/emails/`;
        const params = {
            headers: { 
                'Content-Type': 'application/json',
            },
        }
        const response = await axios.post(url, data, params);
        return response.data;
    }catch (error) { throw error; }
} 
