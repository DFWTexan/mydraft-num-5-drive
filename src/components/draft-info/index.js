import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../styles/index.scss";
import { fetchDraftedPlayers } from "../../slices/draft";
import { fetchFanTeamRosterCount } from "../../slices/fanTeamRosterCount";
import FanTeamRoster from "./FanTeamRoster";
import DraftSelections from "../draft-info/DraftSelections";
import DraftedPositions from "../draft-info/DraftedPositions";
import RosterCount from "../draft-info/RosterCount";
import TeamSelections from "../draft-info/TeamSelections";
import ProTeamDepthChart from "./ProTeamDepthChart";

const DraftInfo = () => {
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [depthChartIndex, setDepthChartIndex] = useState(0);
  const [depthChartDisplay, setDepthChartDisplay] = useState("QB");
  const draftPicks = useSelector((state) => state.draftPicks);
  const rosterCounts = useSelector((state) => state.fanTeamRosterCount);
  // const fanTeamSelections = useSelector((state) => state.fanTeamSelections);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchDraftedPlayers());
    dispatch(fetchFanTeamRosterCount());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

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
              <Tab>Rosters</Tab>
              <Tab>Positions</Tab>
            </TabList>
            <TabPanel>
              <DraftSelections draftPicks={draftPicks} />
            </TabPanel>
            <TabPanel>
              <RosterCount rosters={rosterCounts} />
            </TabPanel>
            <TabPanel>
              <DraftedPositions />
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
              <FanTeamRoster
                MyTeam={true}
                selectedTeam={selectedTeam}
                setSelectedTeam={handleFanTeamChange}
              />
            </TabPanel>
            <TabPanel>
              <TeamSelections
                selectedTeam={selectedTeam}
                setSelectedTeam={handleFanTeamChange}
              />
            </TabPanel>
            <TabPanel>
              <p>ROSTER = News</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs
            forceRenderTabPanel
            selectedIndex={depthChartIndex}
            onSelect={(index) => {
              handleDepthChartPositionChange(index);
            }}
          >
            <TabList>
              <Tab>QB</Tab>
              <Tab>RB</Tab>
              <Tab>WR</Tab>
              <Tab>TE</Tab>
              <Tab>PK</Tab>
            </TabList>
            <TabPanel className="detail-container">
              <ProTeamDepthChart positionDisplay={depthChartDisplay} />
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DraftInfo;
