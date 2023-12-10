import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../styles/index.scss";
// import { API_URL } from "../../config";
import { fetchDraftStatus } from "../../slices/draftStatus";
// import { fetchPlayers } from "../../slices/players";

const getColorClass = (position) => {
  switch (position) {
    case "QB":
      return "qb-color";
    case "RB":
      return "rb-color";
    case "WR":
      return "wr-color";
    case "TE":
      return "te-color";
    case "K":
      return "k-color";
    case "DEF":
      return "def-color";
    default:
      return ""; // Default or fallback class
  }
};

const PlayerSelectedModal = ({ props, handleCloseModal, filterSortPlayer }) => {
  const draftStatus = useSelector((state) => state.draftStatus);
  const [modal, setModal] = useState(props.isOpen);
  const [playerData, setPlayerData] = useState({
    depthChart: [],
    playerNews: [],
  });
  const dispatch = useDispatch();

  const runDispatch = () => {
    dispatch(fetchDraftStatus());
    // dispatch(fetchPlayers(filterSortPlayer));
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Player/GetPlayerByID/${props.player_ID}`
      )
      .then((response) => {
        console.log(
          "==> EMFTest (Player-selected-Modal) - response.data",
          response.data
        );

        setPlayerData(response.data);
      });
  }, [props.player_ID]);

  const handleDraftPlayer = () => {
    axios
      .post(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Draft/ExecuteDraftPick/${draftStatus.currentPick}/${props.player_ID}`
      )
      .then((response) => {
        runDispatch();
      });

    setModal(!modal);
    handleCloseModal();
  };

  const handleClose = () => {
    setModal(!modal);
    handleCloseModal();
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: props.width || "100%",
    height: props.height || "auto",
    backgroundColor: props.color || "#f0f0f0",
    padding: "1rem",
    overflowY: "auto",
  };

  return (
    <Modal
      isOpen={modal}
      toggle={handleClose}
      className="modal-dialog-centered"
      backdrop={true}
      keyboard={true}
    >
      <ModalHeader toggle={handleClose}>
        <div className="draft-player-info-card__title">
          <div style={{ margin: "1rem" }}>
            <img
              className="draft-player-info-card__image"
              src={playerData.photoURL}
              alt=""
            />
          </div>
          <div className="draft-player-info-card__player-info">
            <div className="draft-player-info-card__name">
              {playerData.firstName} {playerData.lastName}
              {
                <div
                  className={`draft-player-info-card__player-position ${getColorClass(
                    playerData.position
                  )}`}
                >
                  {playerData.position}
                </div>
              }
            </div>
            <div className="draft-player-info-card__team">
              {playerData.proTeamName}
            </div>
            <div className="">
              {playerData.isDrafted ? "Drafted" : "Available"}
            </div>
          </div>
          <div className="draft-player-info-card__player-ranking-container">
            <div className="draft-player-info-card__player-ranking">
              <span
                style={{
                  background: "whitesmoke",
                  padding: ".5rem",
                  paddingBottom: ".1rem",
                }}
              >
                POINTS
              </span>
              <span>223.4</span>
            </div>
            <div className="draft-player-info-card__player-ranking">
              <span
                style={{
                  background: "whitesmoke",
                  padding: ".5rem",
                  paddingBottom: ".1rem",
                }}
              >
                AVV
              </span>
              <span>23</span>
            </div>
            <div className="draft-player-info-card__player-ranking">
              <span
                style={{
                  background: "whitesmoke",
                  padding: ".5rem",
                  paddingBottom: ".1rem",
                }}
              >
                ADP
              </span>
              <span>0</span>
            </div>
          </div>
        </div>
        ({playerData.id}) - {playerData.firstName + " " + playerData.lastName}
      </ModalHeader>
      <ModalBody>
        <Tabs forceRenderTabPanel defaultIndex={0}>
          <TabList>
            <Tab>DEPTH CHART</Tab>
            <Tab>NEWS</Tab>
            <Tab>SCHEDULE</Tab>
          </TabList>
          <div style={{ overflow: 'auto', height: '20rem' }}>
            <TabPanel>
              <div className="proTeamInfoPanel">
                {playerData.depthChart.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.rank} - {item.playerName}
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="proTeamInfoPanel">
                <div>
                  {playerData.playerNews.map((item, index) => {
                    return (<React.Fragment key={index}>
                      <div style={style}>
                        <div className="fanTeamNewsItem">
                          <div className="fanTeamNewsItem__header">
                            <div className="fanTeamNewsItem__playerName">
                              {item.playerName}
                            </div>
                            <div className="fanTeamNewsItem__date">
                              {item.dateString}
                            </div>
                          </div>
                          <div className="fanTeamNewsItem__description">
                            {item.newsDescription}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>);
                  })}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="proTeamInfoPanel">
              PANEL: Schedule
              </div>
              </TabPanel>
          </div>
        </Tabs>{" "}
      </ModalBody>
      <ModalFooter>
        <Button
          className="button-submit"
          disabled={playerData.isDrafted}
          onClick={handleDraftPlayer}
        >
          Draft Player
        </Button>{" "}
        <Button className="button-cancel" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

PlayerSelectedModal.propTypes = {
  className: PropTypes.string,
};

export default PlayerSelectedModal;
