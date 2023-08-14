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

const PlayerSelectedModal = ({ props }, player) => {
  const { className } = props;
  const [modal, setModal] = useState(props.isOpen);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);
  const toggle = () => setModal(!modal);
  
  console.log("==> EMFTest (PlayerSelectedModal): ", props.isOpen);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      // className={className}
      className="modal-dialog-centered"
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
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
