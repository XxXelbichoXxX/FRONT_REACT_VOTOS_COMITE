import { useState } from "react";
import {
  getDependenciesApi,
  addDependencyApi,
  updateDependencyApi,
  deleteDependencyApi,
} from "../api/dependency";
import { useAuth } from "./useAuth";
export function useDependency() {
  const { auth } = useAuth();
  const [loadingDependency, setLoadingDependency] = useState(true);
  const [errorDependency, setErrorDependency] = useState(null);
  const [dependencies, setDependencies] = useState(null);
  const getDependencies = async () => {
    try {
      setLoadingDependency(true);
      //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
      const response = await getDependenciesApi(auth.token);
      setLoadingDependency(false);

      setDependencies(response);
      return response;
    } catch (errorDependency) {
      setLoadingDependency(false);
      setErrorDependency(errorDependency);
    }
  };

  const addDependency = async (data) => {
    try {
      setLoadingDependency(true);
      await addDependencyApi(data, auth.token);
      setLoadingDependency(false);
    } catch (errorUser) {
      setLoadingDependency(false), setErrorDependency(errorUser);
    }
  };

  const updateDependency = async (dependencyId, data) => {
    try {
      setLoadingDependency(true);
      await updateDependencyApi(dependencyId, data, auth.token);
      setLoadingDependency(false);
    } catch (errorDependency) {
      setLoadingDependency(false);
      setErrorDependency(errorDependency);
    }
  };

  const deleteDependency = async (dependencyId) => {
    try {
      setLoadingDependency(true);
      await deleteDependencyApi(dependencyId, auth.token);
      setLoadingDependency(false);
    } catch (errorDependency) {
      setLoadingDependency(false);
      setErrorDependency(errorDependency);
    }
  };

  return {
    loadingDependency,
    errorDependency,
    dependencies,
    auth,
    getDependencies,
    addDependency,
    updateDependency,
    deleteDependency,
  };
}
