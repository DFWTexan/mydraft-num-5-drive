import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/index.scss";

const ProTeamInjuries = ({ teamID, teamNickname, width, height, color }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBackgroundColorClass = (proTeamNickname) => {
    switch (proTeamNickname) {
      case "Cardinals":
        return "proTeamInfoPanel--cardinals";
      case "Falcons":
        return "proTeamInfoPanel--falcons";
      case "Ravens":
        return "proTeamInfoPanel--ravens";
      case "Bills":
        return "proTeamInfoPanel--bills";
      case "Panthers":
        return "proTeamInfoPanel--panthers";
      case "Bears":
        return "proTeamInfoPanel--bears";
      case "Bengals":
        return "proTeamInfoPanel--bengals";
      case "Browns":
        return "proTeamInfoPanel--browns";
      case "Cowboys":
        return "proTeamInfoPanel--cowboys";
      case "Broncos":
        return "proTeamInfoPanel--broncos";
      case "Lions":
        return "proTeamInfoPanel--lions";
      case "Packers":
        return "proTeamInfoPanel--packers";
      case "Texans":
        return "proTeamInfoPanel--texans";
      case "Colts":
        return "proTeamInfoPanel--colts";
      case "Jaguars":
        return "proTeamInfoPanel--jaguars";
      case "Chiefs":
        return "proTeamInfoPanel--chiefs";
      case "Chargers":
        return "proTeamInfoPanel--chargers";
      case "Rams":
        return "proTeamInfoPanel--rams";
      case "Dolphins":
        return "proTeamInfoPanel--dolphins";
      case "Vikings":
        return "proTeamInfoPanel--vikings";
      case "Patriots":
        return "proTeamInfoPanel--patriots";
      case "Saints":
        return "proTeamInfoPanel--saints";
      case "Giants":
        return "proTeamInfoPanel--giants";
      case "Jets":
        return "proTeamInfoPanel--jets";
      case "Raiders":
        return "proTeamInfoPanel--raiders";
      case "Eagles":
        return "proTeamInfoPanel--eagles";
      case "Steelers":
        return "proTeamInfoPanel--steelers";
      case "49ers":
        return "proTeamIjuproTeamInfoPanelryPanel--49ers";
      case "Seahawks":
        return "proTeamInfoPanel--seahawks";
      case "Buccaneers":
        return "proTeamInfoPanel--buccaneers";
      case "Titans":
        return "proTeamInfoPanel--titans";
      case "Redskins":
        return "proTeamInfoPanel--redskins";
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
                  <div className={`proTeamInfoPanel ${backgroundColorClass}`}>
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
