import "./DependenciesList.scss";
import { Avatar, List, Space, Button, Tooltip, Popconfirm, Spin } from "antd";
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useDependency } from "../../../../hooks";

export const DependenciesList = (props) => {
  const { dependencies, updateDependency, onRefresh } = props;

  const { deleteDependency, loadingDependency } = useDependency();

  return (
    <>
      {dependencies && dependencies.length > 0 ? (
        <List
          pagination={{
            position: "bottom",
            align: "end",
          }}
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={dependencies}
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
                  description={`¿Está seguro de eliminar la ${item.dependencyName}?`}
                  okText="Sí, eliminar"
                  cancelText="No, cancelar"
                  okType="danger"
                  onConfirm={() => {
                    deleteDependency(item.dependencyId);
                    onRefresh();
                  }}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <Button danger>
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.logo} className="custom-avatar"/>}
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
      ) : (
        <>
          <div className="loader">
            <Spin size ="large" className="custom-spinner" tip="Buscando dependencias..." spinning={loadingDependency && dependencies.length === 0}></Spin>
            <h1>No hay dependencias para mostrar</h1>
          </div>
        </>
        
      )}
    </>
  );
};
