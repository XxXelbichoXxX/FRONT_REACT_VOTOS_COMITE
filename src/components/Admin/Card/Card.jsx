import React from "react";
import { Card as CustomCard, Button } from "antd";
import "./Card.scss";
import logo from "../../../assets/user.jpg";

export const CustomCardComponent = ({ user, action, electionCards, etapa }) => {
  const handleClick = () => {
    electionCards(user);
  };
  return (
    <>
      <CustomCard
        title={
          etapa === 1 ? user.first_name + " " + user.last_name : user.full_name
        }
        className="card-default"
      >
          {etapa === 2 ? <img src={user.image} alt="Imagen" /> : <img src= {logo} alt="Imagen" />}
          <div className="content-card">
          <h5>{user.dependencyId}</h5>
          <p>{user.workstation}</p>
          <Button className="custom-button" type="primary" onClick={handleClick}>
            {action}
          </Button>
          </div>
      </CustomCard>
    </>
  );
};
