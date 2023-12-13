import React from "react";

import "../../../styles/draftPickCard.scss";
import "../../../styles/draftSelection.scss";

const getColorClass = (position) => {
  switch (position) {
    case "QB":
      return "qb-color";
    case "RB":
      return "rb-color";
    case "WR":
      return "wr-color";
    case "TE":
      return "te-color";
    case "K":
      return "k-color";
    case "DEF":
      return "def-color";
    default:
      return ""; // Default or fallback class
  }
};

const CardInfo = ({ draftPick, otcID, currentPick }) => {
  const pickOverAllClass = draftPick.isMyTeamPick
    ? "draft-selection-pick-info__overall_my_team_pick"
    : draftPick.teamID === otcID
    ? draftPick.overallPick === currentPick
      ? "draft-selection-pick-info__overall_otc"
      : "draft-selection-pick-info__overall"
    : "draft-selection-pick-info__overall";

  const className = draftPick.isMyTeamPick
    ? "draft-selection-card-my-team-pick"
    : draftPick.teamID === otcID
    ? draftPick.overallPick === currentPick
      ? "draft-selection-card-on-the-clock"
      : "draft-selection-card"
    : "draft-selection-card";

  return (
    <div className={className}>
      {/* <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        {draftPick.round + "." + draftPick.pickInRound}
      </span> */}
      <div className="draft-selection-pick-info">
        <span className={pickOverAllClass}>{draftPick.overallPick}</span>
        <span className="draft-selection-pick-info__round">
          {draftPick.round + "." + draftPick.pickInRound}
        </span>
      </div>
      <div className="draft-selection-card__title">
        {draftPick.player ? (
          <div>
            <span>
              {draftPick.player.firstName +
                " " +
                draftPick.player.lastName +
                " - "}
            </span>
            <span className={` ${getColorClass(draftPick.player.position)}`}>
              {draftPick.player.position}
            </span>
          </div>
        ) : draftPick.overallPick === currentPick ? (
          <div className="draft-selection__otc-item">
            <span
              style={{
                paddingLeft: ".5rem",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              {draftPick.fanTeamName}
            </span>
            <span className="material-symbols-outlined">alarm</span>
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
