import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../styles/draftInfo.scss";
import { fetchDraftedPlayers } from "../../slices/draft";
import { fetchFanTeamRosterCount } from "../../slices/fanTeamRosterCount";
import FanTeamRoster from "./FanTeamRoster";
import DraftSelections from "../draft-info/DraftSelections";
import DraftedPositions from "../draft-info/DraftedPositions";
import RosterCount from "../draft-info/RosterCount";
import TeamSelections from "../draft-info/TeamSelections";
import FanTeamNews from "../draft-info/FanTeamNews";
import ProTeamDepthChart from "./ProTeamDepthChart";

// const getTabBackgroundColor = (index) => {
//   switch (index) {
//     case 0:
//       return background-color-qb;
//     case 1:
//       return background-color-rb;
//     case 2:
//       return background-color-wr;
//     case 3:
//       return background-color-te;
//     case 4:
//       return background-color-k;
//     default:
//       return background-color-def;
//   }
// };

const DraftInfo = () => {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [depthChartIndex, setDepthChartIndex] = useState(0);
  const [depthChartDisplay, setDepthChartDisplay] = useState("QB");
  const draftPicks = useSelector((state) => state.draftPicks);
  const rosterCounts = useSelector((state) => state.fanTeamRosterCount);
  const players = useSelector((state) => state.players);
  // const fanTeamSelections = useSelector((state) => state.fanTeamSelections);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchDraftedPlayers());
    dispatch(fetchFanTeamRosterCount());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch, players]);

  const myStyle = {
    // color: "black",
    // size: "2px",
    // fontFamily: "Sans-Serif",
  };

  const handleFanTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleDepthChartPositionChange = (index) => {
    setDepthChartIndex(index);

    switch (index) {
      case 0: {
        setDepthChartDisplay("QB");
        break;
      }
      case 1: {
        setDepthChartDisplay("RB");
        break;
      }
      case 2: {
        setDepthChartDisplay("WR");
        break;
      }
      case 3: {
        setDepthChartDisplay("TE");
        break;
      }
      case 4: {
        setDepthChartDisplay("PK");
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="tab_Container_draftInfo">
        <Tabs forceRenderTabPanel defaultIndex={0}>
          <TabList>
            {" "}
            {/* -- This is the tab list for [ DRAFT / ROSTER / DEPTH CHART ] -- */}
            <Tab>DRAFT</Tab>
            <Tab>ROSTERS</Tab>
            <Tab>DEPTH CHART</Tab>
          </TabList>
          <TabPanel>
            {" "}
            {/* -- This is the tab panel for the [DRAFT] -- */}
            <Tabs forceRenderTabPanel>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabList>
                    {" "}
                    {/* -- This is the tab list for [ Selections / Rosters / Positions ] -- */}
                    <Tab style={myStyle}>Selections</Tab>
                    <Tab>Rosters</Tab>
                    <Tab>Positions</Tab>
                  </TabList>
                </div>
              </div>

              {/* <div className="detail-container"> */}
              <TabPanel>
                {" "}
                {/* -- This is the tab panel for the draft - Selections -- */}
                <DraftSelections draftPicks={draftPicks} />
              </TabPanel>
              <TabPanel>
                {" "}
                {/* -- This is the tab panel for the draft - Rosters -- */}
                <RosterCount rosters={rosterCounts} />
              </TabPanel>
              <TabPanel>
                {" "}
                {/* -- This is the tab panel for the draft - Positions -- */}
                <DraftedPositions />
              </TabPanel>
              {/* </div> */}
            </Tabs>
          </TabPanel>
          <TabPanel>
            {" "}
            {/* -- This is the tab panel for the [ROSTERS] -- */}
            <Tabs forceRenderTabPanel>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabList>
                    {" "}
                    {/* -- This is the tab list for [ Team / Selections / News ] -- */}
                    <Tab>Team</Tab>
                    <Tab>Selections</Tab>
                    <Tab>News</Tab>
                  </TabList>
                </div>
              </div>

              {/* <div className="detail-container"> */}
              <TabPanel>
                {" "}
                {/* -- This is the tab panel for the fan team roster -- */}
                <FanTeamRoster
                  MyTeam={true}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={handleFanTeamChange}
                />
              </TabPanel>
              <TabPanel>
                {" "}
                {/* -- This is the tab panel for the fan team selections -- */}
                <TeamSelections
                  selectedTeam={selectedTeam}
                  setSelectedTeam={handleFanTeamChange}
                />
              </TabPanel>
              <TabPanel>
                {" "}
                {/* -- This is the tab panel for the fan team news -- */}
                <FanTeamNews
                  MyTeam={true}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={handleFanTeamChange}
                />
              </TabPanel>
              {/* </div> */}
            </Tabs>
          </TabPanel>
          <TabPanel>
            {" "}
            {/* -- This is the tab panel for the [DEPTH CHART] -- */}
            <Tabs
              forceRenderTabPanel
              selectedIndex={depthChartIndex}
              onSelect={(index) => {
                handleDepthChartPositionChange(index);
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabList>
                    {" "}
                    {/* -- This is the tab list for the depth chart - [ QB / RB / WR / TE / PK ] -- */}
                    {/* <Tab style={{ backgroundColor: getTabBackgroundColor(0) }}>QB</Tab>
                    <Tab style={{ backgroundColor: getTabBackgroundColor(1) }}>RB</Tab>
                    <Tab style={{ backgroundColor: getTabBackgroundColor(2) }}>WR</Tab>
                    <Tab style={{ backgroundColor: getTabBackgroundColor(3) }}>TE</Tab>
                    <Tab style={{ backgroundColor: getTabBackgroundColor(4) }}>PK</Tab> */}
                    <Tab>QB</Tab>
                    <Tab>RB</Tab>
                    <Tab>WR</Tab>
                    <Tab>TE</Tab>
                    <Tab>PK</Tab>
                  </TabList>
                </div>
              </div>

              <div className="detail-container">
                <TabPanel>
                  {" "}
                  {/* -- This is the tab panel for the depth chart - QB -- */}
                  <ProTeamDepthChart positionDisplay={depthChartDisplay} />
                </TabPanel>
                <TabPanel>
                  {" "}
                  {/* -- This is the tab panel for the depth chart - RB -- */}
                  <ProTeamDepthChart positionDisplay={depthChartDisplay} />
                </TabPanel>
                <TabPanel>
                  {" "}
                  {/* -- This is the tab panel for the depth chart - WR -- */}
                  <ProTeamDepthChart positionDisplay={depthChartDisplay} />
                </TabPanel>
                <TabPanel>
                  {" "}
                  {/* -- This is the tab panel for the depth chart - TE -- */}
                  <ProTeamDepthChart positionDisplay={depthChartDisplay} />
                </TabPanel>
                <TabPanel>
                  {" "}
                  {/* -- This is the tab panel for the depth chart - PK -- */}
                  <ProTeamDepthChart positionDisplay={depthChartDisplay} />
                </TabPanel>
              </div>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default DraftInfo;
