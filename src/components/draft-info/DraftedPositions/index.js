import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
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

  let keyPosOrder = "";
  let keyRound = "";

  return (
    <div className="detail-container">
      {draftedByPositions.map((item, index) => {
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
                  <div className="position-grp-header">
                    {item.positionGroup} ({item.count})
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.keys(item.roundPicks[0]).map((round, roundIndex) => {
                    if (round !== keyRound) {
                      keyRound = round;
                      return (
                        <React.Fragment key={roundIndex}>
                          <ListSubheader
                            style={{ background: "#2f353a", color: "white" }}
                          >
                            ROUND {round}
                          </ListSubheader>
                          {item.roundPicks[0][round].map((pick, pickIndex) => {
                            return pick.length !== 0 ? (
                              <ListItem key={pickIndex}>
                                <DraftPickPositionCardItem draftPick={pick} />
                              </ListItem>
                            ) : (
                              <React.Fragment key={pickIndex}>
                                <div security={{ minHeight: "15px" }}>
                                  <p>N/A</p>
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default DraftedByPositions;
