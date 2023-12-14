import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "../../../styles/index.scss";
import FanTeamSelect from "../../Common/fanTeamSelect";

const FanTeamNews = (props) => {
  // const [loading, setLoading] = useState(true);
  const activeLeague = useSelector((state) => state.activeLeague);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Draft/GetTeamNews/${props.selectedTeam}`
      )
      .then((response) => {
        setNewsData([...response.data]);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [props.selectedTeam]);

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: props.width || "100%",
    height: props.height || "auto",
    backgroundColor: props.color || "#f0f0f0",
    padding: "1rem",
    overflowY: "auto",
  };

  return (
    <div className="detail-container">
      <div style={{ position: 'sticky', top: '0', zIndex: '10', background: 'white' }}>
        <FanTeamSelect
          teams={activeLeague.teams}
          selectedTeam={props.selectedTeam}
          setSelectedTeam={props.setSelectedTeam}
        />
      </div>
      {props.selectedTeam === 0 ? (
        <>
          <div style={{ paddingTop: "1rem", fontSize: "1.5rem" }}>
            No Team Selected
          </div>
        </>
      ) : (
        <div style={{ padding: ".3rem" }}>
          {newsData.length > 0 ? (
            newsData.map((item, index) => (
              <React.Fragment key={index}>
                <div style={style}>
                  <div className="fanTeamNewsItem">
                    <div className="fanTeamNewsItem__header">
                      <div className="fanTeamNewsItem__playerName">
                        {item.playerName}
                      </div>
                      <div className="fanTeamNewsItem__date">
                        {item.dateString}
                      </div>
                    </div>
                    <div className="fanTeamNewsItem__description">
                      {item.newsDescription}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <div>
              <div>
                <div style={{ paddingTop: "1rem", fontSize: "1.5rem" }}>
                  No news available
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default FanTeamNews;
