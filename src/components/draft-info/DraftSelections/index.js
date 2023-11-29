import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ListItemButton, ListSubheader, List } from "@mui/material";

import "../../../styles/index.scss";
import DraftPickCardItem from "./DraftPickCardItem";
import PlayerModal from "../../Common/player-selected-modal";

const DraftSelections = (props) => {
  const draftStatus = useSelector((state) => state.draftStatus);
  const currentItemRef = useRef(null);

  const [openModelPlayerSelected, setOpenModalPlayerSelected] = useState({
    isOpen: false,
    player_ID: null,
  });

  // Create a sorted array with the current pick at the top
  // const sortedDraftPicks = useMemo(() => {
  //   const currentPickIndex = props.draftPicks.findIndex(
  //     (pick) => pick.overallPick === draftStatus.currentPick
  //   );
  //   if (currentPickIndex === -1) return props.draftPicks; // Return original array if current pick not found

  //   const currentPick = props.draftPicks[currentPickIndex];
  //   return [
  //     currentPick,
  //     ...props.draftPicks.slice(0, currentPickIndex),
  //     ...props.draftPicks.slice(currentPickIndex + 1),
  //   ];
  // }, [props.draftPicks, draftStatus.currentPick]);

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

  useEffect(() => {
    // Scroll the current item into view
    if (currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [draftStatus.currentPick]);

  const isDrafted = (draftPick) => {
    if (!draftPick.player) {
      return true;
    } else {
      return false;
    }
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
              const isCurrentPick =
                element.overallPick === draftStatus.currentPick;
              const listItemProps = isCurrentPick
                ? { ref: currentItemRef }
                : {};

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
                      {...listItemProps}
                      href="#"
                      disabled={isDrafted(element)}
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
                      {...listItemProps}
                      href="#"
                      disabled={isDrafted(element)}
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
