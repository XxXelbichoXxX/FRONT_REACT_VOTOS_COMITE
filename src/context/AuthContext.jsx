import React, { createContext , useEffect, useState} from "react";
import {setToken, getToken, removeToken} from '../api/token';
import {useUser} from '../hooks';


export const AuthContext = createContext({
    auth: undefined, 
    login: () => null,
    logouth: () => null,
});

export function AuthProvider(props){
    const {children} = props;
    //auth es un objeto con el token y el usuario(nota: el usuario a su vez es otro objeto con los datos del mismo)
    const [auth, setAuth] = useState(undefined);
    //desestructuramos el hook useUser para usar su funcion getMe que a su vez llama a la funcion getMeApi de api
    const {getMe} = useUser();

    useEffect(() => {
        (async () =>{
            //obtenemos el token de la variable global del sistema
            const token = getToken();
            //si el token no existe o es null se le redirige al login
            if(!token) {setAuth(null); return};
            //hacemos una solicitud http para obtener el usuario enviandole el token
            const me = await getMe(token);
            setAuth({token, me});
        })();
    },[]);

    //funcion para iniciar sesion
    const login = async(token) => {
        setToken(token);
        const me = await getMe(token);   
        //le damos el valor al auth con el objeto con el token y el usuario     
        setAuth({token, me});
        
    }
    //funcion para cerrar sesion
    const logouth = () => {
        if(!auth) return;
        setAuth(null);
        removeToken();
        //history.push('/admin');
    }      

    const valueContext = {
        //como auth es un estado se modifica cada inicio de sesion
        auth,
        login,
        logouth
    };

    if(auth === undefined) return null;

    return(
        /* digamos que el children es todo el contenido de nuestra app osea el contenifo que esta en App.jsx */
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    );
}