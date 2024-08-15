import React, { useState, useEffect } from "react";
import { useVotes, useUser, useAuth, useStage, useEmails } from "../../hooks";
import { FormRanking } from "../../components/Admin/FormRanking/FormRanking";
import {
  TableVotes,
  AddEditUserForm,
  AddStageForm,
} from "../../components/Admin";
import "./RankingVotes.scss";
import { ModalBasic } from "../../components/common";
import { Loader } from "semantic-ui-react";
import { Error404 } from "../Error404/Error404";

import { Form, Button, Icon, Checkbox } from "semantic-ui-react";
import {
  DonutChartComponent,
  BarChartComponent,
} from "../../components/Admin/charts/";

export const RankingVotes = () => {
  const {
    votes,
    votesBP,
    votesBPR,
    loadingVote,
    getVotesManual,
    countVotesByPeriod,
    countVotesByFilters,
  } = useVotes();
  const {
    users,
    totalUsers,
    totalUsersByRange,
    countUsersRange,
    countUsers,
    getUser,
  } = useUser();
  const { sendEmail } = useEmails();

  const { getStage, stages } = useStage();
  useEffect(() => {
    if (!stages) {
      getStage();
    }
  }, [stages]);

  /* estados para el funcionamiento de la ventna modal */
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  //estado para refrescar la tabla por cada cambio
  const [refresh, setRefresh] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [formData, setFormData] = useState({
    stageIdFK: "",
    rangeIdFK: "",
    period: "",
  });

  const { auth } = useAuth();

  useEffect(() => {
    countUsers();
  }, []);

  const setLoading = (isLoading) => {
    setChartVisible(!isLoading); // Mostrar el gráfico cuando isLoading es falso
  };

  /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
  const openCloseModal = () => {
    setShowModal((prev) => !prev);
  }; // modificar el estado de la ventana (cerrado/abierto)
  const onRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const updateStage = (stage) => {
    setTitleModal("Etapa de " + stage);
    setContentModal(
      <AddStageForm stage={stage} onCloseModal={openCloseModal} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal(
      "Editar fotografía de " + data.first_name + " " + data.last_name
    );
    setContentModal(
      <AddEditUserForm
        onCloseModal={openCloseModal}
        onRefresh={onRefresh}
        user={data}
        isBlock={true}
      />
    );
    openCloseModal();
  };

  //PARA SOLO PERMITIR EL ACCESO A ESTA PAGE A LOS ADMINISTRADORES
  if (!auth.me.isAdmin) {
    return <Error404 />;
  }

  const findUser = async (userName) => {
    console.log(userName);
    const response = await getUser(userName);
    console.log(response);
    updateUser(response);
  }

  return (
    <>
      <FormRanking
        getVotesManual={getVotesManual}
        countUsersRange={countUsersRange}
        countVotesByFilters={countVotesByFilters}
        countVotesByPeriod={countVotesByPeriod}
        stage_one={() => updateStage("nominación")}
        stage_two={() => updateStage("votación")}
        setLoading={setLoading}
        setFormData={setFormData}
      />

      {chartVisible && formData && (
        <div className="chartsContainer">
          <div className="donutsContainer">
            <DonutChartComponent
              title={`Votos totales en plataforma para la etapa seleccionada del año ${formData.period}`}
              votes={votesBP}
              totalUsers={totalUsers}

            />
            <DonutChartComponent
              title={`Votos totales en plataforma del rango ${
                formData.rangeIdFK === "1"
                  ? "superior"
                  : formData.rangeIdFK === "2"
                  ? "medio"
                  : "operativo"
              } del año ${formData.period}`}
              votes={votesBPR}
              totalUsers={totalUsersByRange}
            />
          </div>
          <br />
          <div className="barContainer">
            <BarChartComponent
              votes={votes}
              range={
                formData.rangeIdFK === "1"
                  ? "superior"
                  : formData.rangeIdFK === "2"
                  ? "medio"
                  : "operativo"
              }
              year={formData.period}
              findUser={findUser}
              sendEmail={sendEmail}
              stages={stages}
              stageKey={formData.stageKey}
            />
          </div>
        </div>
      )}

      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        children={contentModal}
        size={"md"}
      />
    </>
  );
};
