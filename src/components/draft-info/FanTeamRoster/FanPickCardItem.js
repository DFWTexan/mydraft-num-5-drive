import React from "react";
import { Form, FormGroup, Label, Col } from "reactstrap";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <Form>
    <FormGroup row>
      {draftPick && (
        <Col sm={10}>
          {draftPick.playerName}
        </Col>
      )}
    </FormGroup>
  </Form>
);

const FanPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default FanPickCardItem;