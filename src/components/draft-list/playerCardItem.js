import React from "react";

import "../../styles/index.scss";
import Placeholder from "../../static/img/no-image.png";
import PlayerNews from "../../static/img/breaking_news.svg";

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
  <div className="draft-player-list-card__title">
    <div style={{ margin: "1rem" }}>
      <img
        className="draft-player-list-card__image"
        src={player.photoURL ? player.photoURL : Placeholder}
        alt=""
      />
    </div>
    <div className="draft-player-list-card__player-info">
      <div className="draft-player-list-card__name">
        {player.fullName} 
      </div>
      <div className="draft-player-list-card__team">{player.teamAbbr}</div>
    </div>
    <div className="draft-player-list-card">
      <div className="draft-player-list-card__player-details">
        {/* {player.isPlayerNews ? (
          <img
            className="draft-player-list-card__news-icon"
            src={PlayerNews}
            alt=""
          />
        ) : null} */}
        <div className={`draft-player-list-card__player-position ${getColorClass(
            player.position
          )}`}
        >
          {player.isPlayerNews ? (
          <img
            className="draft-player-list-card__news-icon"
            src={PlayerNews}
            alt=""
          />
        ) : <div/>}
          {player.position}
        </div>
      </div>
      <div>
        <table className="draft-player-list-card__rankings-table">
          <thead>
            <tr>
              <th className="draft-player-list-card__rankings-header">PTS</th>
              <th className="draft-player-list-card__rankings-header">AAV</th>
              <th className="draft-player-list-card__rankings-header">ADP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="draft-player-list-card__rankings-value">
                {player.pointsVal}
              </td>
              <td className="draft-player-list-card__rankings-value">
                {player.aavPoints}
              </td>
              <td className="draft-player-list-card__rankings-value">
                {player.adpPoints}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const PlayerCardItem = ({ player }) => {
  return <CardInfo player={player} />;
};

export default PlayerCardItem;
