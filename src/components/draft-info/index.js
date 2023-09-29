import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { ListGroup, ListGroupItem } from "reactstrap";
import { ListItem, ListSubheader, List } from "@mui/material";
// import "react-tabs/style/react-tabs.css";

import "../../styles/index.scss";
import { fetchDraftedPlayers } from "../../slices/draft";
import DraftPickCardItem from "./DraftSelections/DraftPickCardItem";

const DraftInfo = () => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const draftPicks = useSelector((state) => state.draftPicks);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchDraftedPlayers(activeLeague));
  }, [dispatch, activeLeague]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="tab_Container_draftInfo">
      <Tabs forceRenderTabPanel defaultIndex={0}>
        <TabList>
          <Tab>DRAFT</Tab>
          <Tab>ROSTERS</Tab>
          <Tab>DEPTH CHART</Tab>
        </TabList>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Selections</Tab>
              <Tab>My Roster</Tab>
              <Tab>Positions</Tab>
            </TabList>
            <TabPanel>
              {/* <div className="list-draftPicks">
                <ListGroup>
                  {draftPicks &&
                    draftPicks.map((draftPick, index) => (
                      <ListGroupItem
                        className="draftpick-card-content"
                        action
                        href="#"
                        // className={
                        //   "list-group-item " + (index === currentIndex ? "active" : "")
                        // }
                        // onClick={() => {
                        //   handlePlayerSelected_OpenModal(player);
                        // }}
                        key={index}
                      >
                        <DraftPickCardItem draftPick={draftPick} />
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </div> */}
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
                  subheader={<ListSubheader>Round 1</ListSubheader>}
                >
                  {draftPicks &&
                    (() => {
                      let rnd = 1;
                      return draftPicks.map((element) => {
                        if (element.round !== rnd) {
                          rnd = element.round;
                          return (
                            <>
                              <ListSubheader>Round {rnd}</ListSubheader>
                              <ListItem>
                                <DraftPickCardItem draftPick={element} />
                              </ListItem>
                            </>
                          );
                        } else {
                          return (
                            <ListItem>
                              <DraftPickCardItem draftPick={element} />
                            </ListItem>
                          );
                        }
                      });
                    })()}
                </List>
              </div>
            </TabPanel>
            <TabPanel>
              <p>DRAFT = Roster</p>
            </TabPanel>
            <TabPanel>
              <p>DRAFT = Positions</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Team</Tab>
              <Tab>Selections</Tab>
              <Tab>News</Tab>
            </TabList>
            <TabPanel>
              <p>ROSTER = Team</p>
            </TabPanel>
            <TabPanel>
              <p>ROSTER = Selections</p>
            </TabPanel>
            <TabPanel>
              <p>ROSTER = News</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>QB</Tab>
              <Tab>RB</Tab>
              <Tab>WR</Tab>
              <Tab>TE</Tab>
              <Tab>KR</Tab>
            </TabList>
            <TabPanel>
              <p>QB DepthChart</p>
            </TabPanel>
            <TabPanel>
              <p>RB DepthChart</p>
            </TabPanel>
            <TabPanel>
              <p>WR DepthChart</p>
            </TabPanel>
            <TabPanel>
              <p>TE DepthChart</p>
            </TabPanel>
            <TabPanel>
              <p>KR DepthChart</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DraftInfo;
