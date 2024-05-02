import {useState} from 'react';
import { getMeApi } from '../api/user';
import { getStagesApi, updateStageApi } from '../api/stage';
import { useAuth } from './useAuth';
export function useStage() {
    const {auth} = useAuth();
    const [loadingStage, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stages, setStages] = useState(null);

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token);
            return response;
        }catch (error) { throw error; }
    }

    const getStage = async () => {
        try {
            setLoading(true);
            //obtenemos un arreglo de objetos con los datos de todos los usuarios registrados para pintarlos en el datatable
            const response = await getStagesApi(auth.token);
            setLoading(false);

            console.log(response);
            setStages(response);
            return response;
        }catch (error) { 
            setLoading(false);
            setError(error);
            //throw error; 
        }
    }

    const updateStage = async (stageId, data) => {
        try {
          setLoading(true);
          // Aquí estamos asumiendo que `datosActualizar` contiene los datos que deseas enviar para la actualización
          const response = await updateStageApi(auth.token, stageId, data);
          // Después de actualizar, puedes llamar a `getStage` para obtener los datos actualizados
          setLoading(false);

          console.log(response);
          setStages(response);
          return response;
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };


    return { 
        //estados
        loadingStage,
        error,
        stages,
        auth,
        //metodos
        getMe,
        getStage,  
        updateStage    
     };
}