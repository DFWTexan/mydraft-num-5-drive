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

const PlayerSelectedModal = ({ props , player}) => {
  // const { className } = props;
  const [modal, setModal] = useState(props.isOpen);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);
  const toggle = () => setModal(!modal);
  
  console.log("==> EMFTest (PlayerSelectedModal) props: ", props.isOpen);
  console.log("==> EMFTest (PlayerSelectedModal) player: ", player);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      // className={className}
      className="modal-dialog-centered"
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <ModalHeader toggle={toggle}>{player.firstName + ' ' + player.lastName}</ModalHeader>
      <ModalBody>
        PLAYER INFORMATION...
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Do Something
        </Button>{" "}
        <Button
          color="secondary"
          onClick={toggle}
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
