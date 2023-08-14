import React, { useState } from "react";
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
import PropTypes from 'prop-types';

import '../../styles/index.scss';

const PlayerSelectedModal = ({ props , handleCloseModal}) => {
  // const { className } = props;
  const [modal, setModal] = useState(props.isOpen);
  // const [backdrop, setBackdrop] = useState(true);
  // const [keyboard, setKeyboard] = useState(true);
  // const toggle = () => {
  //   setModal(!modal);
  // };
  
  console.log("==> EMFTest (PlayerSelectedModal) props: ", props.isOpen);

  const handleClose = () => {

    console.log("==> EMFTest (handleClose) props: SET:FALSE ");

    setModal(!modal);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={modal}
      toggle={handleClose}
      // className={className}
      className="modal-dialog-centered"
      backdrop={true}
      keyboard={true}
    >
      <ModalHeader toggle={handleClose}>{props.player_ID}</ModalHeader>
      <ModalBody>
        PLAYER INFORMATION...
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>
          Do Something
        </Button>{" "}
        <Button
          color="secondary"
          onClick={handleClose}
        >
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
