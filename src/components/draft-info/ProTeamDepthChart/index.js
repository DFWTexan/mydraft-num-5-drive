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
            <td
              style={{
                textAlign: "left",
                width: 50,
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor: "#F0F8FF",
              }}
            >
              <strong>{item.key}</strong>
            </td>
            {item.value.map((player) => (
              <td
                style={{
                  paddingLeft: 5,
                  textAlign: "left",
                  width: 75,
                  fontSize: 15,
                  border: 1,
                  borderStyle: "solid",
                  borderColor: "gray",
                }}
              >
                {" "}
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
