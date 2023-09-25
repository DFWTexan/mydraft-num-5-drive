import React from "react";
import { FormGroup, Label } from "reactstrap";

import '../../styles/index.scss';

const CardInfo = ({ player }) => (
  <FormGroup>
    <Label className="inline-check-label">{player.firstName + ' ' + player.lastName + ' (' + player.position + ') '}</Label>
  </FormGroup>
);

const PlayerCardItem = ({player}) => {
  return (
    <CardInfo player={player}/>
  );
};

export default PlayerCardItem;