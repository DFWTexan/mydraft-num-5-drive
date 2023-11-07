import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="d-flex justify-content-start">
    {draftPick.round + "." + draftPick.pickInRound}  {draftPick.player && ("   " + draftPick.player.firstName + " " + draftPick.player.lastName + ' - ' + draftPick.player.position)}
  </div>
);

const DraftPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default DraftPickCardItem;
