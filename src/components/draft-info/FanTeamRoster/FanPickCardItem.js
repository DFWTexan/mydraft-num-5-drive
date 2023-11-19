import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="fan-team-card ">
    <strong>{draftPick.int}</strong>  {draftPick && ("   " + draftPick.playerName)}
  </div>
);

const FanPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default FanPickCardItem;