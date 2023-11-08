import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, ListSubheader, List } from "@mui/material";

import { fetchFanTeamRoster } from "../../../slices/fanTeamRoster";
import FanPickCardItem from "./FanPickCardItem";

const FanTeamRoseter = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const fanTeamRoster = useSelector((state) => state.fanTeamRoster);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchFanTeamRoster(activeLeague.id));
  }, [dispatch, activeLeague]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div style={{ margin: 5 }}>
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
        subheader={
          <ListSubheader style={{ background: "gray", color: "white" }}>
            Quarterback
          </ListSubheader>
        }
      >
        {fanTeamRoster &&
          (() => {
            let sortOrder = 1;
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
  );
};

export default FanTeamRoseter;
