import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ListItem, ListSubheader, List } from "@mui/material";

import DraftPickCardItem from "../DraftSelections/DraftPickCardItem";

const baseURL = "https://localhost:7242/api/";

const FanTeamRoseter = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const [roster, setRoster] = useState([]);

  useEffect(() => {

    // console.log("==> EMFTest - (FanTeamRoseter) activeLegue -> \n", activeLeague);

    const fetchFanTeamRoster = async (vMyTeam) => {
      const response = await axios.get(
        `${baseURL}Draft/GetDraftPicksByFanTeam/${activeLeague.id}`
      );

      console.log("==> EMFTest - (FanTeamRoseter) response.data", response.data);

        setRoster(response.data);

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
        {props.draftPicks &&
          (() => {
            let rnd = 1;
            return props.draftPicks.map((element, index) => {
              if (element.round !== rnd) {
                rnd = element.round;
                return (
                  <React.Fragment key={index}>
                    <ListSubheader
                      style={{ background: "black", color: "white" }}
                    >
                      Round {rnd}
                    </ListSubheader>
                    <ListItem>
                      <DraftPickCardItem draftPick={element} />
                    </ListItem>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <ListItem>
                      <DraftPickCardItem draftPick={element} />
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
