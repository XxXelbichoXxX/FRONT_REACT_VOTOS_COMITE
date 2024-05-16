import React, { useState ,useEffect } from 'react'
import { useVotes, useUser, useAuth } from '../../hooks';
import { HeaderRankin } from '../../components/Admin/HeaderRankin/HeaderRankin';
import { TableVotes, AddEditUserForm, AddStageForm } from '../../components/Admin';
import { ModalBasic } from '../../components/common';
import { Loader } from 'semantic-ui-react';
import {Error404} from '../Error404/Error404';

import {Form, Button, Icon, Checkbox} from 'semantic-ui-react';

export const RankingVotes = () => {
    const { votes, loading, getVotesManual, getVotesManualTop } = useVotes();
    const { users, getUser } = useUser();
    
    /* estados para el funcionamiento de la ventna modal */
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    //estado para refrescar la tabla por cada cambio
    const [refresh, setRefresh] = useState(false);
    
    const { auth } = useAuth();


    useEffect( () => {
         getVotesManual();
    },[]); 


      /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
     const openCloseModal = () => { setShowModal((prev) => !prev); }  // modificar el estado de la ventana (cerrado/abierto) 
     const onRefresh = () => { setRefresh((prev) => !prev);} 

     const updateStage = (stage) => {
      setTitleModal('Etapa ' + stage);
      setContentModal(<AddStageForm stage={stage} onCloseModal={openCloseModal}/>);
      openCloseModal();
    }


     const updateUser = (data) => {
      setTitleModal('Editar al empleado ' + data.first_name + ' ' + data.last_name);
      setContentModal(<AddEditUserForm onCloseModal={openCloseModal} onRefresh={onRefresh} user={data} isBlock={true} uImage={1}/>);
      openCloseModal();
    }

    const findUser = async (userId) => {
      console.log(userId);
      const response = await getUser(userId);
      console.log(response);
      updateUser(response);
    }
    
    //PARA SOLO PERMITIR EL ACCESO A ESTA PAGE A LOS ADMINISTRADORES
    if (!auth.me.isAdmin) {
      return <Error404 />;
    }

  return (
    <>
        <HeaderRankin getVotesManual={getVotesManual} stage_one={()=> updateStage(1)} stage_two={()=> updateStage(2)}/>

        {loading ? (<Loader active inline='centered'> Esperando Datos...</Loader> ) 
        :  
        (
            <TableVotes votes={votes} findUser={findUser} />        
        )}

        <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={contentModal} size={'md'}/>
    </>
  )
}
