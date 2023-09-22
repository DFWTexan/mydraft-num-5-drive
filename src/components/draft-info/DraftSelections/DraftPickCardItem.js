import React from "react";
import { FormGroup, Label } from "reactstrap";

import '../../../styles/index.scss';

const CardInfo = ({ draftPick }) => (
  <FormGroup>
    <Label className="inline-check-label">{draftPick.round + ' ' + draftPick.pickInRound}</Label>
  </FormGroup>
);

const DraftPickCardItem = ({draftPick}) => {
  return (
    <CardInfo draftPick={draftPick}/>
  );
};

export default DraftPickCardItem;