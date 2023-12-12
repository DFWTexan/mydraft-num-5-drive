import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  <div className="d-flex justify-content-start">
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <table style={{ width: '3.5rem'}}>
              <tbody>
                <tr>
                  <td className="over-all-pick">{draftPick.overallPick}</td>
                </tr>
                <tr>
                  <td className="pick-round">{draftPick.round + "." + draftPick.pickInRound}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td className="player-select-card">
            {(draftPick.player == null ? "N/A" : draftPick.player.firstName) +
              " " +
              (draftPick.player == null ? "" : draftPick.player.lastName)}
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
