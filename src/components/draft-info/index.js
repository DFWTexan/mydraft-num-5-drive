import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../styles/index.scss";
import { fetchDraftedPlayers } from "../../slices/draft";
import FanTeamRoster from "./FanTeamRoster";
import DraftSelections from "./draftSelections";

const DraftInfo = () => {
  const draftPicks = useSelector((state) => state.draftPicks);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchDraftedPlayers());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const myStyle = {
    color: "black",
    // backgroundColor: "DodgerBlue",
    // padding: "10px",
    size: "2px",
    fontFamily: "Sans-Serif"
  };

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
              <Tab style={myStyle}>Selections</Tab>
              <Tab>MyRoster</Tab>
              <Tab>Positions</Tab>
            </TabList>
            <TabPanel>
              <DraftSelections draftPicks={draftPicks} />
            </TabPanel>
            <TabPanel>
              <FanTeamRoster MyTeam={true} />
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
