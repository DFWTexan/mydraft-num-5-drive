import React from "react";
import { ListItem, ListSubheader, List } from "@mui/material";

import "../../../styles/index.scss";
import DraftPickCardItem from "./DraftPickCardItem";

const DraftSelections = (props) => {
  return (
    <div className="detail-container">
      <List
        sx={{
          width: "100%",
          padding: '.5rem',
          bgcolor: "background.paper",
          position: "relative",
        }}
        subheader={
          <ListSubheader style={{ background: "#2f353a", color: "white" }}>
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
                      style={{ background: "#2f353a", color: "white" }}
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
