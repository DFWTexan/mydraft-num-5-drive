import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick, otcID, currentPick }) => {
  const className = draftPick.isMyTeamPick
    ? "draft-selection-card-my-team-pick"
    : draftPick.teamID === otcID
    ? draftPick.overallPick === currentPick
      ? "draft-selection-card-on-the-clock"
      : "draft-selection-card"
    : "draft-selection-card";

  return (
    <div className={className}>
      {draftPick.round + "." + draftPick.pickInRound}{" "}
      <div className="draft-selection-card__title">
        {draftPick.player && (
          <span>
            {draftPick.player.firstName +
              " " +
              draftPick.player.lastName +
              " - " +
              draftPick.player.position}
          </span>
        )}
      </div>
    </div>
  );
};

const DraftPickCardItem = ({ draftPick, otcID, currentPick }) => {
  return (
    <CardInfo draftPick={draftPick} otcID={otcID} currentPick={currentPick} />
  );
};

export default DraftPickCardItem;
