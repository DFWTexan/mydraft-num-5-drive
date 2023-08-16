import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Input,
  // Label,
  // Form,
  // FormGroup,
} from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../styles/index.scss";
// import http from "../api/http-common";

const baseURL = "https://localhost:7242/api/Player/GetPlayerByID";

const PlayerSelectedModal = ({ props, handleCloseModal }) => {
  const [modal, setModal] = useState(props.isOpen);
  const [playerData, setPlayerData] = useState({});

  const handleClose = () => {
    setModal(!modal);
    handleCloseModal();
  };

  useEffect(() => {
    axios.get(`${baseURL}?ID=${props.player_ID}`).then((response) => {
      setPlayerData(response.data);
    });
  }, [props.player_ID]);

  return (
    <Modal
      isOpen={modal}
      toggle={handleClose}
      className="modal-dialog-centered"
      backdrop={true}
      keyboard={true}
    >
      <ModalHeader toggle={handleClose}>
        {playerData.firstName + ' ' + playerData.lastName}
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
              <div>
                Projections...
              </div>
              <div>
                {playerData.position} DEPTH CHART
              </div>
            </div>
          </TabPanel>
          <TabPanel>PANEL: News</TabPanel>
          <TabPanel>PANEL: Schedule</TabPanel>
        </Tabs>{" "}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>
          Draft Player
        </Button>{" "}
        <Button color="secondary" onClick={handleClose}>
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
