import React from "react";

import "../../styles/index.scss";

const CardInfo = ({ player }) => (
  <div className="draft-selection-card__title">
    <div style={{ margin: "1rem" }}>
      <img
        className="draft-selection-card__image"
        src={player.photoURL}
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
      <div className="draft-selection-card__player-position">{player.position}</div>
      <table className="draft-selection-card__rankings-table">
        <tbody>
          <th className="draft-selection-card__rankings-header">PTS</th>
          <th className="draft-selection-card__rankings-header">AAV</th>
          <th className="draft-selection-card__rankings-header">ADP</th>
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
