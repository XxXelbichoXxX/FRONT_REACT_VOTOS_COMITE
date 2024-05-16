import React from 'react';
import { Table } from 'antd';
import './TableVotes.scss';
import { Icon, Button, Label } from 'semantic-ui-react';

export const TableVotes = (props) => {
  const { votes , findUser} = props;
 

  const columns = [
    {
      title: 'Etapa',
      align: 'center',
      width: 100,
      dataIndex: 'stageIdFK',
      render: (stageIdFK) => {
        switch (stageIdFK) {
          case 1:
            return <Label color='blue'>Nominaciones</Label>;
          case 2:
            return <Label color='green'>Elecciones</Label>;
          default:
            return <Label color='red'>Desconocida</Label>;
        }
      },
    },
    {
      title: 'Rango',
      align: 'center',
      width: 100,
      dataIndex: 'rangeIdFK',
      render: (rangeIdFK) => {
        switch (rangeIdFK) {
          case 1:
            return <Label color='red'>Superior</Label>;
          case 2:
            return <Label color='green'>Medio</Label>;
          case 3:
            return <Label color='blue'>Operativo</Label>;
          default:
            return <Label color='yellow'>Sin rango</Label>;
        }
      }, 
    },
    {
      title: 'Nombre del candidato',
      dataIndex: 'full_name',
      align: 'center',
      width: 250,
      render: (full_name) => `${full_name}`,
    },
    {
      title: 'Año de la votación',
      align: 'center',
      width: 150,
      dataIndex: 'period',
    },
    {
      title: 'Total de votos',
      align: 'center',
      width: 150,
      dataIndex: 'total',
      render: (total) => <Label color='green'>{total} votos</Label>,
    },
    {
      title: 'Subir imagen del candidato',
      align: 'center',
      width: 150,
      render: (text, record) => (
        <span style={{ textAlign: 'left' }}>
          <Button icon color="red" onClick={() => findUser(record.empCandidateIdFK)}> <Icon name='upload' /></Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <br />
      <Table 
        dataSource={votes}
        columns={columns}
        bordered
        pagination={{ pageSize: 7 }} // Optional pagination
        rowKey={(record) => `${record.empCandidateIdFK}_${record.period}`}
      />
    </>    
  );
};
 