import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Tabs.scss";
import { CustomCardComponent } from "../Card/Card";
import { useUser } from "../../../hooks/useUser";
import { useVotes } from "../../../hooks/useVotes";
import { useStage } from "../../../hooks/useStage";
import { SearchBar } from "../SearchBar/SearchBar";
import { ModalBasic } from "../../common/ModalBasic/ModalBasic";
import { AddVoteForm } from "../AddVoteForm/AddVoteForm";
import { Result } from "antd";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");
  const { users, loadingUser, getUsers, auth } = useUser();
  const { votes, loadingVotes, userVoted, getVotesManualTop } = useVotes();
  const { stages, loadingStage, getStage } = useStage();
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    getUsers();
    getStage();
    renderCandidates();
  }, []);

  useEffect(() => {
    setSelectedCards([]);
    if (stages) {
      renderCandidates();
      if (activeTab === "2") {
        const year = new Date().getFullYear().toString();
        const rangeId = auth.me.rangeIdFK;
        const voteCount = rangeId === 3 ? 6 : 4;
        getVotesManualTop(1, year, voteCount);
      }
    }
  }, [activeTab]);

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggle = (tab) => setActiveTab(tab);

  const dateValidator = (stage) => {
    if (!stages) return false;
    const [startDate, endDate] =
      stage === 1
        ? [
            parseDateString(stages[0].startDate),
            parseDateString(stages[0].endDate),
          ]
        : [
            parseDateString(stages[1].startDate),
            parseDateString(stages[1].endDate),
          ];
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return today >= start && today <= end;
  };

  const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const renderCandidates = async () => {
    const year = new Date().getFullYear().toString();
    const stage = activeTab === "1" ? 1 : 2;
    const result = await userVoted(stage, year);
    setHasVoted(result);
    dateValidator(stage);
  };

  const electionCards = (selectedUser) => {
    if (auth.me.rangeIdFK === 3 && selectedCards.length >= 3) {
      setShowModal(true);
    } else if (auth.me.rangeIdFK !== 3 && selectedCards.length >= 2) {
      setShowModal(true);
    } else {
      console.log(selectedUser);
      setSelectedCards([...selectedCards, selectedUser]);
    }
  };

  const removeCard = (username) => {
    if (activeTab === "1") {
      const updatedCards = selectedCards.filter((card) => card.id !== username);
      setSelectedCards(updatedCards);
      setShowModal(false);
    } else {
      const updatedCards = selectedCards.filter((card) => card.id !== username);
      setSelectedCards(updatedCards);
      setShowModal(false);
    }
  };

  const filteredUsersWithoutSelectedCards = filteredUsers.filter((user) => {
    return !selectedCards.some((card) => card.username === user.username);
  });

  const filteredUsersWithoutSelectedCards2 =
    votes &&
    votes.filter((vote) => {
      return !selectedCards.some(
        (card) => card.empCandidateIdFK === vote.empCandidateIdFK
      );
    });

  return (
    <>
      <Nav tabs>
        <NavItem
          className={activeTab === "1" ? "activeTab tabBase" : "tabBase"}
          onClick={() => toggle("1")}
        >
          Etapa 1
        </NavItem>
        <NavItem
          className={activeTab === "2" ? "activeTab tabBase" : "tabBase"}
          onClick={() => toggle("2")}
        >
          Etapa 2
        </NavItem>
      </Nav>

      {loadingStage ? (
        <div className="loader">
          {/* aqui recuerda cargar las imagenes de las dependencias */}
          <h1>Cargando datos de las etapas, por favor, espere.</h1>
          <div
            className="spinner-border spinner-custom-color"
            role="status"
          ></div>
        </div>
      ) : loadingUser ? (
        <div className="loader">
          {/* aqui recuerda cargar las imagenes de las dependencias */}
          <h1>Cargando datos de los empleados, por favor, espere.</h1>
          <div
            className="spinner-border spinner-custom-color"
            role="status"
          ></div>
        </div>
      ) : (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <SearchBar setSearch={setSearch} />
            {hasVoted ? (
              <div className="loader">
                {/* aqui recuerda cargar las imagenes de las dependencias */}
                <div>
                  <h1>
                    Muchas gracias por tu participación, es muy importante para
                    nosotros.
                  </h1>
                </div>
              </div>
            ) : dateValidator(parseInt(activeTab)) ? (
              <div className="tabContentContainer">
                {filteredUsersWithoutSelectedCards
                  .filter((user) => user.rangeIdFK === auth.me.rangeIdFK)
                  .map((user) => (
                    <div className="custom-card-wrapper" key={user.username}>
                      <div className="custom-card-inner">
                        <CustomCardComponent
                          user={user}
                          action={"Nominar"}
                          electionCards={electionCards}
                          etapa={1}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Estás fuera de la fecha de votaciones.</p>
            )}
          </TabPane>

          <TabPane tabId="2">
            {loadingStage ? (
              <div className="loader">
                {/* aqui recuerda cargar las imagenes de las dependencias */}
                <h1>Cargando datos de las etapas, por favor, espere.</h1>
                <div
                  className="spinner-border spinner-custom-color"
                  role="status"
                ></div>
              </div>
            ) : loadingVotes ? (
              <div className="loader">
                {/* aqui recuerda cargar las imagenes de las dependencias */}
                <h1>
                  Cargando los votos de la etapa de nominaciones, por favor,
                  espere.
                </h1>
                <div
                  className="spinner-border spinner-custom-color"
                  role="status"
                ></div>
              </div>
            ) : hasVoted ? (
              <div className="loader">
                {/* aqui recuerda cargar las imagenes de las dependencias */}
                <div>
                  <h1>
                    Muchas gracias por tu participación, es muy importante para
                    nosotros.
                  </h1>
                </div>
              </div>
            ) : dateValidator(parseInt(activeTab)) ? (
              <div className="tabContentContainer">
                {votes &&
                  filteredUsersWithoutSelectedCards2.map((vote) => (
                    <div
                      className="custom-card-wrapper"
                      key={vote.empCandidateIdFK}
                    >
                      <div className="custom-card-inner">
                        <CustomCardComponent
                          user={vote}
                          action={"Votar"}
                          electionCards={electionCards}
                          etapa={2}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Estás fuera de la fecha de votaciones.</p>
            )}
          </TabPane>
        </TabContent>
      )}

      <ModalBasic
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Realiza tu votación para la etapa ${
          activeTab === "1" ? "1" : "2"
        }`}
        size={"lg"}
      >
        <AddVoteForm
          users={selectedCards}
          onDelete={removeCard}
          action={"Eliminar voto"}
          stage={activeTab === "1" ? 1 : 2}
          onClose={() => setShowModal(false)}
        />
      </ModalBasic>
    </>
  );
};
