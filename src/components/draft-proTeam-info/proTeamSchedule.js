import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/index.scss";

const ProTeamSchedule = ({ teamID, width, height, color }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}ProTeam/Schedule/${teamID}`
      )
      .then((response) => {
        setData([...response.data]);
      });
    setLoading(false);
  }, [teamID]);

  const style = {
    display: "flex",
    flexDirection: "column", // This line ensures items are listed vertically
    alignItems: "flex-start", // Align items to the start of the container
    width: width || "100%",
    height: height || "auto", // Adjust height to "auto" for dynamic sizing
    backgroundColor: color || "#f0f0f0",
    padding: "0.5rem", // Add some padding around the container
    overflowY: "auto", // Add vertical scroll if content overflows
  };

  return teamID === 0 ? (
    <div style={{ paddingTop: "5rem", fontSize: "1.5rem" }}>
      No Team Selected
    </div>
  ) : (
    <>
      {data.length > 0 ? (
        <>
          {Loading ? (
            <div></div>
          ) : (
            <React.Fragment>
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div style={style}>
                    <div className="proTeamScheduleItem">
                      <div className="proTeamScheduleItem__header">
                        <div className="proTeamScheduleItem__game">
                          {item.value.week === 0 ? "Week BYE" : "Week " + item.value.week}
                        </div>
                        <div className="proTeamScheduleItem__game">
                          {item.value.designation}
                        </div>
                        <div className="proTeamScheduleItem__game">
                          {item.value.designation === "VS" ? item.value.awayTeamName : item.value.homeTeamName}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </>
      ) : (
        <div style={{ paddingTop: "2rem" }}>No News Found...</div>
      )}
    </>
  );
};
export default ProTeamSchedule;
