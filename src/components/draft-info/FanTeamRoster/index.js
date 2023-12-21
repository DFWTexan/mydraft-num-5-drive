import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, ListSubheader, List } from "@mui/material";
// import axios from "axios";

import "../../../styles/index.scss";
import { fetchFanTeamRoster } from "../../../slices/fanTeamRoster";
import FanPickCardItem from "./FanPickCardItem";
import FanTeamSelect from "../../Common/fanTeamSelect";
// import { API_URL } from "../../../config";

const FanTeamRoster = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const fanTeamRoster = useSelector((state) => state.fanTeamRoster);
  const onTheClock = useSelector((state) => state.draftStatus.onTheClock);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    if (props.selectedTeam === 0) {
      return;
    }
    dispatch(fetchFanTeamRoster(props.selectedTeam));
  }, [dispatch, props.selectedTeam]);

  // useEffect(() => {
  //   axios.get(`${API_URL}${props.player_ID}`).then((response) => {
  //     setPlayerData(response.data);
  //   });
  // }, [props.player_ID]);

  useEffect(() => {
    initFetch();
  }, [initFetch, onTheClock]);

  return (
    <div className="detail-container">
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "10",
          background: "white",
        }}
      >
        <FanTeamSelect
          teams={activeLeague.teams}
          selectedTeam={props.selectedTeam}
          setSelectedTeam={props.setSelectedTeam}
        />
      </div>
      <div style={{ padding: ".3rem" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            // overflow: "auto",
            maxHeight: 800,
            "& ul": { padding: 0 },
          }}
        >
          {fanTeamRoster &&
            (() => {
              let sortOrder = 0;
              return fanTeamRoster.map((element, index) => {
                if (element.sortOrder !== sortOrder) {
                  sortOrder = element.sortOrder;
                  return (
                    <React.Fragment key={index}>
                      <ListSubheader
                        style={{ background: "#2f353a", color: "white" }}
                      >
                        {element.positionGroup}
                      </ListSubheader>
                      <ListItem>
                        <div className="fan-team-panel">
                          <FanPickCardItem draftPick={element} />
                        </div>
                      </ListItem>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment key={index}>
                      <ListItem>
                        <div className="fan-team-panel">
                          <FanPickCardItem draftPick={element} />
                        </div>
                      </ListItem>
                    </React.Fragment>
                  );
                }
              });
            })()}
        </List>
      </div>
    </div>
  );
};

export default FanTeamRoster;
