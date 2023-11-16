import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../../../styles/index.scss";
import { fetchDraftedPlayerPositions } from "../../../slices/draftedPositions";

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
      {/* {Object.entries(draftedByPositions).forEach(([k, v]) => {
        console.log("==> EMFTest (DraftPositions) - The key: ", k);
        console.log("=> EMFTest (DraftPositions) - The value: ", v);
      })} */}
      {/* {draftedByPositions.map((element, index) => {
        console.log("==> EMFTest (DraftPositions) - The element.key: ", element.value.length);
      })} */}
      {draftedByPositions &&
        (() => {
          let keyPosOrder = "";
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
                      {Object.keys(item.roundPicks[0]).map((round, roundIndex) => {

console.log("==> EMFTest (DraftPositions) - The round: ", round);

                        return (
                          <React.Fragment key={roundIndex}>
                            {/* <div className="d-flex justify-content-start">
                              {element.round + "." + element.pickInRound}{" "}
                              {element && "   " + element.playerName}
                            </div> */}
                            <li key={roundIndex}>
                    <p>Round {round}</p>
                    <ul>
                      {item.roundPicks['0'][round].map((pick, pickIndex) => (
                        <li key={pickIndex}>
                          <p>
                            {pick.positionGroup} - {pick.playerName} (Round {pick.round}, Pick {pick.pickInRound})
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                          </React.Fragment>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              );
            } 
            // else {
            //   return (
            //     <React.Fragment key={index}>
            //       <Accordion>
            //         <AccordionDetails>
            //           <Typography>
            //             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            //             Suspendisse malesuada lacus ex, sit amet blandit leo
            //             lobortis eget.
            //           </Typography>
            //         </AccordionDetails>
            //       </Accordion>
            //     </React.Fragment>
            //   );
            // }
          });
        })()}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
};

export default DraftedByPositions;
