import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="d-flex justify-content-start">
    {draftPick.int}  {draftPick && ("   " + draftPick.playerName != null ? draftPick.playerName : "" )}
  </div>
);

const FanPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default FanPickCardItem;