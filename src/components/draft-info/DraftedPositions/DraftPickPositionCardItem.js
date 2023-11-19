import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="draft-position-card-item">
    <strong>{draftPick.round + "." + draftPick.pickInRound}</strong>
    <span style={{ paddingLeft: '1rem' }}>{draftPick && "   " + draftPick.playerName}</span>
  </div>
);

const DraftPickPositionCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default DraftPickPositionCardItem;
