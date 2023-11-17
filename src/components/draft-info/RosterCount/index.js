import React from "react";

const RosterCount = (props) => {
  return (
    <div style={{ margin: 5 }}>
      <table style={{ width:'100%' }}>
        <thead>
          <tr>
            <th>Team</th>
            <th>QB</th>
            <th>RB</th>
            <th>WR</th>
            <th>TE</th>
            <th>K</th>
            <th>DEF</th>
          </tr>
        </thead>
        <tbody>
          {props.rosters.map((item) => (
            <tr key={item.key}>
              <td>{item.key}</td>
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
