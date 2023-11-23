import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";

import { API_URL } from "../../config";

const ProTeamInfo = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}Draft/ProTeamList`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <Tabs>
        <div className="header-container">
          <TabList>
            <Tab>NEWS</Tab>
            <Tab>SCHEDULE</Tab>
            <Tab>INJURIES</Tab>
          </TabList>
          <div className="proteam-filter-content">
            <div className="display-proteam-info-filter">
              <React.Fragment>
                <div style={{ width: "100%" }}>
                  {/* <InputLabel id="playerFilterSelect-label">{label}</InputLabel> */}
                  <FormControl sx={{ minWidth: 200 }} size={"small"}>
                    <Select
                      labelId="proTeamSelect-label"
                      id="proTeamSelect"
                      value={selectedItem}
                      onChange={(value) => {
                        setSelectedItem(value.target.value);
                      }}
                    >
                      {data.map((option, index) => {
                        return (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
        <div className="detail-container">
          <TabPanel>
            <p>ProTeam - News</p>
          </TabPanel>
          <TabPanel>
            <p>ProTeam - Schedule</p>
          </TabPanel>
          <TabPanel>
            <p>ProTeam - Injuries</p>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default ProTeamInfo;
