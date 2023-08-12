import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

// import FanTeamFilter from "./fanTeam-Filter";
import "../../styles/draftInfo.scss";

const DraftInfo = () => {
  useEffect(() => {}, []);

  return (
    <div className="container-draftInfo">
      <Tabs forceRenderTabPanel defaultIndex={1}>
        <TabList>
          <Tab>DRAFT</Tab>
          <Tab>ROSTER</Tab>
          <Tab>DEPTH CHART</Tab>
        </TabList>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Selections</Tab>
              <Tab>Rankings</Tab>
              <Tab>Rosters</Tab>
            </TabList>
            <TabPanel>
              <p>DRAFT => Selections</p>
            </TabPanel>
            <TabPanel>
              <p>DRAFT => Rankings</p>
            </TabPanel>
            <TabPanel>
              <p>DRAFT => Roster</p>
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
              <p>ROSTER => Team</p>
            </TabPanel>
            <TabPanel>
              <p>ROSTER => Selections</p>
            </TabPanel>
            <TabPanel>
              <p>ROSTER => News</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>OB</Tab>
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
