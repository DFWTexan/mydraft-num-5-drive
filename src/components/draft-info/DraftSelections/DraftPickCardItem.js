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
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{draftPick.round + "." + draftPick.pickInRound}</span>
      <div className="draft-selection-card__title">
        {draftPick.player ? (
          <span>
            {draftPick.player.firstName +
              " " +
              draftPick.player.lastName +
              " - " +
              draftPick.player.position}
          </span>
        ) : draftPick.overallPick === currentPick ? (
          <div>
            <span style={{ color: '#FF0000', fontWeight: 'lighter' }}>On the Clock:</span>
            <span style={{  paddingLeft: '.5rem', fontSize: "1.3rem", fontWeight: "600" }}>
              {draftPick.fanTeamName}
            </span>
          </div>
        ) : (
          <span style={{ color: "#778899" }}>{draftPick.fanTeamName}</span>
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
