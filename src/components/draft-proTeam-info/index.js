import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";

import { API_URL } from "../../config";

const ProTeamInfo = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}Draft/ProTeamList`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div >
      <Tabs>
        
        <div className="header-container">
        <TabList>
          <Tab>NEWS</Tab>
          <Tab>SCHEDULE</Tab>
          <Tab>INJURIES</Tab>
        </TabList>
          <React.Fragment>
            <div style={{ width: "100%" }}>
              {/* <InputLabel id="playerFilterSelect-label">{label}</InputLabel> */}
              <FormControl sx={{ minWidth: 125 }} size={"small"}>
                <Select
                  labelId="proTeamSelect-label"
                  id="proTeamSelect"
                  value={selectedItem}
                  onChange={setSelectedItem}
                >
                  {data.map((option, index) => {
                    // console.log("==>  EMFTest (ProTeam-Header) - option", option);
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
