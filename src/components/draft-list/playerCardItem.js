import React from "react";

import "../../styles/index.scss";

const CardInfo = ({ player }) => (
  <div className="draft-selection-card__title">
    <div style={{ margin: "1rem" }}>
      <img
        className="draft-selection-card__image"
        src={player.photoURL}
        alt=""
      />
    </div>
    <div className="draft-selection-card__player-info">
      <div className="draft-selection-card__name">
        {player.firstName} {player.lastName}
      </div>
      <div className="draft-selection-card__team">{player.teamAbbr}</div>
    </div>
  </div>
);

const PlayerCardItem = ({ player }) => {
  return <CardInfo player={player} />;
};

export default PlayerCardItem;
