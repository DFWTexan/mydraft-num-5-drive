import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="d-flex justify-content-start">
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <table>
              <tr>
                <td>{draftPick.overallPick}</td>
              </tr>
              <td>{draftPick.round + "." + draftPick.pickInRound}</td>
            </table>
          </td>
          <td className="player-select-card">
            {(draftPick.player == null
              ? "N/A"
              : draftPick.player.firstName) + " " + (draftPick.player == null
              ? ""
              : draftPick.player.lastName)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TeamSelectionCardItem = ({ draftPick }) => {
  return <CardInfo draftPick={draftPick} />;
};

export default TeamSelectionCardItem;
