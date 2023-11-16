import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="d-flex justify-content-start">

{console.log("==> EMFTest (DraftPickPositionCardItem) - draftPick: ", draftPick === "" ? "null" : draftPick)}


    {draftPick.round + "." + draftPick.pickInRound}  {draftPick && ("   " + draftPick.playerName)}
  </div>
);

const DraftPickPositionCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default DraftPickPositionCardItem;