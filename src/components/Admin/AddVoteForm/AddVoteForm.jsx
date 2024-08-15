import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useAuth, useVotes } from "../../../hooks";
import {toast} from 'react-toastify';
import { Icon, Button } from 'semantic-ui-react';
import { useDependency } from "../../../hooks";
import "./AddVoteForm.scss";

export const AddVoteForm = ({ users, onDelete, stage, onClose, stageName }) => {
  const { auth } = useAuth();
  const { addVote } = useVotes();
  const [depOptions, setDepOptions] = useState([]);
  const { dependencies, getDependencies } = useDependency();



  useEffect(() => {
    if (!dependencies) {
      getDependencies();
    } else {
      const options = dependencies.map((dep) => ({
        key: dep.dependencyId,
        text: dep.dependencyName,
        value: dep.dependencyId,
      }));
      setDepOptions(options);
    }
  }, [dependencies]);

  const getDependencyNameById = (dependencyIdFK) => {
    const foundDependency = depOptions.find((dep) => dep.value === dependencyIdFK);
    return foundDependency ? foundDependency.text : 'Dependencia no encontrada';

  };


  const handleVote = () => {
    const votes = users.map((user) => ({
      empVoterIdFK: auth.me.username,
      empCandidateIdFK: stageName === 'nominación' ? user.username : user.empCandidateIdFK,
      rangeIdFK: auth.me.rangeIdFK,
      stageIdFK: stage,
      voteDate: new Date(),
      revocationStatus: false,
    }));

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
        stageName === "nominación"
          ? `${record.first_name} ${record.last_name}`
          : `${record.full_name}`,
    },
    {
      title: 'Dependencia',
      dataIndex: stageName === 'nominación' ? 'dependencyIdFK' : 'dependency',
      align: 'center',
      render: (dependencyIdFK) => getDependencyNameById(dependencyIdFK),
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
        onClick={() => stageName === 'nominación' ? handleDelete(record.id) : handleDelete(record.empCandidateIdFK)}>  <Icon name='trash' />
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
          rowKey={(record) => stageName === 'votación' ? record.empCandidateIdFK : record.id}
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
