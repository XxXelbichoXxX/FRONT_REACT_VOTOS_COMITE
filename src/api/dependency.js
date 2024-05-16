import axios from 'axios';
import { BASE_API } from '../utils/constants';

export async function getDependenciesApi(token) {
    try {
        const url = `${BASE_API}/api/dependency/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`}            
        }
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) { throw error; }    
}