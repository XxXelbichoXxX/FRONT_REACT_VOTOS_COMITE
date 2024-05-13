import {useState} from 'react';
import { getMeApi, getUsersApi, addUserApi, updateUserApi, updateUserApiImage, addUserApiImage, getUserApi } from '../api/user';
import { useAuth } from './useAuth';
export function useUser() {
    const {auth} = useAuth();
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);
    const [users, setUsers] = useState(null);

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        }catch (errorUser) { throw errorUser; }
    }

    //para obtener todos los usuarios
    const getUsers = async () => {
        try {
            setLoadingUser(true);
            //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
            const response = await getUsersApi(auth.token);
            setLoadingUser(false);

            //console.log(response);
            setUsers(response);
            return response;
        }catch (errorUser) { 
            setLoadingUser(false);
            setErrorUser(errorUser);
            //throw errorUser; 
        }
    }
    
    //para obtener un usuario
    const getUser = async (username) => {
        try {
            setLoadingUser(true);
            const response = await getUserApi(username, auth.token);            
            setLoadingUser(false);
            setUsers(response);
            return response;
        } catch (errorUser) {
            setLoadingUser(false);
            setErrorUser(errorUser);
        }
    }

    //para crear un nuevo usuario cuando no hay imagen o para actualizar un usuario cuando hay imagen
    const addUser = async (data) => {
        try {
            setLoadingUser(true);
            //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
            if(data.image) {
                await addUserApiImage(data, auth.token);
            }else{
                await addUserApi(data, auth.token);
            }
            setLoadingUser(false);
        }catch (errorUser) {setLoadingUser(false),  setErrorUser(errorUser); }
    }

    //para actualizar un usuario
    const updateUser = async (username, data) => {
        try {
            setLoadingUser(true);
            //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
            if(data.image) {
                await updateUserApiImage(username, data, auth.token);
                console.log('Update con imagen');
            }else{
                await updateUserApi(username, data, auth.token);
                console.log('Update sin imagen');
            }
            setLoadingUser(false);
        } catch (errorUser) {
            setLoadingUser(false);
            setErrorUser(errorUser);
        }
    }

    return { 
        //estados
        loadingUser,
        errorUser,
        users,
        auth,
        //metodos
        getMe,
        getUsers,
        getUser,  
        addUser,
        updateUser    
     };
}