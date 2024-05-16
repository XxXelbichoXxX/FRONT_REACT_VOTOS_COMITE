import {useState} from 'react';
import { getDependenciesApi } from '../api/dependency';
import { useAuth } from './useAuth';
export function useDependency() {
    const {auth} = useAuth();
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
        }catch (errorDependency) { 
            setLoadingDependency(false);
            setErrorDependency(errorDependency);
        }
    }

    return { 
        loadingDependency,
        errorDependency,
        dependencies,
        auth,
        getDependencies,    
     };
}