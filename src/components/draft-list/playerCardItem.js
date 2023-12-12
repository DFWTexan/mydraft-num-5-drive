import React from "react";

import "../../styles/index.scss";
import Placeholder from "../../static/img/no-image.png";  

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

const CardInfo = ({ player }) => (
  <div className="draft-selection-card__title">
    <div style={{ margin: "1rem" }}>
      <img
        className="draft-selection-card__image"
        src={player.photoURL ? player.photoURL : Placeholder}
        alt=""
      />
    </div>
    <div className="draft-selection-card__player-info">
      <div className="draft-selection-card__name">
        {player.firstName} {player.lastName}
      </div>
      <div className="draft-selection-card__team">{player.teamAbbr}</div>
    </div>
    <div className="draft-selection-card__rankings">
      {
        <div
          className={`draft-selection-card__player-position ${getColorClass(player.position)}`}
        >
          {player.position}
        </div>
      }
      <table className="draft-selection-card__rankings-table">
        <thead>
          <tr>
            <th className="draft-selection-card__rankings-header">PTS</th>
            <th className="draft-selection-card__rankings-header">AAV</th>
            <th className="draft-selection-card__rankings-header">ADP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="draft-selection-card__rankings-value">
              {player.pointsVal}
            </td>
            <td className="draft-selection-card__rankings-value">
              {player.aavPoints}
            </td>
            <td className="draft-selection-card__rankings-value">
              {player.adpPoints}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const PlayerCardItem = ({ player }) => {
  return <CardInfo player={player} />;
};

export default PlayerCardItem;
