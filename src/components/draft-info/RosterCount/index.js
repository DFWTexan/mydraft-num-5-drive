import React from "react";

import "../../../styles/index.scss";

const RosterCount = (props) => {
  return (
    <div style={{ margin: 5, height: 775 }}>
      <table style={{ width:'100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Team</th>
            <th>QB</th>
            <th>RB</th>
            <th>WR</th>
            <th>TE</th>
            <th>K</th>
            <th>DEF</th>
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
