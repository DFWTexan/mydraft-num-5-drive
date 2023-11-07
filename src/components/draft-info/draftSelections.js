import React from "react";
import { ListItem, ListSubheader, List } from "@mui/material";

import DraftPickCardItem from "./DraftSelections/DraftPickCardItem";

const DraftSelections = (props) => {
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
          <ListSubheader style={{ background: "black", color: "white" }}>
            Round 1
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
export default DraftSelections;
