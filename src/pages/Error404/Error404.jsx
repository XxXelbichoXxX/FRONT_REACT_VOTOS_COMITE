import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Error404.scss";
import logo from "../../assets/logo_nayarit.png";

export const Error404 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="img">
            <img src={logo} alt="Logo" />
          </div>
          <div className="error-code">
            <p className="typing-effect">Error 404</p>
          </div>
          <div className="text">
            <p>La página que estás buscando no existe</p>
            <Button type="primary" size="large" onClick={handleClick}>
              Regresar al inicio
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
