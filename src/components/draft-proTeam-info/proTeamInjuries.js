import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/index.scss";

const ProTeamInjuries = ({ teamID, teamNickname, width, height, color }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBackgroundColorClass = (proTeamNickname) => {
    switch (proTeamNickname) {
      case "Cardinals":
        return "proTeamIjuryPanel--cardinals";
      case "Falcons":
        return "proTeamIjuryPanel--falcons";
      case "Ravens":
        return "proTeamIjuryPanel--ravens";
      case "Bills":
        return "proTeamIjuryPanel--bills";
      case "Panthers":
        return "proTeamIjuryPanel--panthers";
      case "Bears":
        return "proTeamIjuryPanel--bears";
      case "Bengals":
        return "proTeamIjuryPanel--bengals";
      case "Browns":
        return "proTeamIjuryPanel--browns";
      case "Cowboys":
        return "proTeamIjuryPanel--cowboys";
      case "Broncos":
        return "proTeamIjuryPanel--broncos";
      case "Lions":
        return "proTeamIjuryPanel--lions";
      case "Packers":
        return "proTeamIjuryPanel--packers";
      case "Texans":
        return "proTeamIjuryPanel--texans";
      case "Colts":
        return "proTeamIjuryPanel--colts";
      case "Jaguars":
        return "proTeamIjuryPanel--jaguars";
      case "Chiefs":
        return "proTeamIjuryPanel--chiefs";
      case "Chargers":
        return "proTeamIjuryPanel--chargers";
      case "Rams":
        return "proTeamIjuryPanel--rams";
      case "Dolphins":
        return "proTeamIjuryPanel--dolphins";
      case "Vikings":
        return "proTeamIjuryPanel--vikings";
      case "Patriots":
        return "proTeamIjuryPanel--patriots";
      case "Saints":
        return "proTeamIjuryPanel--saints";
      case "Giants":
        return "proTeamIjuryPanel--giants";
      case "Jets":
        return "proTeamIjuryPanel--jets";
      case "Raiders":
        return "proTeamIjuryPanel--raiders";
      case "Eagles":
        return "proTeamIjuryPanel--eagles";
      case "Steelers":
        return "proTeamIjuryPanel--steelers";
      case "49ers":
        return "proTeamIjuryPanel--49ers";
      case "Seahawks":
        return "proTeamIjuryPanel--seahawks";
      case "Buccaneers":
        return "proTeamIjuryPanel--buccaneers";
      case "Titans":
        return "proTeamIjuryPanel--titans";
      case "Redskins":
        return "proTeamIjuryPanel--redskins";
      default:
        return ""; // Default or fallback class
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}ProTeam/Injuries/${teamID}`
      )
      .then((response) => {
        setData([...response.data]);
      });
    setLoading(false);
  }, [teamID]);

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
                  <div className={`proTeamIjuryPanel ${backgroundColorClass}`}>
                    <div className="proTeamInjuryItem">
                      <div className="proTeamInjuryItem__header">
                        <div className="proTeamInjuryItem__player">
                          <div>{item.firstNameInitial}.<span style={{ fontWeight: "bolder" }}>{item.lastName}</span></div>
                          <div>{item.position}</div>
                        </div>
                        <div className="proTeamInjuryItem__injury">
                          {item.type}
                        </div>
                        <div className="proTeamInjuryItem__status">
                          {item.status}
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
export default ProTeamInjuries;
