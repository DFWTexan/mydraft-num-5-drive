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
    playerSchedule: [],
  });
  const dispatch = useDispatch();

  const getBackgroundColorClass = (proTeamNickname) => {
    switch (proTeamNickname) {
      case "Cardinals":
        return "proTeamInfoPanel--cardinals";
      case "Falcons":
        return "proTeamInfoPanel--falcons";
      case "Ravens":
        return "proTeamInfoPanel--ravens";
      case "Bills":
        return "proTeamInfoPanel--bills";
      case "Panthers":
        return "proTeamInfoPanel--panthers";
      case "Bears":
        return "proTeamInfoPanel--bears";
      case "Bengals":
        return "proTeamInfoPanel--bengals";
      case "Browns":
        return "proTeamInfoPanel--browns";
      case "Cowboys":
        return "proTeamInfoPanel--cowboys";
      case "Broncos":
        return "proTeamInfoPanel--broncos";
      case "Lions":
        return "proTeamInfoPanel--lions";
      case "Packers":
        return "proTeamInfoPanel--packers";
      case "Texans":
        return "proTeamInfoPanel--texans";
      case "Colts":
        return "proTeamInfoPanel--colts";
      case "Jaguars":
        return "proTeamInfoPanel--jaguars";
      case "Chiefs":
        return "proTeamInfoPanel--chiefs";
      case "Chargers":
        return "proTeamInfoPanel--chargers";
      case "Rams":
        return "proTeamInfoPanel--rams";
      case "Dolphins":
        return "proTeamInfoPanel--dolphins";
      case "Vikings":
        return "proTeamInfoPanel--vikings";
      case "Patriots":
        return "proTeamInfoPanel--patriots";
      case "Saints":
        return "proTeamInfoPanel--saints";
      case "Giants":
        return "proTeamInfoPanel--giants";
      case "Jets":
        return "proTeamInfoPanel--jets";
      case "Raiders":
        return "proTeamInfoPanel--raiders";
      case "Eagles":
        return "proTeamInfoPanel--eagles";
      case "Steelers":
        return "proTeamInfoPanel--steelers";
      case "49ers":
        return "proTeamInfoPanel--49ers";
      case "Seahawks":
        return "proTeamInfoPanel--seahawks";
      case "Buccaneers":
        return "proTeamInfoPanel--buccaneers";
      case "Titans":
        return "proTeamInfoPanel--titans";
      case "Redskins":
        return "proTeamInfoPanel--redskins";
      default:
        return ""; // Default or fallback class
    }
  };

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
    padding: "0.2rem",
    overflowY: "auto",
  };

  const backgroundColorClass = getBackgroundColorClass(
    playerData.proTeamNickname
  );

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
        {/* ({playerData.id}) - {playerData.firstName + " " + playerData.lastName} */}
      </ModalHeader>
      <ModalBody>
        <Tabs forceRenderTabPanel defaultIndex={0}>
          <TabList>
            <Tab>DEPTH CHART</Tab>
            <Tab>NEWS</Tab>
            <Tab>SCHEDULE</Tab>
          </TabList>
          <div style={{ overflow: "auto", height: "20rem" }}>
            <TabPanel>
              <div className={`proTeamInfoPanel ${backgroundColorClass}`}>
                {playerData.depthChart.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="playerDepthCharItem">
                        <div>
                          {item.rank} - {item.playerName}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              {playerData.playerNews.length === 0 ? (
                <div style={{ padding: "1rem" }}>No News for Player</div>
              ) : (
                playerData.playerNews.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className={`proTeamInfoPanel ${backgroundColorClass}`}>
                        <div style={style}>
                          <div className="playerNewsItem">
                            <div className="playerNewsItem__header">
                              <div className="playerNewsItem__playerName">
                                {/* {item.pubDate} */}
                              </div>
                              <div className="playerNewsItem__date">
                                {item.pubDate}
                              </div>
                            </div>
                            <div className="playerNewsItem__description">
                              {item.newsDescription}
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </TabPanel>
            <TabPanel>
              {playerData.playerSchedule.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`proTeamInfoPanel ${backgroundColorClass}`}>
                    <div className="proTeamScheduleItem">
                      <div className="proTeamScheduleItem__header">
                        <div className="proTeamScheduleItem__game">
                          {item.week === 0 ? (
                            <span>BYE</span>
                          ) : (
                            "Week " + item.week
                          )}
                        </div>
                        <div className="proTeamScheduleItem__game">
                          {item.designation}
                        </div>
                        <div className="proTeamScheduleItem__game">
                          {item.designation === "VS"
                            ? item.awayTeamName
                            : item.homeTeamName}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
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
