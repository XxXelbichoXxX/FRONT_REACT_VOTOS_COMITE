import React, { useState, useEffect } from "react";
import { Card as CustomCard, Button } from "antd";
import { useDependency } from "../../../hooks";
import "./Card.scss";

export const CustomCardComponent = ({ user, action, electionCards, stageName }) => {

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

  const handleClick = () => {
    electionCards(user);
  };
  return (
    <>
      <CustomCard
        title={
          stageName === 'nominación' ? user.first_name + " " + user.last_name : user.full_name
        }
        className="card-default"
      >
          {stageName === 'votación' ? <img src={user.image} alt="Imagen" /> : <img src= {user.logo} alt="Imagen" />}
          <div className="content-card">
          <h5>{stageName === 'votación' ? getDependencyNameById(user.dependency) : getDependencyNameById(user.dependencyIdFK)}</h5>
          <p>{user.workstation}</p>
          <Button className="custom-button" type="primary" onClick={handleClick}>
            {action}
          </Button>
          </div>
      </CustomCard>
    </>
  );
};
