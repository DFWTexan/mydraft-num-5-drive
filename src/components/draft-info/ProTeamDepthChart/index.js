import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../../styles/index.scss";
import { API_URL } from "../../../config";

const ProTeamDepthChart = (props) => {
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}Draft/GetPositionDepthChart/${props.positionDisplay}`).then((response) => {
            setDisplayData(response.data);
        });
      }, [props.positionDisplay]);

    return (
    <div style={{ margin: 5, height: 775 }}>
        {props.positionDisplay}
      {/* <table style={{ width:'100%' }}>
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
      </table> */}
    </div>
  );
};
export default ProTeamDepthChart;
