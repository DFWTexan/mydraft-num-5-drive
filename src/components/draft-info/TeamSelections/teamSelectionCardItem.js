import React from "react";

import "../../../styles/index.scss";

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

const CardInfo = ({ draftPick }) => (
  <div className="d-flex justify-content-start" style={{ width: "100%" }}>
    <div className="d-flex flex-column" style={{ width: "3.5rem" }}>
      <div className="over-all-pick">{draftPick.overallPick}</div>
      <div className="pick-round">
        {draftPick.round + "." + draftPick.pickInRound}
      </div>
    </div>
    <div className="player-select-card">
      <span style={{ fontWeight: "600", fontSize: "large" }}>
        {(draftPick.player == null ? "N/A" : draftPick.player.firstName) +
          " " +
          (draftPick.player == null ? "" : draftPick.player.lastName)}
      </span>
      <div>
        <span style={{ paddingRight: '1rem' }}>
          {draftPick.player == null ? "" : draftPick.player.teamAbbr}
        </span>
        |
        <span className={`playerposition ${getColorClass(
                  draftPick.player == null ? "" : draftPick.player.position
                )}`}>
          {draftPick.player == null ? "" : draftPick.player.position}
        </span>
      </div>
    </div>
  </div>
);

const TeamSelectionCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default TeamSelectionCardItem;
