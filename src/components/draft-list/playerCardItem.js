import React from "react";

import "../../styles/index.scss";

const CardInfo = ({ player }) => (
  <div className="draft-selection-card__title">
    <div>
      {player.firstName + " " + player.lastName + " (" + player.position + ") "}
    </div>
  </div>
);

const PlayerCardItem = ({ player }) => {
  return <CardInfo player={player} />;
};

export default PlayerCardItem;
