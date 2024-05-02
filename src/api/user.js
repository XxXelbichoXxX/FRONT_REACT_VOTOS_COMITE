import axios from 'axios';
import { BASE_API } from '../utils/constants';

//para iniciar sesion
export async function loginApi(formValue) {
    try {
        const url = `${BASE_API}/api/auth/login/`;

        const response = await axios.post(url, formValue, {
            headers: {  'Content-Type': 'application/json',  },
        });

        if (response.status !== 200) {  throw new Error('Error en el login'); }

        return response.data;

    } catch (error) { throw error; }
}
//----------------------------------------------------------------------------
//para obtener el usuario autenticado
export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`, }
        }
        const response = await axios.get(url, params);
        return response.data;
    }catch (error) { throw error; }
}
//----------------------------------------------------------------------------
//para obtener todos los usuarios
export async function getUsersApi(token) {
    try {
        const url = `${BASE_API}/api/user/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`, }
        }
        const response = await axios.get(url, params);
        return response.data;
    }catch (error) { throw error; }
}
//para obtener un usuario
export async function getUserApi(username, token) {
    try {
        const url = `${BASE_API}/api/user/${username}/`;
        const params = {
            headers: { Authorization: `Bearer ${token}`}            
        }
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) { throw error; }    
}

//----------------------------------------------------------------------------
//crear un nuevo usuario cuando no hay imagen
export async function addUserApi(data, token) {
    try {
        const url = `${BASE_API}/api/user/`;
        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        }
        const response = await axios.post(url, data, params);
        return response.data;
    }catch (error) { throw error; }
} 

//Crear un nuevo usuario cuando hay imagen
export async function addUserApiImage(data, token) {
    try {
        const url = `${BASE_API}/api/user/`;
        // Crear un objeto FormData
        const formData = new FormData();
        // Agregar campos de texto al FormData
        Object.keys(data).forEach(key => {
            // Verificar si la propiedad es 'image' y si existe un valor
            if (key === 'image' && !data[key]) {  return;  }
            formData.append(key, data[key]);
        });
        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data', // Cambiar el tipo de contenido a 'multipart/form-data'
            },
        };
        const response = await axios.post(url, formData, params);
        return response.data;
    } catch (error) { throw error;  }
}
//----------------------------------------------------------------------------
//actualizar un usuario con patch cuando no hay imagen
export async function updateUserApi(username, data, token) {
    try {
        const url = `${BASE_API}/api/user/${username}/`;
        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        }
        // Use axios.patch for updating an existing resource
        const response = await axios.patch(url, data, params);
        return response.data;
    } catch (error) {throw error;}
}

//actualizar un usuario con patch cuando hay imagen
export async function updateUserApiImage(username, data, token) {
    try {
        const url = `${BASE_API}/api/user/${username}/`;
        // Crear un objeto FormData
        const formData = new FormData();
        // Agregar campos de texto al FormData
        Object.keys(data).forEach(key => {
            // Verificar si la propiedad es 'image' y si existe un valor
            if (key === 'image' && !data[key]) { return; }
            formData.append(key, data[key]);
        });
        const params = {
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data', // Cambiar el tipo de contenido a 'multipart/form-data'
            },
        };
        const response = await axios.patch(url, formData, params);
        return response.data;
    } catch (error) { throw error; }
} 




