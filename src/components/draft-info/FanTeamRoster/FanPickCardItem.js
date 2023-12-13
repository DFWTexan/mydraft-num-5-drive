import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className={draftPick.playerName === '' ? "" : "fan-team-card"}>
    <span>{draftPick.int}</span> <span style={{ paddingLeft: '1rem', fontWeight: 'bold', fontSize: 'larger' }}>{draftPick && ("   " + draftPick.playerName)}</span> 
  </div>
);

const FanPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default FanPickCardItem;