import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ListItemButton, ListSubheader, List } from "@mui/material";

import "../../../styles/index.scss";
import DraftPickCardItem from "./DraftPickCardItem";
import PlayerModal from "../../Common/player-selected-modal";

const DraftSelections = (props) => {
  const draftStatus = useSelector((state) => state.draftStatus);

  const [openModelPlayerSelected, setOpenModalPlayerSelected] = useState({
    isOpen: false,
    player_ID: null,
  });

  const handlePlayerSelected_OpenModal = (player) => {
    setOpenModalPlayerSelected({
      isOpen: true,
      player_ID: player.playerID,
    });
  };

  const handleCloseModal = () => {
    setOpenModalPlayerSelected({
      isOpen: false,
      player_ID: null,
    });
  };

  return (
    <div className="detail-container">
      <List
        sx={{
          width: "100%",
          padding: ".5rem",
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
                    <ListItemButton
                      href="#"
                      onClick={() => handlePlayerSelected_OpenModal(element)}
                    >
                      <DraftPickCardItem
                        draftPick={element}
                        otcID={draftStatus.onTheClock}
                        currentPick={draftStatus.currentPick}
                      />
                    </ListItemButton>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <ListItemButton
                    href="#"
                    onClick={() => handlePlayerSelected_OpenModal(element)}
                    >
                      <DraftPickCardItem
                        draftPick={element}
                        otcID={draftStatus.onTheClock}
                        currentPick={draftStatus.currentPick}
                      />
                    </ListItemButton>
                  </React.Fragment>
                );
              }
            });
          })()}
      </List>
      {openModelPlayerSelected.isOpen && (
        <PlayerModal
          props={openModelPlayerSelected}
          handleCloseModal={handleCloseModal}
          // filterSortPlayer={filterSortPlayer}
        />
      )}
    </div>
  );
};
export default DraftSelections;
