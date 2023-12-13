import React from "react";

import "../../../styles/index.scss";
import Placeholder from "../../../static/img/no-image.png";

const CardInfo = ({ draftPick }) => (
  <div className={draftPick.playerName === "" ? "" : "fan-team-card"}>
    <span style={{ paddingLeft: "1rem" }}>{draftPick.int}</span>
    {draftPick.playerName === "" ? null : (
      <img className="fan-team-card__image" src={Placeholder} alt="" />
    )}
    <span
      style={{ paddingLeft: "1rem", fontWeight: "bold", fontSize: "larger" }}
    >
      {draftPick && "   " + draftPick.playerName}
    </span>
    <span>{}</span>
  </div>
);

const FanPickCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default FanPickCardItem;
