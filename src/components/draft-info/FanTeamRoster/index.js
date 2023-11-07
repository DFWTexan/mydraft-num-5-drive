import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ListItem, ListSubheader, List } from "@mui/material";

import FanPickCardItem from "./FanPickCardItem";

const baseURL = "https://localhost:7242/api/";

const FanTeamRoseter = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const [fanTeamRoster, setFanTeamRoster] = useState([]);

  useEffect(() => {

    // console.log("==> EMFTest - (FanTeamRoseter) activeLegue -> \n", activeLeague);

    const fetchFanTeamRoster = async (vMyTeam) => {
      const response = await axios.get(
        `${baseURL}Draft/GetDraftPicksByFanTeam/${activeLeague.id}`
      );

      console.log("==> EMFTest - (FanTeamRoseter) response.data", response.data);

      setFanTeamRoster(response.data);

    }

    fetchFanTeamRoster(props.MyTeam);
  }, [props.MyTeam, activeLeague]);

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
