import React from "react";

import "../../../styles/index.scss";

const RosterCount = (props) => {
  return (
    <div className="detail-container">
      <table style={{ width:'100%' }}>
        <thead>
          <tr>
            <th style={{ fontSize: 40, textAlign: 'left', paddingBottom: 15 }}>Team</th>
            <th className="position-header">QB</th>
            <th className="position-header">RB</th>
            <th className="position-header">WR</th>
            <th className="position-header">TE</th>
            <th className="position-header">K</th>
            <th className="position-header">DEF</th>
          </tr>
        </thead>
        <tbody>
          {props.rosters.map((item, index) => (
            <tr key={item.key} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td className="team-name">{item.key}</td>
              <td>{item.value.QB}</td>
              <td>{item.value.RB}</td>
              <td>{item.value.WR}</td>
              <td>{item.value.TE}</td>
              <td>{item.value.K}</td>
              <td>{item.value.DEF}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RosterCount;
