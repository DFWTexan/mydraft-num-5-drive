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
        console.log(
          "==> EMFTest (ProTeamDepthChart) - response.data => \n",
          response.data
        );

        setDisplayData(response.data);
      });
  }, [props.positionDisplay]);

  return (
    // <div style={{ margin: 5, height: 775 }}>
    //     {props.positionDisplay}
    //     {displayData && displayData.length > 0 && displayData.map((item, index) => (
    //         <div key={item.key} className={index % 2 === 0 ? 'even' : 'odd'}>
    //             <div className="team-name">{item.key}</div>
    //             {item.value.map((player, index) => (
    //                 <div key={player.playerId} className="player-name">{player.playerName}</div>
    //             ))}
    //         </div>
    //     ))}
    // </div>

    // <div>
    //   {displayData.map((item) => (
    //     <div key={item.key}>
    //       <h2>{item.key}</h2>
    //       <ul>
    //         {item.value.map((player) => (
    //           <li key={player.name}>
    //             <strong>{player.name}</strong> - {player.position} -{" "}
    //             {player.team}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>

    <table>
      <tbody>
        {displayData.map((item) => (
          <tr key={item.key}>
            <td style={{ textAlign:'left', width: 50, paddingTop: 5, paddingBottom: 5, backgroundColor: '#F0F8FF' }}>
              <strong>{item.key}</strong>
            </td>
            {item.value.map((player) => (
              <td style={{ paddingLeft: 5, textAlign:'left', width: 75, fontSize: 15, border: 1, borderStyle: 'solid', borderColor: 'gray' }}> {player.name}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProTeamDepthChart;
