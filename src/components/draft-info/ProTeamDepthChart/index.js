import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "../../../styles/index.scss";
// import { API_URL } from "../../../config";

const getTabBackgroundColor = (pos) => {
  switch (pos) {
    case "QB":
      return "qb-background";
    case "RB":
      return "rb-background";
    case "WR":
      return "wr-background";
    case "TE":
      return "te-background";
    case "PK":
      return "k-background";
    // case "DEF":
    //   return "k-background";
    default:
      return "";
  }
};

const ProTeamDepthChart = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Draft/GetPositionDepthChart/${props.positionDisplay}`
      )
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
                  <td className={`team_col ${getTabBackgroundColor(props.positionDisplay)}`}>
                    <strong>{item.key}</strong>
                  </td>
                  {item.value.map((player, playerIndex) => (
                    <td
                      key={playerIndex}
                      className={`player_col ${
                        player.isDrafted
                          ? player.isOnMyTeam
                            ? "drafted-MyTeam"
                            : "drafted"
                          : ""
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
