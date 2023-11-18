import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../../styles/index.scss";
import { API_URL } from "../../../config";

const ProTeamDepthChart = (props) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}Draft/GetPositionDepthChart/${props.positionDisplay}`)
      .then((response) => {
        setDisplayData(response.data);
      });
  }, [props.positionDisplay]);

  return (
    <table>
      <tbody>
        {displayData.map((item) => (
          <tr key={item.key}>
            <td className="team_col">
              <strong>{item.key}</strong>
            </td>
            {item.value.map((player) => (
              <td className="player_col">
                {player.name}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProTeamDepthChart;
