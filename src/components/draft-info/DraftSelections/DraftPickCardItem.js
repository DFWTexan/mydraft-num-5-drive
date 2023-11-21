import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="draft-selection-card">
    {draftPick.round + "." + draftPick.pickInRound}{" "}
    <div className="draft-selection-card__title">
      {draftPick.player &&
        "   " +
          draftPick.player.firstName +
          " " +
          draftPick.player.lastName +
          " - " +
          draftPick.player.position}
    </div>
  </div>
);

const DraftPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default DraftPickCardItem;
