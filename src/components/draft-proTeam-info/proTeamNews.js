import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/index.scss";

const ProTeamNews = ({ teamID, teamNickname, width, height, color }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBackgroundColorClass = (proTeamNickname) => {
    switch (proTeamNickname) {
      case "Cardinals":
        return "proTeamNewsPanel--cardinals";
      case "Falcons":
        return "proTeamNewsPanel--falcons";
      case "Ravens":
        return "proTeamNewsPanel--ravens";
      case "Bills":
        return "proTeamNewsPanel--bills";
      case "Panthers":
        return "proTeamNewsPanel--panthers";
      case "Bears":
        return "proTeamNewsPanel--bears";
      case "Bengals":
        return "proTeamNewsPanel--bengals";
      case "Browns":
        return "proTeamNewsPanel--browns";
      case "Cowboys":
        return "proTeamNewsPanel--cowboys";
      case "Broncos":
        return "proTeamNewsPanel--broncos";
      case "Lions":
        return "proTeamNewsPanel--lions";
      case "Packers":
        return "proTeamNewsPanel--packers";
      case "Texans":
        return "proTeamNewsPanel--texans";
      case "Colts":
        return "proTeamNewsPanel--colts";
      case "Jaguars":
        return "proTeamNewsPanel--jaguars";
      case "Chiefs":
        return "proTeamNewsPanel--chiefs";
      case "Chargers":
        return "proTeamNewsPanel--chargers";
      case "Rams":
        return "proTeamNewsPanel--rams";
      case "Dolphins":
        return "proTeamNewsPanel--dolphins";
      case "Vikings":
        return "proTeamNewsPanel--vikings";
      case "Patriots":
        return "proTeamNewsPanel--patriots";
      case "Saints":
        return "proTeamNewsPanel--saints";
      case "Giants":
        return "proTeamNewsPanel--giants";
      case "Jets":
        return "proTeamNewsPanel--jets";
      case "Raiders":
        return "proTeamNewsPanel--raiders";
      case "Eagles":
        return "proTeamNewsPanel--eagles";
      case "Steelers":
        return "proTeamNewsPanel--steelers";
      case "49ers":
        return "proTeamNewsPanel--49ers";
      case "Seahawks":
        return "proTeamNewsPanel--seahawks";
      case "Buccaneers":
        return "proTeamNewsPanel--buccaneers";
      case "Titans":
        return "proTeamNewsPanel--titans";
      case "Redskins":
        return "proTeamNewsPanel--redskins";
      default:
        return ""; // Default or fallback class
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}ProTeam/News/${teamID}`
      )
      .then((response) => {
        setData([...response.data]);
      });
    setLoading(false);
  }, [teamID]);

  const backgroundColorClass = getBackgroundColorClass(teamNickname);

  return teamID === 0 ? (
    <div style={{ paddingTop: "5rem", fontSize: '1.5rem' }}>No Team Selected</div>
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
                  <div className={`proTeamNewsPanel ${backgroundColorClass}`}>
                    <div className="proTeamNewsItem">
                      <div className="proTeamNewsItem__title">{item.title}</div>
                      <div className="proTeamNewsItem__date">
                        {item.dateString}
                      </div>
                      <div className="proTeamNewsItem__description">
                        {item.newsDescription}
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
export default ProTeamNews;
