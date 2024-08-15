import React from "react";
import "./statusVote.scss";
import timeout from "../../../assets/timeout.png";
import votation from "../../../assets/votation.png";

export const StatusVote = (props) => {
  const { option } = props;

  return (
    <div className="status-vote">
      {option === "timeout" ? (
        <div className="timeout">
          <img src={timeout} alt="no existe" />
          <h1>La fecha para la votacion ha expirado, intentalo el siguiente año.</h1>
        </div>
      ) : (
        <div className="votation-end">
          <img src={votation} alt="no existe" />
          <h1>
            Muchas gracias por tu participación, es muy importante para
            nosotros.
          </h1>
        </div>
      )}
    </div>
  );
};
