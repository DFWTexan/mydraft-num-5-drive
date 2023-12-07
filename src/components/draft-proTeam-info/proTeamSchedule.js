import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/index.scss";

const ProTeamSchedule = ({ teamID, teamNickname, width, height, color }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBackgroundColorClass = (proTeamNickname) => {

console.log("EMFTest ==> (ProTeamSchedule:getBackgroundColorClass) - proTeamNickname => \n", proTeamNickname);

    switch (proTeamNickname) {
      case "Cardinals":
        return "proTeamSchedulePanel--cardinals";
      case "Falcons":
        return "proTeamSchedulePanel--falcons";
      case "Ravens":
        return "proTeamSchedulePanel--ravens";
      case "Bills":
        return "proTeamSchedulePanel--bills";
      case "Panthers":
        return "proTeamSchedulePanel--panthers";
      case "Bears":
        return "proTeamSchedulePanel--bears";
      case "Bengals":
        return "proTeamSchedulePanel--bengals";
      case "Browns":
        return "proTeamSchedulePanel--browns";
      case "Cowboys":
        return "proTeamSchedulePanel--cowboys";
      case "Broncos":
        return "proTeamSchedulePanel--broncos";
      case "Lions":
        return "proTeamSchedulePanel--lions";
      case "Packers":
        return "proTeamSchedulePanel--packers";
      case "Texans":
        return "proTeamSchedulePanel--texans";
      case "Colts":
        return "proTeamSchedulePanel--colts";
      case "Jaguars":
        return "proTeamSchedulePanel--jaguars";
      case "Chiefs":
        return "proTeamSchedulePanel--chiefs";
      case "Chargers":
        return "proTeamSchedulePanel--chargers";
      case "Rams":
        return "proTeamSchedulePanel--rams";
      case "Dolphins":
        return "proTeamSchedulePanel--dolphins";
      case "Vikings":
        return "proTeamSchedulePanel--vikings";
      case "Patriots":
        return "proTeamSchedulePanel--patriots";
      case "Saints":
        return "proTeamSchedulePanel--saints";
      case "Giants":
        return "proTeamSchedulePanel--giants";
      case "Jets":
        return "proTeamSchedulePanel--jets";
      case "Raiders":
        return "proTeamSchedulePanel--raiders";
      case "Eagles":
        return "proTeamSchedulePanel--eagles";
      case "Steelers":
        return "proTeamSchedulePanel--steelers";
      case "49ers":
        return "proTeamSchedulePanel--49ers";
      case "Seahawks":
        return "proTeamSchedulePanel--seahawks";
      case "Buccaneers":
        return "proTeamSchedulePanel--buccaneers";
      case "Titans":
        return "proTeamSchedulePanel--titans";
      case "Redskins":
        return "proTeamSchedulePanel--redskins";
      default:
        return ""; // Default or fallback class
    }
  };

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

  // const style = {
  //   display: "flex",
  //   flexDirection: "column", // This line ensures items are listed vertically
  //   alignItems: "flex-start", // Align items to the start of the container
  //   width: width || "100%",
  //   height: height || "auto", // Adjust height to "auto" for dynamic sizing
  //   backgroundColor: color || "#f0f0f0",
  //   padding: "0.5rem", // Add some padding around the container
  //   overflowY: "auto", // Add vertical scroll if content overflows
  // };

  const backgroundColorClass = getBackgroundColorClass(teamNickname);

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
                  <div className={`proTeamSchedulePanel ${backgroundColorClass}`}>
                    <div className="proTeamScheduleItem">
                      <div className="proTeamScheduleItem__header">
                        <div className="proTeamScheduleItem__game">
                          {item.value.week === 0 ? <span>BYE</span> : "Week " + item.value.week}
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
