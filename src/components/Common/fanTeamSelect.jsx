import React from "react";
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FanTeamSelect = ({ teams, selectedTeam, setSelectedTeam, label, minWidth, margin, size }) => {
  const options = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  return (
    <React.Fragment>
      <div style={{ margin: margin || 5, width: "100%" }}>
        {/* <InputLabel id="fanTeamSelect-label">Fan Team</InputLabel> */}
        <FormControl sx={{ m: 1, minWidth: minWidth || 250 }} size={size || "small"}>
          <Select
            labelId="fanTeamSelect-label"
            id="fanTeamSelect"
            value={selectedTeam}
            onChange={setSelectedTeam}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
};

export default FanTeamSelect;
