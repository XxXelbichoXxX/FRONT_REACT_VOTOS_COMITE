import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useAuth, useVotes } from "../../../hooks";
import {toast} from 'react-toastify';
import { Icon, Button } from 'semantic-ui-react';
import "./AddVoteForm.scss";

export const AddVoteForm = ({ users, onDelete, stage, onClose }) => {
  const { auth } = useAuth();
  const { addVote } = useVotes();

  const handleVote = () => {
    const votes = users.map((user) => ({
      empVoterIdFK: auth.me.username,
      empCandidateIdFK: stage === 1 ? user.username : user.empCandidateIdFK,
      rangeIdFK: auth.me.rangeIdFK,
      stageIdFK: stage,
      voteDate: new Date(),
      revocationStatus: false,
    }));
    console.log("rangeIdFK:", auth.me.rangeIdFK); // Aquí agregamos el console.log

    addVote(votes)
      .then(() => {
        toast.success('VOTOS REGISTRADOS EXITOSAMENTE');
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (userId) => {
    onDelete(userId);
  };

  // Definir las columnas para la tabla
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        stage === 1
          ? `${record.first_name} ${record.last_name}`
          : `${record.full_name}`,
    },
    {
      title: "Dependencia",
      dataIndex: "dependency",
      key: "dependency",
    },
    {
      title: "Puesto de Trabajo",
      dataIndex: "workstation",
      key: "workstation",
    },
    {
      title: "Acción",
      key: "action",
      render: (text, record) => (
        <Button icon color="red" 
        onClick={() => stage === 1 ? handleDelete(record.id) : handleDelete(record.empCandidateIdFK)}>  <Icon name='trash' />
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="tabContentContainer">
        <Table
          dataSource={users}
          columns={columns}
          pagination={false}
          rowKey={(record) => stage === 2 ? record.empCandidateIdFK : record.id}
        />
      </div>
      <div className="buttonContainer">
        <Button className="voteButton" icon onClick={handleVote}> <Icon name='edit' />
          Votar
        </Button>
      </div>
    </>
  );
};
