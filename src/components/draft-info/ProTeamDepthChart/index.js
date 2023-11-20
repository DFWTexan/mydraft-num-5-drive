import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "../../../styles/index.scss";
import { API_URL } from "../../../config";

const ProTeamDepthChart = (props) => {
  const [displayData, setDisplayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}Draft/GetPositionDepthChart/${props.positionDisplay}`)
      .then((response) => {
        setDisplayData(response.data);
        setIsLoading(false);
      });
  }, [props.positionDisplay]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50rem",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <React.Fragment>
          <table>
            <tbody>
              {displayData.map((item, index) => (
                <tr key={index}>
                  <td className="team_col">
                    <strong>{item.key}</strong>
                  </td>
                  {item.value.map((player, playerIndex) => (
                    <td
                      key={playerIndex}
                      className={`player_col ${
                        player.isDrafted ? "drafted" : ""
                      }`}
                    >
                      {player.name}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </>
  );
};

export default ProTeamDepthChart;
