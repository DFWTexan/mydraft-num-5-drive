import React from "react";

import "../../../styles/index.scss";

const CardInfo = ({ draftPick }) => (
  // <div className="d-flex justify-content-start">
  //   <table style={{ width: "100%" }}>
  //     <tbody>
  //       <tr>
  //         <td>
  //           <table style={{ width: '3.5rem'}}>
  //             <tbody>
  //               <tr>
  //                 <td className="over-all-pick">{draftPick.overallPick}</td>
  //               </tr>
  //               <tr>
  //                 <td className="pick-round">{draftPick.round + "." + draftPick.pickInRound}</td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </td>
  //         <td className="player-select-card">
  //           <span>
  //           {(draftPick.player == null ? "N/A" : draftPick.player.firstName) +
  //             " " +
  //             (draftPick.player == null ? "" : draftPick.player.lastName)}
  //           </span>
  //           <span>
  //             {draftPick.player == null ? "" : draftPick.player.position}
  //           </span>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </div>
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
        <span className="playerposition">
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
