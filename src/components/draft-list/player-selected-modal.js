import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../styles/index.scss";
import { API_URL } from "../../config";
import { fetchDraftStatus } from "../../slices/draftStatus";
import { fetchPlayers } from "../../slices/players";

const PlayerSelectedModal = ({ props, handleCloseModal, filterSortPlayer }) => {
  const draftStatus = useSelector((state) => state.draftStatus);
  const [modal, setModal] = useState(props.isOpen);
  const [playerData, setPlayerData] = useState({});
  const dispatch = useDispatch();

  const runDispatch = () => {
    dispatch(fetchDraftStatus());
    dispatch(fetchPlayers(filterSortPlayer));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}Player/GetPlayerByID/${props.player_ID}`)
      .then((response) => {
        setPlayerData(response.data);
      });
  }, [props.player_ID]);

  const handleDraftPlayer = () => {
    axios
      .post(
        `${API_URL}Draft/ExecuteDraftPick/${draftStatus.currentPick}/${props.player_ID}`
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

  return (
    <Modal
      isOpen={modal}
      toggle={handleClose}
      className="modal-dialog-centered"
      backdrop={true}
      keyboard={true}
    >
      <ModalHeader toggle={handleClose}>
        ({playerData.id}) - {playerData.firstName + " " + playerData.lastName}
        <div className="tab_Container_draftInfo"></div>
      </ModalHeader>
      <ModalBody>
        <Tabs forceRenderTabPanel defaultIndex={0}>
          <TabList>
            <Tab>SUMMARY</Tab>
            <Tab>NEWS</Tab>
            <Tab>SCHEDULE</Tab>
          </TabList>
          <TabPanel>
            <div>
              <div>Projections...</div>
              <div>{playerData.position} DEPTH CHART</div>
            </div>
          </TabPanel>
          <TabPanel>PANEL: News</TabPanel>
          <TabPanel>PANEL: Schedule</TabPanel>
        </Tabs>{" "}
      </ModalBody>
      <ModalFooter>
        <Button className="button-submit" onClick={handleDraftPlayer}>
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
