import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/index.scss";

const ProTeamNews = ({ teamID, width, height, color }) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}ProTeam/News/${teamID}`
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
    padding: "1rem", // Add some padding around the container
    overflowY: "auto", // Add vertical scroll if content overflows
  };

  return teamID === 0 ? (
    <div style={{ paddingTop: '2rem' }}>No Team Selected for News...</div>
  ) : (
    <div style={style}>
      {data &&
        data.map((item, index) => (
          <div className="proTeamNewsItem" key={index}>
            <div className="proTeamNewsItem__title">{item.title}</div>
            <div className="proTeamNewsItem__date">{item.pubDate}</div>
            <div className="proTeamNewsItem__description">
              {item.newsDescription}
            </div>
          </div>
        ))}
    </div>
  );
};
export default ProTeamNews; 
