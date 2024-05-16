import {React, useEffect, useState} from 'react';
import { Table, Tooltip } from 'antd';
import './TableUsers.scss';
import { Icon, Button, Label } from 'semantic-ui-react';
import { useDependency } from '../../../../hooks';

export const TableUsers = (props) => {
  const { users, updateUser } = props;
  
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

  const columns = [
    {
      title: 'Número de empleado',
      width: 120,
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: 'Nombre(s)',
      width: 180,
      dataIndex: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name), // Ordenamiento alfabético
      sortDirections: ['descend', 'ascend'], 
      align: 'center',
    },
    {
      title: 'Apellidos',
      width: 180,
      dataIndex: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name), // Ordenamiento alfabético
      sortDirections: ['descend', 'ascend'], 
      align: 'center',
    },
    {
      title: 'Dependencia',
      width: 300,
      dataIndex: 'dependencyIdFK',
      align: 'center',
      render: (dependencyIdFK) => getDependencyNameById(dependencyIdFK),
    },
    {
      title: 'Puesto',
      width: 300,
      dataIndex: 'workstation',
      align: 'center',
    },
    {
      title: 'Rango',
      width: 20,
      dataIndex: 'rangeIdFK',
      align: 'center',
      filters: [
        { text: 'Superior', value: '1' },
        { text: 'Medio', value: '2' },
        { text: 'Operativo', value: '3' },
      ],
      onFilter: (value, record) => record.rangeIdFK.toString() === value,
      render: (idRank) => {
        switch (idRank) {
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
      title: 'Acciones',
      width: 20,
      align: 'center',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip title={`Editar a ${record.first_name + ' ' + record.last_name}`}>
            <Button icon='edit' onClick={() => updateUser(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <br />
      <Table
        dataSource={users}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </>
  );
};