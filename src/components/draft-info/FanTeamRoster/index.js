import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, ListSubheader, List } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Select from "react-select";
// import axios from "axios";

import "../../../styles/index.scss";
import { fetchFanTeamRoster } from "../../../slices/fanTeamRoster";
import FanPickCardItem from "./FanPickCardItem";
import TeamSelect from "./teamSelect";
// import { API_URL } from "../../../config";


const FanTeamRoseter = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const fanTeamRoster = useSelector((state) => state.fanTeamRoster);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const dispatch = useDispatch();

  // const options = activeLeague.teams.map((team) => ({
  //   value: team.id,
  //   label: team.name,
  // }));

  const handleFanTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const initFetch = useCallback(() => {
    dispatch(fetchFanTeamRoster(activeLeague.id));
  }, [dispatch, activeLeague]);

  // useEffect(() => {
  //   axios.get(`${API_URL}${props.player_ID}`).then((response) => {
  //     setPlayerData(response.data);
  //   });
  // }, [props.player_ID]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div style={{ margin: 5 }}>
      <div>
        <TeamSelect
          teams={activeLeague.teams}
          selectedTeam={selectedTeam}
          setSelectedTeam={handleFanTeamChange}
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
