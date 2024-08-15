import { useState } from "react";
import {
  getMeApi,
  addUserApi,
  updateUserApi,
  updateUserApiImage,
  addUserApiImage,
  getUserApi,
  getUserDependencyApi,
  countUsersApi,
  countUsersRangeApi,
  checkCredentialsApi,
  editPasswordApi
} from "../api/user";
import { useAuth } from "./useAuth";
export function useUser() {
  const { auth } = useAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersByRange, setTotalUsersByRange] = useState(0);

  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (errorUser) {
      throw errorUser;
    }
  };

  //para obtener todos los usuarios
  const getUsers = async () => {
    try {
      setLoadingUser(true);
      //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
      const response = await getUserDependencyApi(
        auth.me.dependencyIdFK,
        auth.token
      );
      setLoadingUser(false);

      setUsers(response);
      return response;
    } catch (errorUser) {
      setLoadingUser(false);
      setErrorUser(errorUser);
      //throw errorUser;
    }
  };
  const countUsers = async () => {
    try {
      setLoadingUser(true);
      //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
      const response = await countUsersApi(auth.me.dependencyIdFK, auth.token);
      setLoadingUser(false);
      setTotalUsers(response);
      return response;
    } catch (errorUser) {
      setLoadingUser(false);
      setErrorUser(errorUser);
      //throw errorUser;
    }
  };
  const countUsersRange = async (rangeIdFK) => {
    try {
      setLoadingUser(true);
      //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
      const response = await countUsersRangeApi(rangeIdFK,auth.me.dependencyIdFK, auth.token);
      setLoadingUser(false);
      setTotalUsersByRange(response);
      return response;
    } catch (errorUser) {
      setLoadingUser(false);
      setErrorUser(errorUser);
      //throw errorUser;
    }
  };

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
  };
  const checkCredentials = async (data) => {
    try {
      setLoadingUser(true);
      const response = await checkCredentialsApi(data.username, data.email);
      setLoadingUser(false);
      setUsers(response);
      return response;
    } catch (errorUser) {
      setLoadingUser(false);
      setErrorUser(errorUser);
    }
  };

  //para crear un nuevo usuario cuando no hay imagen o para actualizar un usuario cuando hay imagen
  const addUser = async (data) => {
    try {
      setLoadingUser(true);
      //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
      if (data.image) {
        await addUserApiImage(data, auth.token);
      } else {
        await addUserApi(data, auth.token);
      }
      setLoadingUser(false);
    } catch (errorUser) {
      setLoadingUser(false), setErrorUser(errorUser);
    }
  };
  const editPassword = async (data) => {
    try {
      setLoadingUser(true);
      const response = await editPasswordApi(data);
      setLoadingUser(false);
      return response;
    } catch (errorUser) {
      setLoadingUser(false), setErrorUser(errorUser);
    }
  };

  //para actualizar un usuario
  const updateUser = async (username, data) => {
    try {
      setLoadingUser(true);
      //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
      if (data.image) {
        await updateUserApiImage(username, data, auth.token);
      } else {
        await updateUserApi(username, data, auth.token);
      }
      setLoadingUser(false);
    } catch (errorUser) {
      setLoadingUser(false);
      setErrorUser(errorUser);
    }
  };

  return {
    //estados
    loadingUser,
    errorUser,
    users,
    auth,
    totalUsers,
    totalUsersByRange,
    //metodos
    getMe,
    getUsers,
    getUser,
    addUser,
    updateUser,
    countUsers,
    countUsersRange,
    checkCredentials,
    editPassword
  };
}
