import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, ListSubheader, List } from "@mui/material";
// import axios from "axios";

import "../../../styles/index.scss";
import { fetchFanTeamRoster } from "../../../slices/fanTeamRoster";
import FanPickCardItem from "./FanPickCardItem";
import FanTeamSelect from "../../Common/fanTeamSelect";   
// import { API_URL } from "../../../config";


const FanTeamRoseter = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const fanTeamRoster = useSelector((state) => state.fanTeamRoster);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchFanTeamRoster(props.selectedTeam));
  }, [dispatch, props.selectedTeam]);

  // useEffect(() => {
  //   axios.get(`${API_URL}${props.player_ID}`).then((response) => {
  //     setPlayerData(response.data);
  //   });
  // }, [props.player_ID]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="detail-container">
      <div>
        <FanTeamSelect
          teams={activeLeague.teams}
          selectedTeam={props.selectedTeam}
          setSelectedTeam={props.setSelectedTeam}
        />
      </div>
      <div>
        <List
          sx={{
            width: "100%",
            // maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
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
                        style={{ background: "gray", color: "white" }}
                      >
                        {element.positionGroup}
                      </ListSubheader>
                      <ListItem>
                        <FanPickCardItem draftPick={element} />
                      </ListItem>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment key={index}>
                      <ListItem>
                        <FanPickCardItem draftPick={element} />
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

export default FanTeamRoseter;
