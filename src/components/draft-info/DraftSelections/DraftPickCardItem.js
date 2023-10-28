import React from "react";
import { Form, FormGroup, Label, Col } from "reactstrap";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <Form>
    <FormGroup row>
      <Label className="inline-check-label">
        {draftPick.round + "." + draftPick.pickInRound}
      </Label>
      {draftPick.player && (
        <Col sm={10}>
          {draftPick.player.firstName + " " + draftPick.player.lastName + ' - ' + draftPick.player.position}
        </Col>
      )}
    </FormGroup>
  </Form>
);

const DraftPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default DraftPickCardItem;
