import React from "react";
import { FormGroup, Label, ListGroupItem } from "reactstrap";

import '../../styles/index.scss';

const CardInfo = ({ player }) => (
  <FormGroup>
    <Label className="inline-check-label">{player.firstName + ' ' + player.lastName}</Label>
  </FormGroup>
);

const PlayerCardItem = ({player}) => {
  return (
    <ListGroupItem className='player-card-content'>
        <CardInfo player={player}/>
    </ListGroupItem>
  );
};

export default PlayerCardItem;