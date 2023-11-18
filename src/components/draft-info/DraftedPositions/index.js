import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ListItem, ListSubheader } from "@mui/material";

import "../../../styles/index.scss";
import { fetchDraftedPlayerPositions } from "../../../slices/draftedPositions";
import DraftPickPositionCardItem from "./DraftPickPositionCardItem";

const DraftedByPositions = () => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const draftedByPositions = useSelector((state) => state.draftedPositions);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchDraftedPlayerPositions());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch, activeLeague]);

  return (
    <div style={{ minHeight: 780, overflow: "auto" }}>
      {draftedByPositions &&
        (() => {
          let keyPosOrder = "";
          let keyRound = "";
          return draftedByPositions.map((item, index) => {
            if (item.positionGroup !== keyPosOrder) {
              keyPosOrder = item.positionGroup;
              return (
                <React.Fragment key={index}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {item.positionGroup} ({item.count})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {Object.keys(item.roundPicks[0]).map(
                        (round, roundIndex) => {
                          if (round !== keyRound) {
                            keyRound = round;
                            return (
                              <React.Fragment key={roundIndex}>
                                <ListSubheader
                                  style={{ background: "gray", color: "white" }}
                                >
                                  ROUND {round}
                                </ListSubheader>
                                {item.roundPicks[0][round].map(
                                  (pick, pickIndex) => {
                                    return pick.length !== 0 ? (
                                      <ListItem key={pickIndex}>
                                        <DraftPickPositionCardItem
                                          draftPick={pick}
                                        />
                                      </ListItem>
                                    ) : (
                                      <React.Fragment key={pickIndex}>
                                        <p>N/A</p>
                                      </React.Fragment>
                                    );
                                  }
                                )}
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        }
                      )}
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              );
            }
          });
        })()}
    </div>
  );
};

export default DraftedByPositions;
