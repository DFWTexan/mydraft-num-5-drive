import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";

// import { API_URL } from "../../config";
import ProTeamNews from "./proTeamNews";
import ProTeamSchedule from "./proTeamSchedule";
import ProTeamInjuries from "./proTeamInjuries";

const ProTeamInfo = () => {
  const [data, setData] = useState([{ value: 0, label: "Loading..." }]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedItemLabel, setSelectedItemLabel] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Draft/ProTeamList`)
      .then((response) => {
        setData([{ value: 0, label: "Select Team" }, ...response.data]);
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
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        setSelectedItem(selectedValue);

                        const selectedLabel =
                          data.find((option) => option.value === selectedValue)
                            ?.label || "";
                        setSelectedItemLabel(selectedLabel);
                      }}
                    >
                      {data.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
        <div className="detail-container">
          <TabPanel>
            <ProTeamNews teamID={selectedItem} teamNickname={selectedItemLabel} />
          </TabPanel>
          <TabPanel>
            <ProTeamSchedule teamID={selectedItem} teamNickname={selectedItemLabel} />
          </TabPanel>
          <TabPanel>
            <ProTeamInjuries teamID={selectedItem} teamNickname={selectedItemLabel} />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default ProTeamInfo;
