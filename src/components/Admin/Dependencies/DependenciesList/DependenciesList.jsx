import { React, useEffect, useState } from "react";
import "./DependenciesList.scss";
import {
  Avatar,
  List,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useDependency } from "../../../../hooks";

export const DependenciesList = (props) => {
  const { dependencies, updateDependency, onRefresh } = props;

  const { deleteDependency } = useDependency();


  return (
    <>
      <Space
        direction="vertical"
        style={{
          marginBottom: "20px",
        }}
        size="middle"
      ></Space>
      <List
        pagination={{
          position: "bottom",
          align: "end",
        }}
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={dependencies || []}
        renderItem={(item) => (
          <List.Item
            key={item.dependencyId}
            actions={[
              <Tooltip title={`Editar ${item.dependencyName}`}>
                <Button onClick={() => updateDependency(item)}>
                  <EditOutlined />
                </Button>
              </Tooltip>,

              <Popconfirm
                key={item.dependencyId}
                title="Eliminar dependencia"
                description={`¿Esta seguro de eliminar la ${item.dependencyName} ?`}
                okText="Si, eliminar"
                cancelText="No, cancelar"
                okType="danger"
                onClick={() => deleteDependency(item.dependencyId)}
                onConfirm={() => onRefresh()}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.logo} // Cambiar por el logo de la dependencia
                />
              }
              title={
                <a href={item.page} target="_blank" rel="noreferrer">
                  {item.dependencyName}
                </a>
              }
              description={
                <>
                  {"Titular: " + item.owner}
                  <br />
                  {"Domicilio: " + item.address}
                  <br />
                  {"Teléfono: " + item.phone}
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};
