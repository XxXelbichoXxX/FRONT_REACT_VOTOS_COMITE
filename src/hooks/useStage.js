import {useState} from 'react';
import { getMeApi } from '../api/user';
import { getStagesApi, updateStageApi } from '../api/stage';
import { useAuth } from './useAuth';
export function useStage() {
    const {auth} = useAuth();
    const [loadingStage, setLoadingStage] = useState(true);
    const [errorStage, setErrorStage] = useState(null);
    const [stages, setStages] = useState(null);

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        }catch (errorStage) { throw errorStage; }
    }

    const getStage = async () => {
        try {
            setLoadingStage(true);
            //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
            const response = await getStagesApi(auth.token);
            setLoadingStage(false);

            console.log(response);
            setStages(response);
            return response;
        }catch (errorStage) { 
            setLoadingStage(false);
            setErrorStage(errorStage);
            //throw errorStage; 
        }
    }

    const updateStage = async (stageId, data) => {
        try {
          setLoadingStage(true);
          // Aquí estamos asumiendo que `datosActualizar` contiene los datos que deseas enviar para la actualización
          const response = await updateStageApi(auth.token, stageId, data);
          // Después de actualizar, puedes llamar a `getStage` para obtener los datos actualizados
          setLoadingStage(false);

          console.log(response);
          setStages(response);
          return response;
        } catch (errorStage) {
            setLoadingStage(false);
            setErrorStage(errorStage);
        }
    };


    return { 
        //estados
        loadingStage,
        errorStage,
        stages,
        auth,
        //metodos
        getMe,
        getStage,  
        updateStage    
     };
}